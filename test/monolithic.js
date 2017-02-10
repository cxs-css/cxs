
import test from 'ava'
import { StyleSheet } from 'glamor/lib/sheet'
import prefixer from 'inline-style-prefixer/static'
import jsdom from 'jsdom-global'
import cxs, { reset, getCss, sheet } from '../src/monolithic'
import hash from '../src/hash'

jsdom('<html></html>')

const style = {
  color: 'tomato',
  display: 'flex',
  fontSize: 32,
  ':hover': {
    color: 'red'
  },
  '@media screen and (min-width:32em)': {
    color: 'blue',
    ':hover': {
      color: 'cyan'
    }
  },
  'h1': {
    textDecoration: 'underline',
    fontSize: 48,
    color: 'green'
  }
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

test('returns a consistent hashed classname', t => {
  const name = hash(JSON.stringify({ color: 'blue' }))
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

test('creates @keyframes rules', t => {
  cxs({
    '@keyframes test': {
      '0%': {
        background: 'red',
      },
      '100%': {
        background: 'blue',
      }
    },
  })
  t.regex(getCss(), /@keyframes/)
})

test('creates @keyframes rules from animationName', t => {
  cxs({
    animationName: {
      '0%': {
        background: 'red',
      },
      '100%': {
        background: 'blue',
      }
    },
  });
  t.regex(getCss(), /@keyframes/)
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

test('creates nested selectors', t => {
  t.plan(3)
  t.notThrows(() => {
    cxs({
      color: 'blue',
      'h1': {
        fontSize: 32,
        'a': {
          color: 'inherit',
          ':hover': {
            textDecoration: 'underline'
          }
        }
      }
    })
  })
  t.regex(getCss(), /h1/)
  t.regex(getCss(), /a:hover/)
})

test('dedupes repeated styles', t => {
  const dupe = {
    color: 'cyan',
    fontSize: 32
  }

  cxs(dupe)
  cxs(dupe)

  t.is(sheet.rules().length, 1)
})

test('handles array values', t => {
  t.pass(2)
  t.notThrows(() => {
    cxs({
      color: [ 'blue', 'var(--blue)' ]
    })
  })
  const css = getCss()
  t.regex(css, /color:blue;color:var\(--blue\)}$/)
})

test('handles prefixed styles with array values', t => {
  t.pass(3)
  t.notThrows(() => {
    const prefixed = prefixer({
      display: 'flex'
    })
    cxs(prefixed)
  })
  t.regex(getCss(), /\-webkit\-flex/)
  t.regex(getCss(), /\-ms\-flexbox/)
})

test('handles prefixed styles (including ms) in keys', t => {
  t.pass(3)
  t.notThrows(() => {
    const prefixed = prefixer({
      alignItems: 'center'
    })
    cxs(prefixed)
  })
  t.regex(getCss(), /\-webkit\-align-items/)
  t.regex(getCss(), /\-ms\-flex-align/)
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

test('supports custom global selectors', t => {
  cxs('body', {
    margin: 0,
    lineHeight: 1.5
  })
  t.truthy(getCss().includes('margin:0'))
  t.truthy(getCss().includes('line-height:1.5'))
})

test('can set prefix option', t => {
  cxs.setOptions({ prefix: 'foo-' })
  const className = cxs({ color: 'tomato' })
  t.regex(className, /^foo\-/)
})

