import test from 'ava'
import React from 'react'
import { create as render } from 'react-test-renderer'
import cxs from '../src/component'

test('exports a function', t => {
  t.is(typeof cxs, 'function')
  t.is(typeof cxs('div'), 'function')
})

test('renders', t => {
  const A = cxs('div')()
  const B = cxs('div')({
    color: 'tomato'
  })
  const C = cxs('div')(props => ({
    color: props.color
  }))
  const a = render(<A />).toJSON()
  const b = render(<B />).toJSON()
  const c = render(<C />).toJSON()
  t.snapshot(a)
  t.snapshot(b)
  t.snapshot(c)
})

