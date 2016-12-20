
// Update after perf tests

import { StyleSheet } from 'glamor/lib/sheet'

export const sheet = new StyleSheet()

sheet.inject()

let count = 0
export const cache = {}

export const reset = () => {
  for (let key in cache) {
    delete cache[key]
  }
  sheet.flush()
  count = 0
}

export const css = () => sheet.rules()
  .map(rule => rule.cssText)
  .join('')

export const cxs = (obj) => {
  const classNames = parse(obj)

  return classNames.join(' ')
}

const parse = (obj, media, pseudo) => {
  const classNames = []

  for (let key in obj) {
    const value = obj[key]
    const type = typeof value
    if (type === 'string' || type === 'number') {
      classNames.push(createStyle(key, value, media, pseudo))
      continue
    } else {
      if (/^:/.test(key)) {
        parse(value, media, key)
          .forEach(s => classNames.push(s))
        continue
      } else if (/^@media/.test(key)) {
        parse(value, key, pseudo)
          .forEach(s => classNames.push(s))
        continue
      }
    }
  }

  return classNames
}

const createStyle = (key, value, media, pseudo = '') => {
  const id = key + value + (media || '') + pseudo
  const dupe = cache[id]

  if (dupe) return dupe

  const className = hash(count) // '_' + count.toString(36)
  count++
  const selector = '.' + className + pseudo
  const prop = hyphenate(key)
  const val = addPx(key, value)
  const rule = `${selector}{${prop}:${val}}`
  const css = media ? `${media}{${rule}}` : rule

  sheet.insert(css)
  cache[id] = className

  return className
}

export const hyphenate = (str) =>
  str.replace(/[A-Z]/g, '-$&')
  .toLowerCase()

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

export const addPx = (prop, value) => {
  if (typeof value !== 'number') return value
  if (unitlessProps.indexOf(prop) > -1) return value
  return value + 'px'
}

export const hash = (n) => {
  if (alpha[n]) return alpha[n]

  let residual = Math.floor(n)
  let result = ''
  const length = alpha.length

  while (residual !== 0) {
    const i = residual % length
    result = alpha[i] + result
    residual = Math.floor(residual / length)
  }

  return result
}

const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'.split('')

cxs.css = css
cxs.reset = reset

export default cxs


