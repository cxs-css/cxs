
import test from 'ava'
import hash from 'node-murmurhash'
import jsdom from 'jsdom-global'
import cxs from '../src'
import cache from '../src/cache'

jsdom('<html></html>')

test.beforeEach(t => {
  t.context.style = {
    color: 'tomato',
    display: 'flex',
    fontSize: 32,
  }

  t.context.cx = cxs(t.context.style)
})

test('adds the rule to cache', t => {
  t.plan(2)

  const id = `cxs-${hash(JSON.stringify(t.context.style), 128)}`

  t.is(typeof cache.rules, 'object')
  t.is(typeof cache.rules[id], 'object')
})

test('clears the cache', t => {
  t.plan(2)

  // Ensure the cache is not empty before clear
  t.truthy(Object.keys(cache.rules).length)

  cxs.clearCache()
  t.deepEqual(cache.rules, {})
})
