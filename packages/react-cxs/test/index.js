
import test from 'ava'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import jsdom from 'jsdom-global'
import { StyleSheet } from 'glamor/lib/sheet'
import reactCxs, { cxs } from '../src'

jsdom('<html></html>')
const r = TestUtils.createRenderer()

const Root = (props) => (
  <div {...props}>Hello</div>
)

test('renders', t => {
  t.notThrows(() => {
    r.render(reactCxs(Root))
  })
})

test('renders a div', t => {
  r.render(reactCxs(Root))
  const tree = r.getRenderOutput()
  t.is(tree.type, 'div')
})

test('accepts css prop', t => {
  const cx = {
    color: 'tomato'
  }
  r.render(reactCxs(Root, { css: cx }))
  const tree = r.getRenderOutput()
  t.regex(tree.props.className, /^c\-tomato/)
})

test('add rules to cxs', t => {
  t.regex(cxs.css(), /tomato/)
})

