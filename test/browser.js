import test from 'ava'
import browser from 'browser-env'
import { Sheet } from '../src'
browser()

test.afterEach(() => {
  const tag = document.head.querySelector('#__cxs__')
  if (tag) {
    document.head.removeChild(tag)
  }
})

test('Sheet is a function', t => {
  t.is(typeof Sheet, 'function')
})

test('Sheet returns a CSSStyleSheet', t => {
  const sheet = Sheet()
  t.is(typeof sheet, 'object')
  t.true(sheet instanceof window.CSSStyleSheet)
})

test('sheet.css returns a string', t => {
  const sheet = Sheet()
  t.is(typeof sheet.css, 'string')
})

test('sheet.insert adds a rule', t => {
  const sheet = Sheet()
  sheet.insert('body {margin: 0;}')
  t.is(sheet.css, 'body {margin: 0;}')
})

test('sheet.reset removes all rules', t => {
  const sheet = Sheet()
  sheet.insert('body {margin: 0;}')
  sheet.insert('* {box-sizing: border-box;}')
  sheet.reset()
  t.is(sheet.css, '')
})

test('Sheet injects a style tag', t => {
  Sheet()
  const el = document.head.querySelector('style')
  t.true(el instanceof window.HTMLStyleElement)
})
