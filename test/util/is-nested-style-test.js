import test from 'ava';
import isNestedStyle from '../../src/util/is-nested-style'

test('returns true when nested', t => {
  t.true(isNestedStyle({ fontSize: '24px' }))
})

test('returns false when not nested', t => {
  t.false(isNestedStyle('24px'))
})
