import test from 'ava';
import filterNull from '../../src/util/filter-null'

test('filters null', t => {
  const obj = {
    a: 'b',
    d: '',
    e: 0
  }

  const expectedObj = {
    a: 'b',
    d: '',
    e: 0
  }

  t.deepEqual(filterNull(obj), expectedObj)
})
