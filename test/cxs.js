
import test from 'ava'
import hash from 'murmurhash-js/murmurhash3_gc'
import { StyleSheet } from 'glamor/lib/sheet'
import prefixer from 'inline-style-prefixer/static'
import jsdom from 'jsdom-global'
import cxs from '../src'

jsdom('<html></html>')

const style = {
  color: 'tomato',
  display: 'flex',
  fontSize: 32
}

test.beforeEach(() => {
  cxs.sheet.flush()
  cxs.clear()
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
  t.plan(2)
  const hashname = hash(JSON.stringify(style), 128)
  const cx = cxs(style)
  const cxtwo = cxs(style)
  t.is(cx, `cxs-${hashname}`)
  t.is(cx, cxtwo) // Double-double checking
})

test('has a glamor StyleSheet instance', t => {
  t.true(cxs.sheet instanceof StyleSheet)
})

test('Adds px unit to number values', t => {
  const sx = {
    fontSize: 32
  }
  cxs(sx)
  const rules = cxs.rules
  t.regex(rules[0].cssText, /font-size:32px}$/)
})

test('creates pseudoclass rules', t => {
  t.plan(2)
  const sx = {
    color: 'cyan',
    ':hover': {
      color: 'magenta'
    }
  }
  cxs(sx)
  const rules = cxs.rules
  t.is(rules.length, 2)
  t.regex(cxs.css, /:hover/)
})

test('creates @media rules', t => {
  t.plan(2)
  const sx = {
    color: 'cyan',
    '@media screen and (min-width:32em)': {
      color: 'magenta'
    }
  }
  cxs(sx)
  const rules = cxs.rules
  t.is(rules.length, 2)
  t.regex(rules[1].cssText, /^@media/)
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
  const rules = cxs.rules
  t.is(rules.length, 4)
  t.regex(rules[1].cssText, /32/)
  t.regex(rules[2].cssText, /48/)
  t.regex(rules[3].cssText, /64/)
})

test('creates @keyframe rules', t => {
  t.plan(2)
  cxs({
    animationName: 'rainbow',
    animationTimingFunction: 'linear',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    '@keyframes rainbow': {
      from: {
        color: 'cyan',
        backgroundColor: 'yellow'
      },
      '100%': {
        color: 'magenta'
      }
    }
  })
  t.regex(cxs.css, /@keyframes rainbow { from/)
  t.false(/@keyframes.*@keyframes/.test(cxs.css))
})

test('creates nested selectors', t => {
  t.plan(4)
  let cx
  t.notThrows(() => {
    cx = cxs({
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
  t.false(/h1/.test(cx))
  t.regex(cxs.css, /h1/)
  t.regex(cxs.css, /a:hover/)
})

test('dedupes repeated styles', t => {
  const dupe = {
    color: 'cyan',
    fontSize: 32
  }

  cxs(style)
  cxs(dupe)
  cxs(dupe)

  t.is(cxs.rules.length, 2)
})

test('handles array values', t => {
  t.pass(2)
  t.notThrows(() => {
    cxs({
      color: [ 'blue', 'var(--blue)' ]
    })
  })
  t.regex(cxs.css, /var/)
})

test('handles prefixed styles with array values', t => {
  t.pass(3)
  t.notThrows(() => {
    const prefixed = prefixer({
      display: 'flex'
    })
    cxs(prefixed)
  })
  t.regex(cxs.css, /\-webkit\-flex/)
  t.regex(cxs.css, /\-ms\-flexbox/)
})

test('handles prefixed styles (including ms) in keys', t => {
  t.pass(3)
  t.notThrows(() => {
    const prefixed = prefixer({
      alignItems: 'center'
    })
    cxs(prefixed)
  })
  t.regex(cxs.css, /\-webkit\-align-items/)
  t.regex(cxs.css, /\-ms\-flex-align/)
})

test('ignores null values', t => {
  cxs({
    color: 'tomato',
    padding: null
  })
  const css = cxs.css
  t.is(css.includes('null'), false)
})

test('handles 0 values', t => {
  cxs({
    padding: 0,
    fontFamily: 0,
    border: 0
  })
  const css = cxs.css
  t.is(css.includes('border'), true)
})

test('should handle ::-moz-inner-focus', t => {
  cxs({
    color: 'tomato',
    '::-moz-inner-focus': {
      border: 0,
      padding: 0
    }
  })
  const css = cxs.css
  t.is(css.includes('-moz-inner-focus'), true)
})

test('supports custom global selectors', t => {
  const cx = cxs('body', {
    margin: 0
  })
  const css = cxs.css
  t.is(cx, 'body')
  t.truthy(css.includes('margin:0'))
})

