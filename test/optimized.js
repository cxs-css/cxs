
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

test('returns classNames', t => {
  const cx = cxs(style)
  t.is(typeof cx, 'string')
  t.regex(cx, /^cxs-margin-0/)
  t.is(cx.split(' ').length, 2)
})

test('inserts 2 rules', t => {
  cxs(style)
  t.is(cxs.rules.length, 2)
})

test('includes common declaration in ruleset', t => {
  cxs(style)
  t.regex(cxs.rules[0].cssText, /margin:0/)
})

test('removes common declaration in custom ruleset', t => {
  cxs(style)
  t.notRegex(cxs.rules[1].cssText, /margin:0/)
})

test('does not extract common styles from nested objects', t => {
  const cx = cxs({
    color: 'tomato',
    ':hover': {
      margin: 0
    },
    'span': {
      display: 'block'
    }
  })
  t.is(cx.split(' ').length, 1)
  t.notRegex(cx, /margin-0/)
  t.notRegex(cx, /display-block/)
})

test('inserts common declarations into stylesheet', t => {
  cxs(style)
  t.regex(cxs.css, /\.cxs-margin-0/)
  t.regex(cxs.css, /margin:0/)
})

test('dedupes common rulesets', t => {
  const cx1 = cxs(style)
  const cx2 = cxs(style)

  t.is(cxs.rules.length, 2)
  t.is(cx1.split(' ').length, 2)
  t.is(cx2.split(' ').length, 2)
})

