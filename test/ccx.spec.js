
import test from 'ava'
import hash from 'node-murmurhash'
import jsdom from 'jsdom-global'
import ccx, {
  store,
  cache,
  getRules,
  attach
} from '../src/ccx'

jsdom('<html></html>')

const style = {
  color: 'tomato',
  display: 'flex',
  fontSize: 32,
}

test('should not throw', t => {
  t.notThrows(() => {
    const cx = ccx(style)
    ccx.clearCache()
  })
})

test('returns a classname', t => {
  const cx = ccx(style)
  t.is(typeof cx, 'string')
  ccx.clearCache()
})

test('returns a consistent hashed classname', t => {
  const hashname = hash(JSON.stringify(style), 128)
  const cx = ccx(style)
  t.is(cx, `cx-${hashname}`)
  ccx.clearCache()
})

test('adds the rule to cache', t => {
  t.plan(2)
  const id = `cx-${hash(JSON.stringify(style), 128)}`
  const cx = ccx(style)
  t.is(typeof cache, 'object')
  t.is(typeof cache[id], 'object')
  ccx.clearCache()
})

test('handles multiple classes', t => {
  const cx = ccx(style, 'red', 'm1')
  t.regex(cx, /^cx.+\sred\sm1$/)
  ccx.clearCache()
})

test('clears cache', t => {
  t.plan(1)
  const cx = ccx(style)
  ccx.clearCache()
  t.deepEqual(cache, ({}))
})

test('attaches a style tag and CSSStyleSheet', t => {
  t.plan(2)
  attach()
  const tag = document.getElementById('ccx')
  t.true(ccx.sheet instanceof CSSStyleSheet)
  t.true(tag.tagName === 'STYLE')
  ccx.clearCache()
})

test('dedupes repeated styles', t => {
  const dupe = {
    color: 'cyan',
    fontSize: 32
  }
  const cx1 = ccx(style)
  const cx2 = ccx(dupe)
  const cx3 = ccx(dupe)
  const rules = getRules()
  t.is(rules.length, 2)
  ccx.clearCache()
})

test('Adds px unit to number values', t => {
  const sx = {
    fontSize: 32
  }
  const cx = ccx(sx)
  const rules = getRules()
  t.regex(rules[0], /font-size:32px}$/)
  ccx.clearCache()
})

test('adds vendor prefixes', t => {
  const sx = {
    display: 'flex'
  }
  const cx = ccx(sx)
  const rules = getRules()
  t.regex(rules[0], /\-webkit\-flex/)
  ccx.clearCache()
})

test('creates pseudoclass rules', t => {
  t.plan(2)
  const sx = {
    color: 'cyan',
    ':hover': {
      color: 'magenta'
    }
  }
  const cx = ccx(sx)
  const rules = getRules()
  t.is(rules.length, 2)
  const hoverRule = Object.keys(cache).reduce((a, b) => /\:hover$/.test(b) ? cache[b] : null, null)
  t.regex(hoverRule.selector, /\:hover$/)

  ccx.clearCache()
})

test('creates @media rules', t => {
  t.plan(2)
  const sx = {
    color: 'cyan',
    '@media screen and (min-width:32em)': {
      color: 'magenta'
    }
  }
  const cx = ccx(sx)
  const rules = getRules()
  t.is(rules.length, 2)
  t.regex(rules[1], /^@media/)

  ccx.clearCache()
})

test('should extract common declarations', t => {
  const sx = {
    display: 'block',
    textAlign: 'center',
    fontSize: 48
  }
  const cx = ccx(sx)
  const rules = getRules()
  console.log(rules)

  ccx.clearCache()
})

/*
- Should extract common rules
- Common rules should match property value pairs

- context rerender
- It should skip existing rules
- It should create new updated rules

- after render clean up
*/
