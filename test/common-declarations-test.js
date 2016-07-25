
import test from 'ava'
import jsdom from 'jsdom-global'
import cxs from '../src'

jsdom('<html></html>')

test.beforeEach(t => {
  cxs.clearCache()

  t.context.style = {
    display: 'block',
    textAlign: 'center',
    fontSize: 48,
    ':hover': {
      textDecoration: 'none'
    },
    'h1': {
      display: 'inline-block'
    },
    '@media screen': {
      display: 'table'
    },
    '@keyframes hello': {
      from: {
        display: 'block'
      },
      '50%': {
        display: 'table'
      },
      to: {
        display: 'inline-block'
      }
    }
  }

  t.context.cx = cxs(t.context.style)
})

test('extracts common declarations', t => {
  t.plan(2)

  const rules = cxs.rules

  t.regex(rules[0].css, /^\.cxs\-display\-block/)
  t.regex(rules[1].css, /^\.cxs\-text-align-center/)
})

test('does not extract common declarations from nested rules', t => {
  t.plan(3)
  t.false(/text\-decoration\-none/.test(t.context.cx))
  t.false(/inline\-block/.test(t.context.cx))
  t.false(/table/.test(t.context.cx))
})

test('extracted declarations are included in className', t => {
  t.is(t.context.cx.split(' ').length, 3)
})
