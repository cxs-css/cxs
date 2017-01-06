
import test from 'ava'
import { StyleSheet } from 'glamor/lib/sheet'
import prefixer from 'inline-style-prefixer/static'
import jsdom from 'jsdom-global'
import cxs, { sheet, reset, getCss, hyphenate } from '../src/lite'

jsdom('<html></html>')

const style = {
  color: 'tomato',
  display: 'flex',
  fontSize: 32
}

const prefixRules = ({ selector, key, val }) => {
  const declarations = prefixer({ [key]: val })
  const createRule = (rules, key, value, i) =>
    `${rules}${i > 0 ? ';' : ''}${hyphenate(key)}:${value}`
  const declarationsStr = Object.keys(declarations).reduce((rules, key, i) => {
    const value = declarations[key]
    if (Array.isArray(value)) {
      return value.reduce((acc, val, i) => (
        createRule(acc, key, val, i)
      ), '')
    }
    return createRule(rules, key, val, i)
  }, '')
  return `${selector}{${declarationsStr}}`
}

test.beforeEach(() => {
  reset()
})

test('does not throw', t => {
  t.notThrows(() => {
    cxs(style)
  })
})

test('returns a classname', t => {
  const cx = cxs(style)
  t.is(typeof cx, 'string')
})

test('returns a sequential micro classname', t => {
  const name = 'a'
  const cx = cxs({ color: 'blue' })
  const cxtwo = cxs({ color: 'blue' })
  t.is(cx, name)
  t.is(cx, cxtwo) // Double-double checking
})

test('has a glamor StyleSheet instance', t => {
  t.true(sheet instanceof StyleSheet)
})

test('Adds px unit to number values', t => {
  cxs({
    fontSize: 32
  })
  t.regex(getCss(), /font-size:32px}$/)
})

test('creates pseudoclass rules', t => {
  cxs({
    color: 'cyan',
    ':hover': {
      color: 'magenta'
    }
  })
  t.regex(getCss(), /:hover/)
})

test('creates @media rules', t => {
  cxs({
    color: 'cyan',
    '@media screen and (min-width:32em)': {
      color: 'magenta'
    }
  })
  t.regex(getCss(), /@media/)
})

test('keeps @media rules order', t => {
  t.plan(4)
  const sx = {
    color: 'cyan',
    '@media screen and (min-width:32em)': {
      color: 'magenta'
    },
    '@media screen and (min-width:48em)': {
      color: 'yellow'
    },
    '@media screen and (min-width:64em)': {
      color: 'black'
    }
  }
  cxs(sx)
  const rules = sheet.rules().map(rule => rule.cssText)
  t.is(rules.length, 4)
  t.regex(rules[1], /32/)
  t.regex(rules[2], /48/)
  t.regex(rules[3], /64/)
})


test('dedupes repeated styles', t => {
  const dupe = {
    color: 'cyan',
    fontSize: 32
  }

  cxs(dupe)
  cxs(dupe)

  t.is(sheet.rules().length, 2)
})

test('handles array values', t => {
  t.pass(2)
  t.notThrows(() => {
    cxs({
      color: [ 'blue', 'var(--blue)' ]
    })
  })
  t.regex(getCss(), /var/)
})

test('handles prefixed styles with array values', t => {
  t.pass(3)
  cxs.setOptions({ customRuleParser: prefixRules })
  t.notThrows(() => {
    cxs({
      display: 'flex'
    })
  })
  t.regex(getCss(), /display:-webkit-flex/)
  t.regex(getCss(), /display:-ms-flexbox/)
})

test('handles prefixed styles (including ms) in keys', t => {
  t.pass(3)
  cxs.setOptions({ customRuleParser: prefixRules })
  t.notThrows(() => {
    cxs({
      alignItems: 'center'
    })
  })
  t.regex(getCss(), /-webkit-align-items:/)
  t.regex(getCss(), /-ms-flex-align:/)
})

test('ignores null values', t => {
  cxs({
    color: 'tomato',
    padding: null
  })
  t.is(getCss().includes('null'), false)
})

test('handles 0 values', t => {
  cxs({
    padding: 0,
    fontFamily: 0,
    border: 0
  })
  t.is(getCss().includes('border'), true)
})

test('should handle ::-moz-inner-focus', t => {
  cxs({
    color: 'tomato',
    '::-moz-inner-focus': {
      border: 0,
      padding: 0
    }
  })
  t.is(getCss().includes('-moz-inner-focus'), true)
})

test('can rehydrate cache', t => {
  cxs({
    color: 'tomato',
    margin: 8,
    ':hover': {
      fontSize: 12,
      color: 'red'
    },
    '@media (min-width:40em)': {
      marginBottom: 32,
      ':hover': {
        color: 'green'
      }
    },
    '@media screen and (max-width: 32em)': {
      color: 'blue',
      margin: 48,
      ':focus': {
        outline: '2px solid tomato',
        fontWeight: 'bold',
        ':hover': {
          color: 'pink'
        }
      },
      ':hover': {
        color: 'black'
      }
    }
  })
  const savedCache = Object.assign({}, cxs.cache)
  const css = getCss()
  cxs.reset()
  t.deepEqual(cxs.cache, {})
  cxs.rehydrate(css)
  t.is(cxs.cache === savedCache, false)
  t.deepEqual(cxs.cache, savedCache)
})

test('can set prefix option', t => {
  cxs.setOptions({ prefix: 'foo-' })
  const className = cxs({ color: 'tomato' })
  t.regex(className, /^foo\-/)
})

