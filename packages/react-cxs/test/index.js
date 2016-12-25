
import test from 'ava'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import jsdom from 'jsdom-global'
import reactCxs, { cxs } from '../src'

jsdom('<html></html>')
const r = TestUtils.createRenderer()

const Root = (props) => (
  <div {...props}>Hello</div>
)

test('renders', t => {
  t.notThrows(() => {
    r.render(<Root />)
  })
})

test('renders a div', t => {
  r.render(<Root />)
  const tree = r.getRenderOutput()
  t.is(tree.type, 'div')
})

test('accepts object classNames', t => {
  const cx = {
    color: 'tomato'
  }
  r.render(<Root className={cx} />)
  const tree = r.getRenderOutput()
  t.regex(tree.props.className, /^cxs/)
})

test('accepts string classNames', t => {
  r.render(<Root className='hello' />)
  const tree = r.getRenderOutput()
  t.is(tree.props.className, 'hello')
})

test('attaches stylesheet to document', async t => {
  t.plan(3)
  const getTag = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      const style = document.querySelector('style')
      resolve(style)
    }, 20)
  })
  const style = await getTag()
  t.is(style.tagName, 'STYLE')
  t.true(style.sheet.cssRules.length > 0)
  t.is(style.sheet.cssRules[0].style.color, 'tomato')
})

test('add rules to cxs', t => {
  t.regex(cxs.css, /tomato/)
})

