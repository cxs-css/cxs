
import test from 'ava'
import React from 'react'
import { mount } from 'enzyme'
import jsdom from 'jsdom-global'
import Cxs, { cxs } from '../src'

jsdom('<html></html>')

const Base = Cxs(({ Tag = 'div', ...props}) => <Tag {...props} />)

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

  return <Base {...props} Tag='button' className={cx} />
}

let wrapper

test('renders', t => {
  t.notThrows(() => {
    wrapper = mount(<Base />)
    wrapper = mount(<Button />)
  })
})

test('adds hashed classNames', t => {
  const { className } = wrapper.find('button').props()
  t.regex(className, /cxs/)
})

test('exports cxs instance', t => {
  t.is(typeof cxs, 'function')
  t.is(typeof cxs.rules, 'object')
  t.is(typeof cxs.css, 'string')
})

test('adds styles', t => {
  t.regex(cxs.css, /display:inline-block/)
  t.regex(cxs.css, /background-color/)
})

test('warns on incorrect className prop type', t => {
  let callCount = 0
  console.error = (text) => {
    callCount++
  }
  wrapper = mount(<Base className={2} />)
  wrapper = mount(<Base className='hi' />)
  wrapper = mount(<Base className={{}} />)
  t.is(callCount, 1)
})
