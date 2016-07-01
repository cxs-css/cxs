import test from 'ava'
import createDeclaration from '../../src/util/create-declaration'

test('creates declaration', t => {
  t.is(createDeclaration('fontSize', '24'), 'font-size:24')
})
