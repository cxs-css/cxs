import test from 'ava'
import cxs, {
  sheet,
  cache,
  createCSS
} from '../src'

test.afterEach.always(() => {
  cxs.reset()
})

test('exports a function', t => {
  t.is(typeof cxs, 'function')
})

test('sheet is an object', t => {
  t.is(typeof sheet, 'object')
})

test('cache is an object', t => {
  t.is(typeof cache, 'object')
})

test('createCSS is a function', t => {
  t.is(typeof createCSS, 'function')
})

test('cxs.reset() is a function', t => {
  t.is(typeof cxs.reset, 'function')
})

test('cxs.css is a string', t => {
  const css = cxs.css
  t.is(typeof css, 'string')
})

test('returns a rule object', t => {
  const a = cxs('color: tomato')
  t.is(typeof a, 'object')
  t.is(typeof a.toString(), 'string')
  t.is(typeof a.hover, 'function')
  t.is(typeof a.focus, 'function')
  t.is(typeof a.active, 'function')
  t.is(typeof a.disabled, 'function')
  t.is(typeof a.media, 'function')
  t.is(typeof a.push, 'function')
})

test('creates CSS rules', t => {
  const a = cxs('color: tomato;')
  t.is(cxs.css, '.' + a.toString() + '{color: tomato;}')
})

test('creates pseudoclass rules', t => {
  const a = cxs('color: tomato;', { child: ':hover' })
  t.is(cxs.css, '.' + a.toString() + ':hover{color: tomato;}')
})

test('creates media at rules', t => {
  const a = cxs('color: tomato;', { media: '@media print' })
  t.is(cxs.css, '@media print{' + '.' + a.toString() + '{color: tomato;}}')
})

test('creates media at rules with pseudoclasses', t => {
  const a = cxs('color: tomato;', { child: ':focus', media: '@media print' })
  t.is(cxs.css, '@media print{' + '.' + a.toString() + ':focus{color: tomato;}}')
})

test('media rules are always after base rules', t => {
  const a = cxs('width:50%', { media: '@media print' })
  const b = cxs('width:100%')
  cxs('width:50%', { media: '@media print' })
  const css = cxs.css
  const cn1 = a.toString()
  const cn2 = b.toString()
  const RE1 = new RegExp('^\.' + cn2 + '{width:100%}')
  const RE2 = new RegExp('print{\.' + cn1 + '{width:50%}}$')
  t.regex(css, RE1)
  t.regex(css, RE2)
})

test('creates rules with custom classnames', t => {
  cxs('color: tomato;', { className: 'hello' })
  t.is(cxs.css, '.hello{color: tomato;}')
})

test('dedupes repeated rules', t => {
  const a = cxs('color: tomato')
  const b = cxs('color: tomato')
  t.is(a.toString(), b.toString())
  t.is(cxs.css, '.' + a.toString() + '{color: tomato}')
})

test('accepts a selector option', t => {
  cxs('color: tomato', { selector: 'body' })
  t.is(cxs.css, 'body{color: tomato}')
})

test('rule.hover returns a rule object', t => {
  const a = cxs('color: tomato')
    .hover('color: green')
  const cn = a.toString()
  t.is(typeof a, 'object')
  t.is(typeof a.toString(), 'string')
  t.is(cxs.css, '.' + cn + '{color: tomato}' + '.' + cn + ':hover{color: green}')
})

test('rule.focus returns a rule object', t => {
  const a = cxs('color: tomato')
    .focus('color: green')
  const cn = a.toString()
  t.is(typeof a, 'object')
  t.is(typeof a.toString(), 'string')
  t.is(cxs.css, '.' + cn + '{color: tomato}' + '.' + cn + ':focus{color: green}')
})

test('rule.active returns a rule object', t => {
  const a = cxs('color: tomato')
    .active('color: green')
  const cn = a.toString()
  t.is(typeof a, 'object')
  t.is(typeof a.toString(), 'string')
  t.is(cxs.css, '.' + cn + '{color: tomato}' + '.' + cn + ':active{color: green}')
})

test('rule.disabled returns a rule object', t => {
  const a = cxs('color: tomato')
    .disabled('color: green')
  const cn = a.toString()
  t.is(typeof a, 'object')
  t.is(typeof a.toString(), 'string')
  t.is(cxs.css, '.' + cn + '{color: tomato}' + '.' + cn + ':disabled{color: green}')
})

test('rule.media returns a rule object', t => {
  const a = cxs('color: tomato')
    .media('@media print', 'color: green')
  const cn = a.toString()
  t.is(typeof a, 'object')
  t.is(typeof a.toString(), 'string')
  t.is(cxs.css, '.' + cn + '{color: tomato}' + '@media print{.' + cn + '{color: green}}')
})

test('rule.push returns a rule object', t => {
  const a = cxs('color: tomato')
    .push('color: green', { child: ':visited' })
  const cn = a.toString()
  t.is(typeof a, 'object')
  t.is(typeof a.toString(), 'string')
  t.is(cxs.css, '.' + cn + '{color: tomato}' + '.' + cn + ':visited{color: green}')
})

test('cache key is concatenated arguments', t => {
  cxs('color: tomato', { child: 'foo', media: 'bar' })
  const [ key ] = Object.keys(cache)
  t.is(key, 'color: tomato_foo_bar__')
})

test('cache returns a rule object', t => {
  const a = cxs('color: tomato')
  const [ key ] = Object.keys(cache)
  const cached = cache[key]
  t.is(typeof cached, 'object')
  t.is(cached.toString(), a.toString())
})
