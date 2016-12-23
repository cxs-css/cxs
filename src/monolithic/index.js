
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

  const className = hash(JSON.stringify(style))

  selector = selector || '.' + className

  if (cache[selector]) return className

  const rules = parse(selector, style)

  rules.forEach(rule => sheet.insert(rule))

  cache[selector] = className

  return className
}

const parse = (selector, styles, media) => {
  const decs = []
  const rules = []

  for (let key in styles) {
    const value = styles[key]
    const type = typeof value

    if (type === 'number' || type === 'string') {
      decs.push(createDec(key, value))
      continue
    } else if (/^:/.test(key)) {
      parse(selector + key, value, media)
        .forEach(r => rules.push(r))
      continue
    } else if (/^@media/.test(key)) {
      parse(selector, value, key)
        .forEach(r => rules.push(r))
      continue
    } else {
      parse(selector + ' ' + key, value, media)
        .forEach(r => rules.push(r))
      continue
    }
  }

  rules.unshift(createRule(selector, decs, media))

  return rules
}

const createDec = (key, value) => {
  const prop = hyphenate(key)
  const val = addPx(key, value)
  return prop + ':' + val
}

const createRule = (selector, decs, media) => {
  const rule = `${selector}{${decs.join(';')}}`
  const css = media ? `${media}{${rule}}` : rule
  return css

  // sheet.insert(css)
}

cxs.reset = reset
cxs.css = css

export default cxs

