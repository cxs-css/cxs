
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

test('separates common declaration classNames', t => {
  const cx = cxs(style)
  t.regex(cx, /^cxs-margin-0\s/)
})

test('separates common declaration rules', t => {
  cxs(style)
  const rules = cxs.rules
  t.is(rules.length, 2)
  t.regex(rules[0].cssText, /margin:0/)
  t.notRegex(rules[1].cssText, /margin/)
})

test('does not extract nested common declarations', t => {
  const cx = cxs({
    color: 'tomato',
    ':hover': {
      display: 'block'
    },
    '@media screen and (min-width:40em)': {
      margin: 0
    }
  })
  t.notRegex(cx, /\s/)
  t.is(cxs.rules.length, 3)
})

test('inserts common rules into stylesheet', t => {
  cxs({
    margin: 0,
    display: 'block'
  })
  t.regex(cxs.css, /\.cxs-margin-0/)
  t.regex(cxs.css, /\.cxs-display-block/)
  t.regex(cxs.css, /margin:0/)
  t.regex(cxs.css, /display:block/)
})

