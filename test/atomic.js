import test from 'ava'
import cxs from '../src/atomic'
import {
  createClassName,
  abbrMedia,
  abbr,
  clean,
  combine,
  hyphenate,
  addPx,
} from '../src/atomic'

test.afterEach(() => {
  cxs.reset()
})

test('exports a function', t => {
  t.is(typeof cxs, 'function')
})

test('returns classnames', t => {
  const cn = cxs({
    color: 'tomato',
    fontSize: 32,
    ':hover': {
      color: 'blue'
    }
  })
  t.is(typeof cn, 'string')
  t.true(cn.length > 0)
  t.regex(cn, /c_tomato/)
  t.regex(cn, /c_blue_-hover/)
  t.regex(cn, /fs_32px/)
})

test('creates css', t => {
  cxs({
    color: 'tomato',
    fontSize: 32,
    ':hover': {
      color: 'blue'
    }
  })
  const css = cxs.css
  t.is(typeof css, 'string')
  t.true(css.length > 0)
  t.regex(css, /color:tomato/)
  t.regex(css, /font-size:32px/)
  t.regex(css, /color:blue/)
})

test('handles media queries', t => {
  const cn = cxs({
    color: 'tomato',
    '@media screen and (min-width: 32em)': {
      color: 'red'
    }
  })
  const css = cxs.css
  t.true(cn.length > 0)
  t.regex(css, /^\.c_tomato{/)
  t.regex(css, /\@media screen and \(min-width: 32em\){/)
  t.regex(css, /\.m0_c_red{/)
})

test('handles nested child selectors', t => {
  cxs({
    '@media screen and (min-width: 32em)': {
      ':hover': {
        color: 'tomato'
      },
      ' > h1': {
        color: 'black'
      }
    }
  })
  const css = cxs.css
  t.regex(css, /\@media screen and \(min-width: 32em\){/)
  t.regex(css, /:hover{color:tomato/)
  t.regex(css, /h1{color:black/)
})

test('skips null values', t => {
  cxs({
    color: 'tomato',
    fontSize: null
  })
  const css = cxs.css
  t.regex(css, /color:tomato/)
  t.notRegex(css, /font-size/)
})

test('createClassName returns a className', t => {
  const a = createClassName('font-size', '32px', '@media print', ':hover')
  t.is(a, 'm0_fs_32px_-hover')
})

test('clean removes special characters', t => {
  const str = `abc0-_<>%.:'"#`
  const a = clean(str)
  t.is(a, 'abc0-_--------')
})

test('combine joins strings', t => {
  const a = combine('-')('hi', 'hello', null, 'beep')
  t.is(a, 'hi-hello-beep')
})

test('abbrMedia returns a shorthand media query reference', t => {
  const a = abbrMedia('@media print')
  t.is(a, 'm0')
})

test('abbr abbreviates properties', t => {
  const a = abbr('margin-top')
  const b = abbr('font-family')
  const c = abbr('font')
  t.is(a, 'mt')
  t.is(b, 'ff')
  t.is(c, 'font')
})

test('hyphenates camelCase strings', t => {
  const a = hyphenate('fontSize')
  const b = hyphenate('WebkitAppearance')
  const c = hyphenate('msAppearance')
  t.is(a, 'font-size')
  t.is(b, '-webkit-appearance')
  t.is(c, '-ms-appearance')
})

test('addPx adds px unit to number values', t => {
  const a = addPx('fontSize', 32)
  const b = addPx('lineHeight', 1.5)
  t.is(a, '32px')
  t.is(b, 1.5)
})
