
import { StyleSheet } from 'glamor/lib/sheet'

const PSEUDO_REGEX = /^:/
const MEDIA_REGEX = /^@media/

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

const parse = (obj, media, pseudo = '') => {
  const classNames = []

  for (let key in obj) {
    const value = obj[key]
    const type = typeof value

    if (type === 'string' || type === 'number') {
      classNames.push(createStyle(key, value, media, pseudo))
      continue
    }

    if (Array.isArray(value)) {
      value.forEach(val => {
        classNames.push(createStyle(key, val, media, pseudo))
      })
      continue
    }

    const firstChar = key.charAt(0)

    if (firstChar === ':') {
    // if (PSEUDO_REGEX.test(key)) {
      parse(value, media, pseudo + key)
        .forEach(s => classNames.push(s))
      continue
    }

    if (firstChar === '@') {
    // if (MEDIA_REGEX.test(key)) {
      parse(value, key, pseudo)
        .forEach(s => classNames.push(s))
      continue
    }
  }

  return classNames
}

const createStyle = (key, value, media, pseudo = '') => {
  const id = key + value + (media || '') + pseudo
  const dupe = cache[id]

  if (dupe) return dupe

  const className = hash(count)
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

const isNum = (str) => {
  const num = parseInt(str)
  return typeof num === 'number' && !isNaN(num)
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

const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

cxs.css = css
cxs.reset = reset

export default cxs


