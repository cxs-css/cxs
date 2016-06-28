
import test from 'ava'
import hash from 'node-murmurhash'
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

test('adds the rule to cache', t => {
  t.plan(2)
  const id = `cxs-${hash(JSON.stringify(style), 128)}`
  const cx = cxs(style)
  t.is(typeof cache, 'object')
  t.is(typeof cache[id], 'object')
})

test('handles multiple classes', t => {
  const cx = cxs(style, 'red', 'm1')
  t.regex(cx, /^cxs.+\sred\sm1$/)
})

test('clears cache', t => {
  t.plan(1)
  const cx = cxs(style)
  cxs.clearCache()
  t.deepEqual(cache, ({}))
})

test('attaches a style tag and CSSStyleSheet', t => {
  t.plan(2)
  cxs.attach()
  const tag = document.getElementById('cxs')
  t.true(cxs.sheet instanceof CSSStyleSheet)
  t.true(tag.tagName === 'STYLE')
})

test('dedupes repeated styles', t => {
  const dupe = {
    color: 'cyan',
    fontSize: 32
  }
  const cx1 = cxs(style)
  const cx2 = cxs(dupe)
  const cx3 = cxs(dupe)
  const rules = cxs.getRules()
  t.is(rules.length, 2)
})

test('Adds px unit to number values', t => {
  const sx = {
    fontSize: 32
  }
  const cx = cxs(sx)
  const rules = cxs.getRules()
  t.regex(rules[0], /font-size:32px}$/)
})

test('adds vendor prefixes', t => {
  const sx = {
    display: 'flex'
  }
  const cx = cxs(sx)
  const rules = cxs.getRules()
  t.regex(rules[0], /\-webkit\-flex/)
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
  const rules = cxs.getRules()
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
  const rules = cxs.getRules()
  t.is(rules.length, 2)
  t.regex(rules[1], /^@media/)
})

test('extracts common declarations', t => {
  t.plan(4)
  const sx = {
    display: 'block',
    textAlign: 'center',
    fontSize: 48
  }
  const cx = cxs(sx)
  const rules = cxs.getRules()
  t.is(rules.length, 3)
  t.regex(rules[1], /^\.cxs\-display\-block/)
  t.regex(rules[2], /^\.cxs\-text-align-center/)
  t.is(cx.split(' ').length, 3)
})

test('ignores null values', t => {
  const cx = cxs({
    color: 'tomato',
    padding: null
  })
  const css = cxs.getCss()
  t.is(css.includes('null'), false)
})

/*
- context rerender
- It should skip existing rules
- It should create new updated rules

- after render clean up
*/
