
import test from 'ava'
import hash from 'node-murmurhash'
import jsdom from 'jsdom-global'
import cxs from '../src'

jsdom('<html></html>')

test.beforeEach(t => {
  cxs.clearCache()

  t.context.style = {
    display: 'block',
    textAlign: 'center',
    fontSize: 48
  }

  t.context.cx = cxs(t.context.style)
})

test('extracts common declarations', t => {
  t.plan(2)

  const rules = cxs.getRules()

  t.regex(rules[1], /^\.cxs\-display\-block/)
  t.regex(rules[2], /^\.cxs\-text-align-center/)
})

test('extracted declarations are included in className', t => {
  t.is(t.context.cx.split(' ').length, 3)
})
