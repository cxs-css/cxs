
import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import {
  isElement,
  isDOMComponent
} from 'react-addons-test-utils'
import comp, { cxs } from '../src'

let wrapper
let inner
let Box

test('does not throw', t => {
  t.notThrows(() => {
    Box = comp()()
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
  t.is(wrapper.props().className, '')
})

test('exposes cxs instance', t => {
  t.truthy(cxs)
  t.is(typeof cxs, 'function')
  t.is(typeof cxs.getCss(), 'string')
})

test('converts object to cxs CSS', t => {
  cxs.reset()
  Box = comp()({
    color: 'tomato'
  })
  wrapper = shallow(<Box />)
  t.regex(cxs.getCss(), /color:tomato/)
})

test('accepts functions as argument', t => {
  cxs.reset()
  Box = comp()(props => ({
    color: props.foo ? 'tomato' : 'green'
  }), { removeProps: [ 'foo' ] })
  wrapper = shallow(<Box />)
  t.regex(cxs.getCss(), /color:green/)
  t.notRegex(cxs.getCss(), /color:tomato/)
})

test('props are passed to component style function', t => {
  cxs.reset()
  wrapper = shallow(<Box foo />)
  t.regex(cxs.getCss(), /color:tomato/)
  t.notRegex(cxs.getCss(), /color:green/)
})

test('removes style props from DOM element', t => {
  Box = comp()({}, {
    removeProps: [ 'foo', 'bar' ]
  })
  wrapper = shallow(<Box id='foo' foo bar />)
  t.truthy(wrapper.props().id)
  t.falsy(wrapper.props().foo)
  t.falsy(wrapper.props().bar)
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


