
import test from 'ava'
import hash from '../src/hash'

test('returns a hash string', t => {
  const h = hash('hello')
  t.is(typeof h, 'string')
  t.not(h, 'hello')
})

