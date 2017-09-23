import test from 'ava'
import cxs from '../src/monolithic'

test.afterEach.always(() => {
  cxs.reset()
})

test('returns a monolithic className', t => {
  const cn = cxs({
    color: 'tomato',
    fontSize: '48px',
    '&:hover': {
      color: 'red',
      textDecoration: 'underline'
    },
    '@media screen': {
      fontSize: '64px',
      lineHeight: 1,
      '&:active': {
        outline: '4px solid lime',
        fontWeight: 'bold'
      }
    }
  })

  const css = cxs.css()
  t.is(typeof cn, 'string')
  t.is(typeof css, 'string')
})
