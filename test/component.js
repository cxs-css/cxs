import test from 'ava'
import React from 'react'
import { create as render } from 'react-test-renderer'
import cxs from '../src/component'

test('cxs/component exports a function', t => {
  t.is(typeof cxs, 'function')
})

test('cxs/component creates a component', t => {
  const Hello = cxs('h1')`color:tomato`
  const json = render(<Hello />).toJSON()
  t.is(json.type, 'h1')
  t.snapshot(json)
})

test('cxs/component creates a component with hover', t => {
  const Beep = cxs('h2')`color:tomato`
    .hover`
      color: black;
    `
  const json = render(<Beep />).toJSON()
  t.is(json.type, 'h2')
  t.snapshot(json)
})
