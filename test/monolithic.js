import test from 'ava'
import cxs from '../src/monolithic'

test.afterEach.always(() => {
  cxs.reset()
  cxs.prefix('_cxs')
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

test('returns cached classNames', t => {
  const a = cxs({ color: 'tomato' })
  const b = cxs({ color: 'tomato' })

  const css = cxs.css()
  t.is(a, b)
})

test('skips null values', t => {
  cxs({
    color: 'tomato',
    fontSize: null
  })
  const css = cxs.css()
  t.is(css, '._cxs0{color:tomato}')
})

test('sets a prefix', t => {
  cxs.prefix('hello')
  const a = cxs({ color: 'tomato' })
  t.is(a, 'hello0')
})
