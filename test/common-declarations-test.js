
import test from 'ava'
import hash from 'murmurhash-js/murmurhash3_gc'
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

  const rules = cxs.rules

  t.regex(rules[0].css, /^\.cxs\-display\-block/)
  t.regex(rules[1].css, /^\.cxs\-text-align-center/)
})

test('extracted declarations are included in className', t => {
  t.is(t.context.cx.split(' ').length, 3)
})
