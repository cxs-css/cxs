
import test from 'ava'
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

test('accepts object classNames', t => {
  const cx = {
    color: 'tomato'
  }
  r.render(reactCxs(Root, { className: cx }))
  const tree = r.getRenderOutput()
  t.regex(tree.props.className, /^c\-tomato/)
})

test('accepts string classNames', t => {
  r.render(reactCxs(Root, { className: 'hello' }))
  const tree = r.getRenderOutput()
  t.is(tree.props.className, 'hello')
})

test('add rules to cxs', t => {
  t.regex(cxs.css(), /tomato/)
})

