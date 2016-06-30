import test from 'ava'
import toCssProperty from '../../src/util/to-css-property'

test('converts to css property', t => {
  t.is(toCssProperty('fontSize'), 'font-size')
})

test('handles vendor prefixes', t => {
  t.is(toCssProperty('WebkitTransition'), '-webkit-transition')
})
