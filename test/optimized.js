
import test from 'ava'
import cxs from '../src/optimized'

const style = {
  color: 'tomato',
  margin: 0
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


