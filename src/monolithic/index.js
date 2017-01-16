
import { StyleSheet } from 'glamor/lib/sheet'
import hash from '../hash'

const options = {
}

export const setOptions = (opts) => {
  for (let key in opts) {
    options[key] = opts[key]
  }
}

export const sheet = new StyleSheet()

sheet.inject()

export const getCss = () => {
  let css = ''
  const rules = sheet.rules()
  for (let i = 0; i < rules.length; i++) {
    css += rules[i].cssText
  }
  return css
}

export const reset = () => {
  cxs.cache = {}
  sheet.flush()
}

const cxs = (a, b) => {
  let selector
  if (typeof a === 'string') {
    selector = a
  }
  const style = selector ? b : a

  const className = hash(JSON.stringify(style), options.prefix)

  selector = selector || '.' + className

  if (cxs.cache[selector]) return className

  const rules = parse(selector, style)

  rules.forEach(rule => sheet.insert(rule))

  cxs.cache[selector] = className

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
    } else if (Array.isArray(value)) {
      value.forEach(val => {
        decs.push(createDec(key, val))
      })
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
}

export const hyphenate = (str) => ('' + str)
  .replace(/[A-Z]|^ms/g, '-$&')
  .toLowerCase()

export const addPx = (prop, value) => {
  if (typeof value !== 'number') return value
  if (unitlessProps.indexOf(prop) > -1) return value
  return value + 'px'
}

const unitlessProps = [
  'animationIterationCount',
  'boxFlex',
  'boxFlexGroup',
  'boxOrdinalGroup',
  'columnCount',
  'flex',
  'flexGrow',
  'flexPositive',
  'flexShrink',
  'flexNegative',
  'flexOrder',
  'gridRow',
  'gridColumn',
  'fontWeight',
  'lineClamp',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'tabSize',
  'widows',
  'zIndex',
  'zoom',
  'fillOpacity',
  'stopOpacity',
  'strokeDashoffset',
  'strokeOpacity',
  'strokeWidth'
]

cxs.cache = {}
cxs.reset = reset
cxs.getCss = getCss
cxs.setOptions = setOptions

export default cxs

