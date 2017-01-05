
import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import {
  isElement,
  isDOMComponent
} from 'react-addons-test-utils'
import comp, { cxs } from '../src/static'

let wrapper
let inner
let Box

test.afterEach(() => {
  cxs.reset()
})

test('does not throw', t => {
  t.notThrows(() => {
    Box = comp()({
      color: 'blue'
    })
  })
})

test('returns a React component', t => {
  t.is(typeof Box, 'function')
  t.true(isElement(<Box />))
  t.false(isDOMComponent(<Box />))
})

test('renders a div', t => {
  wrapper = shallow(<Box />)
  t.is(wrapper.find('div').length, 1)
})

test('has a className', t => {
  t.is(wrapper.props().className, 'c-blue')
})

test('exposes cxs instance', t => {
  t.truthy(cxs)
  t.is(typeof cxs, 'function')
  t.is(typeof cxs.getCss(), 'string')
})

test('converts object to cxs CSS', t => {
  Box = comp()({
    color: 'tomato'
  })
  wrapper = shallow(<Box />)
  t.regex(cxs.getCss(), /color:tomato/)
})

test('does not handle functions as argument', t => {
  Box = comp()(props => ({
    color: props.foo ? 'tomato' : 'green'
  }))
  wrapper = shallow(<Box />)
  t.is(wrapper.props().className, '')
})

test('accepts a component instead of tag string', t => {
  cxs.reset()
  Box = comp('div')({
    padding: 16
  })
  const BorderBox = comp(Box)({
    border: '1px solid'
  })
  shallow(<BorderBox />).html()
  t.regex(cxs.getCss(), /padding:16px/)
  t.regex(cxs.getCss(), /border:1px\ solid/)
})


