
import test from 'ava'
import React from 'react'
import { mount } from 'enzyme'
import jsdom from 'jsdom-global'
import withCxs, { cxs } from '../src'

jsdom('<html></html>')

const Base = withCxs(({ Tag = 'div', ...props}) => <Tag {...props} />)

const Button = (props) => {
  const cx = {
    display: 'inline-block',
    padding: 8,
    color: 'inherit',
    backgroundColor: 'transparent',
    border: 0,
    WebkitAppearance: 'none',
    MozAppearance: 'none'
  }

  return <Base {...props} Tag='button' css={cx} />
}

let wrapper

test('renders', t => {
  t.notThrows(() => {
    wrapper = mount(<Base />)
    wrapper = mount(<Button />)
  })
})

test('adds micro classNames', t => {
  const { className } = wrapper.find('button').props()
  t.regex(className, /d\-inline\-block/)
})

test('exports cxs instance', t => {
  t.is(typeof cxs, 'function')
  t.is(typeof cxs.css, 'function')
  t.is(typeof cxs.css(), 'string')
})

test('adds styles', t => {
  t.regex(cxs.css(), /display:inline-block/)
  t.regex(cxs.css(), /background-color/)
})

