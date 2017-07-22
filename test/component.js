import test from 'ava'
import React from 'react'
import { create as render } from 'react-test-renderer'
import cxs from '../component'

test('cxs/component exports a function', t => {
  t.is(typeof cxs, 'function')
})

test('cxs/component creates a component', t => {
  const Hello = cxs('color:tomato').component('h1')
  const json = render(<Hello />).toJSON()
  t.is(json.type, 'h1')
  t.snapshot(<Hello />)
})
