
import test from 'ava'
import prefixer from 'inline-style-prefixer/static'
import jsdom from 'jsdom-global'
import cxs, { reset, css } from '../src/styletron'

// jsdom('<html></html>')

const style = {
  color: 'tomato',
  display: 'flex',
  fontSize: 32
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

test('returns a micro classname', t => {
  const cx = cxs({ color: 'blue' })
  t.regex(cx, /a/)
})

test('Adds px unit to number values', t => {
  cxs({
    fontSize: 32
  })
  t.regex(css(), /font-size:32px}$/)
})

test('creates pseudoclass rules', t => {
  cxs({
    color: 'cyan',
    ':hover': {
      color: 'magenta'
    }
  })
  t.regex(css(), /:hover/)
})

test('creates @media rules', t => {
  cxs({
    color: 'cyan',
    '@media screen and (min-width:32em)': {
      color: 'magenta'
    }
  })
  t.regex(css(), /@media/)
})

test('dedupes repeated styles', t => {
  const dupe = {
    color: 'cyan',
    fontSize: 32
  }

  cxs(dupe)
  cxs(dupe)

  const cssString = css()
  const rules = cssString.split('.')
    .filter(s => s.length)

  t.is(rules.length, 2)
})

test('handles array values', t => {
  t.pass(2)
  t.notThrows(() => {
    cxs({
      color: [ 'blue', 'var(--blue)' ]
    })
  })
  t.regex(css(), /var/)
})

test('handles prefixed styles with array values', t => {
  t.pass(3)
  t.notThrows(() => {
    const prefixed = prefixer({
      display: 'flex'
    })
    cxs(prefixed)
  })
  t.regex(css(), /\-webkit\-flex/)
  t.regex(css(), /\-ms\-flexbox/)
})

test('handles prefixed styles (including ms) in keys', t => {
  t.pass(3)
  t.notThrows(() => {
    const prefixed = prefixer({
      alignItems: 'center'
    })
    cxs(prefixed)
  })
  t.regex(css(), /\-webkit\-align-items/)
  t.regex(css(), /\-ms\-flex-align/)
})

test('ignores null values', t => {
  cxs({
    color: 'tomato',
    padding: null
  })
  t.is(css().includes('null'), false)
})

test('handles 0 values', t => {
  cxs({
    padding: 0,
    fontFamily: 0,
    border: 0
  })
  t.is(css().includes('border'), true)
})

test('should handle ::-moz-inner-focus', t => {
  cxs({
    color: 'tomato',
    '::-moz-inner-focus': {
      border: 0,
      padding: 0
    }
  })
  t.is(css().includes('-moz-inner-focus'), true)
})

