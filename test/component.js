import test from 'ava'
import React from 'react'
import { create as render } from 'react-test-renderer'
import cxs from '../src/component'

import PropTypes from 'prop-types'

test.afterEach.always(() => {
  cxs.reset()
})

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

test('removes props defined as propTypes', t => {
  const C = cxs('div')(props => ({
    color: props.color
  }))
  C.propTypes = {
    color: PropTypes.string
  }
  const json = render(<C color='tomato' children='Hello' />).toJSON()
  t.falsy(json.props.color)
  t.is(json.props.className, 'x0')
  t.is(cxs.css(), '.x0{color:tomato}')
  t.snapshot(json)
})

