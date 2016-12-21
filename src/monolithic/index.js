
import { StyleSheet } from 'glamor/lib/sheet'
import hash from '../hash'
import { addPx, hyphenate } from '../util'

export let cache = {}

export const sheet = new StyleSheet()

sheet.inject()

export const css = () => sheet.rules()
  .map(rule => rule.cssText)
  .join('')

export const reset = () => {
  for (let key in cache) {
    delete cache[key]
  }
  sheet.flush()
}

const cxs = (...args) => {
  let selector
  if (typeof args[0] === 'string') {
    selector = args[0]
  }
  const style = selector ? args[1] : args[0]
  const hashname = hash(JSON.stringify(style))
  selector = selector || '.' + hashname

  parse(selector, style)

  return hashname
}

const parse = (selector, obj, media, children = '') => {
  const rules = []

  for (let key in obj) {
    const value = obj[key]
    const type = typeof value

    if (type === 'number' || type === 'string') {
      rules.push(
        createRule(selector + children, key, value, media)
      )
      continue
    }

    if (/^:/.test(key)) {
      parse(selector, value, media, children + key)
        .forEach(rule => {
          rules.push(rule)
        })
      continue
    }

    if (/^@media/.test(key)) {
      parse(selector, value, key, children)
        .forEach(rule => {
          rules.push(rule)
        })
      continue
    }

    parse(selector, value, media, children + ' ' + key)
      .forEach(rule => {
        rules.push(rule)
      })
    continue
  }

  return rules
}

const createRule = (selector, key, value, media) => {
  const prop = hyphenate(key)
  const val = addPx(key, value)
  const rule = `${selector}{${prop}:${val}}`
  const css = media ? `${media}{${rule}}` : rule
  const id = hash(css)

  if (cache[id]) return

  sheet.insert(css)
  cache[id] = true

  return {
    id,
    css
  }
}

cxs.reset = reset
cxs.css = css

export default cxs

