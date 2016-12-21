
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

const cxs = (a, b) => {
  let selector
  if (typeof a === 'string') {
    selector = a
  }
  const style = selector ? b : a
  const hashname = hash(JSON.stringify(style))
  selector = selector || '.' + hashname

  parse(selector, style)

  return hashname
}

const parse = (selector, obj, media, children = '') => {
  for (let key in obj) {
    const value = obj[key]
    const type = typeof value

    if (type === 'number' || type === 'string') {
      createRule(selector + children, key, value, media)
      continue
    } else if (/^:/.test(key)) {
      parse(selector, value, media, children + key)
      continue
    } else if (/^@media/.test(key)) {
      parse(selector, value, key, children)
      continue
    } else {
      parse(selector, value, media, children + ' ' + key)
      continue
    }
  }
}

const createRule = (selector, key, value, media) => {
  const id = selector + key + value + media

  if (cache[id]) return

  const prop = hyphenate(key)
  const val = addPx(key, value)
  const rule = `${selector}{${prop}:${val}}`
  const css = media ? `${media}{${rule}}` : rule

  sheet.insert(css)
  cache[id] = true

  return
}

cxs.reset = reset
cxs.css = css

export default cxs

