import test from 'ava'
import cxs from '../src/object'

test.afterEach(() => {
  cxs.reset()
})

test('exports a function', t => {
  t.is(typeof cxs, 'function')
})

test('returns a rule object', t => {
  const a = cxs()
  t.is(typeof a, 'object')
  t.is(typeof a.toString(), 'string')
  t.is(typeof a.push, 'function')
  t.is(typeof a.hover, 'function')
  t.is(typeof a.focus, 'function')
  t.is(typeof a.active, 'function')
  t.is(typeof a.disabled, 'function')
  t.is(typeof a.media, 'function')
})

test('converts objects to css', t => {
  const a = cxs({
    color: 'tomato',
    fontSize: 32
  })
  const css = cxs.css
  t.is(typeof a.toString(), 'string')
  t.is(typeof css, 'string')
  t.regex(css, /color:tomato;font-size:32px/)
})

test('converts nested objects to css', t => {
  const a = cxs({
    color: 'tomato',
    fontSize: 32,
    ':hover': {
      color: 'blue'
    },
    '@media screen and (min-width: 40em)': {
      color: 'green',
      ':hover': {
        color: 'black'
      }
    }
  })
  const css = cxs.css
  t.is(typeof css, 'string')
  const first = new RegExp('^.' + a.toString() + '{color:tomato')
  t.regex(css, first)
  t.regex(css, /color:tomato;font-size:32px/)
  t.regex(css, /:hover{color:blue}/)
  t.regex(css, /@media screen and \(min-width: 40em\){/)
})
