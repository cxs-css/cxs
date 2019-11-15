import test from 'ava'
import cxs from '../src'

test.afterEach.always(() => {
  cxs.reset()
  cxs.prefix('x')
})

test('exports a function', t => {
  t.is(typeof cxs, 'function')
})

test('returns a className', t => {
  const a = cxs({ color: 'tomato' })
  t.is(typeof a, 'string')
  t.regex(a, /^x/)
})

test('cxs.reset() is a function', t => {
  t.is(typeof cxs.reset, 'function')
})

test('cxs.css() is a function', t => {
  t.is(typeof cxs.css, 'function')
})

test('cxs.css() returns a string', t => {
  const css = cxs.css()
  t.is(typeof css, 'string')
})

test('creates a CSS rule', t => {
  cxs({ color: 'tomato' })
  t.is(typeof cxs.css(), 'string')
  t.is(cxs.css(), '.x0{color:tomato}')
})

test('deduplicates', t => {
  const a = cxs({ color: 'tomato' })
  const b = cxs({ color: 'tomato' })
  t.is(a, b)
  t.is(cxs.css(), '.x0{color:tomato}')
})

test('handles multiple declarations', t => {
  const a = cxs({
    fontSize: '48px',
    color: 'tomato',
    background: null,
    ':hover': {
      color: 'black'
    }
  })
  t.is(a.split(/\s+/).length, 3)
})

test('handles child selectors', t => {
  cxs({
    color: 'tomato',
    ':hover': {
      color: 'black'
    }
  })
  t.is(cxs.css(), '.x0{color:tomato}.x1:hover{color:black}')
})

test('removes ampersand selectors', t => {
  cxs({
    color: 'tomato',
    '&:hover': {
      color: 'black'
    }
  })
  t.is(cxs.css(), '.x0{color:tomato}.x1:hover{color:black}')
})

test('handles media queries', t => {
  cxs({
    color: 'tomato',
    '@media print': {
      color: 'black'
    }
  })
  t.is(cxs.css(), '.x0{color:tomato}@media print{.x1{color:black}}')
})

test('handles nested objects', t => {
  cxs({
    '@media screen': {
      ':hover': {
        color: 'tomato'
      }
    }
  })
  t.is(cxs.css(), '@media screen{.x0:hover{color:tomato}}')
})

test('ignores null values', t => {
  const a = cxs({
    color: null
  })
  t.is(a, '')
  t.is(cxs.css(), '')
})

test('resets cached rules', t => {
  cxs({ color: 'tomato' })
  cxs.reset()
  t.is(cxs.css().length, 0)
})

test('media rules stay in order', t => {
  cxs({
    color: 'tomato',
    '@media screen': {
      color: 'black'
    }
  })
  const css = cxs.css()
  t.regex(css, /^\.x0/)
  t.regex(css, /@media/)
})

test('cxs.prefix is a function', t => {
  t.is(typeof cxs.prefix, 'function')
})

test('uses custom prefix', t => {
  cxs.prefix('_cxs')
  cxs({ color: 'tomato' })
  t.is(cxs.css(), '._cxs0{color:tomato}')
})

test('uses custom hook', t => {
  const fakeAutoprefixer = (val) => val.split("grid").join("-ms-grid");
  cxs.hook(fakeAutoprefixer);

  cxs({ display: 'grid' })
  t.is(cxs.css(), '.x0{display:-ms-grid}')
})
