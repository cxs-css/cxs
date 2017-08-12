import test from 'ava'
import browser from 'browser-env'
browser()

const cxs = require('../src')

test.afterEach(() => {
  const tag = document.head.querySelector('style')
  if (tag) {
    const { sheet } = tag
    while (sheet.cssRules.length) {
      sheet.deleteRule(0)
    }
  }
})

test('inserts a style tag', t => {
  const tag = document.head.querySelector('style')
  t.truthy(tag)
})

test('inserts CSS rules', t => {
  const a = cxs({
    color: 'tomato'
  })
  const { sheet } = document.head.querySelector('style')
  t.is(sheet.cssRules.length, 1)
})

