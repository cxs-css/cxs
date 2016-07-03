
import test from 'ava'
import hash from 'murmurhash-js/murmurhash3_gc'
import prefixer from 'inline-style-prefixer/static'
import jsdom from 'jsdom-global'
import cxs, { cache } from '../src'

jsdom('<html></html>')

const style = {
  color: 'tomato',
  display: 'flex',
  fontSize: 32,
}

test.beforeEach(() => {
  cxs.clearCache()
})

test('should not throw', t => {
  t.notThrows(() => {
    const cx = cxs(style)
  })
})

test('returns a classname', t => {
  const cx = cxs(style)
  t.is(typeof cx, 'string')
})

test('returns a consistent hashed classname', t => {
  const hashname = hash(JSON.stringify(style), 128)
  const cx = cxs(style)
  t.is(cx, `cxs-${hashname}`)
})

test('attaches a style tag and CSSStyleSheet', t => {
  t.plan(2)
  cxs.attach()
  const tag = document.getElementById('cxs')
  t.true(cxs.sheet instanceof CSSStyleSheet)
  t.true(tag.tagName === 'STYLE')
})

test('Adds px unit to number values', t => {
  const sx = {
    fontSize: 32
  }
  const cx = cxs(sx)
  const rules = cxs.rules
  t.regex(rules[0].css, /font-size:32px}$/)
})

test('creates pseudoclass rules', t => {
  t.plan(2)
  const sx = {
    color: 'cyan',
    ':hover': {
      color: 'magenta'
    }
  }
  const cx = cxs(sx)
  const rules = cxs.rules
  t.is(rules.length, 2)
  const hoverRule = Object.keys(cache).reduce((a, b) => /\:hover$/.test(b) ? cache[b] : null, null)
  t.regex(hoverRule.selector, /\:hover$/)
})

test('creates @media rules', t => {
  t.plan(2)
  const sx = {
    color: 'cyan',
    '@media screen and (min-width:32em)': {
      color: 'magenta'
    }
  }
  const cx = cxs(sx)
  const rules = cxs.rules
  t.is(rules.length, 2)
  t.regex(rules[1].css, /^@media/)
})

test('dedupes repeated styles', t => {
  const dupe = {
    color: 'cyan',
    fontSize: 32
  }

  const cx1 = cxs(style)
  const cx2 = cxs(dupe)
  const cx3 = cxs(dupe)

  t.is(cxs.rules.length, 2)
})

test('handles array values', t => {
  t.pass(2)
  t.notThrows(() => {
    const cx = cxs({
      color: [ 'blue', 'var(--blue)' ]
    })
  })
  t.regex(cxs.css, /var/)
})

test('ignores null values', t => {
  const cx = cxs({
    color: 'tomato',
    padding: null
  })
  const css = cxs.css
  t.is(css.includes('null'), false)
})

test('handles 0 values', t => {
  const cx = cxs({
    padding: 0,
    fontFamily: 0,
    border: 0
  })
  const css = cxs.css
  t.is(css.includes('border'), true)
})

test('should handle ::-moz-inner-focus', t => {
  const cx = cxs({
    color: 'tomato',
    '::-moz-inner-focus': {
      border: 0,
      padding: 0
    }
  })
  const css = cxs.css
  t.is(css.includes('-moz-inner-focus'), true)
})

