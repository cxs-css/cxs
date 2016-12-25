
import React from 'react'
import test from 'ava'
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
  t.truthy(wrapper.props().className)
  t.regex(wrapper.props().className, /^cxs-/)
})

test('exposes cxs instance', t => {
  t.truthy(cxs)
  t.is(typeof cxs, 'function')
  t.is(typeof cxs.css, 'string')
})

test('converts object to cxs CSS', t => {
  cxs.clear()
  cxs.sheet.flush()
  cxs.sheet.inject()
  Box = comp()({
    color: 'tomato'
  })
  wrapper = shallow(<Box />)
  t.regex(cxs.css, /color:tomato/)
})

test('accepts functions as argument', t => {
  cxs.clear()
  cxs.sheet.flush()
  cxs.sheet.inject()
  Box = comp()(props => ({
    color: props.foo ? 'tomato' : 'green'
  }), { removeProps: [ 'foo' ] })
  wrapper = shallow(<Box />)
  t.regex(cxs.css, /color:green/)
  t.notRegex(cxs.css, /color:tomato/)
})

test('props are passed to component style function', t => {
  cxs.clear()
  cxs.sheet.flush()
  cxs.sheet.inject()
  wrapper = shallow(<Box foo />)
  t.regex(cxs.css, /color:tomato/)
  t.notRegex(cxs.css, /color:green/)
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
  cxs.clear()
  cxs.sheet.flush()
  cxs.sheet.inject()
  Box = comp('div')({
    padding: 16
  })
  const BorderBox = comp(Box)({
    border: '1px solid'
  })
  shallow(<BorderBox />).html()
  t.regex(cxs.css, /padding:16px/)
  t.regex(cxs.css, /border:1px\ solid/)
})


