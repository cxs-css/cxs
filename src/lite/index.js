
import { StyleSheet } from 'glamor/lib/sheet'

export const sheet = new StyleSheet()

sheet.inject()

export const getCss = () => sheet.rules()
  .map(rule => rule.cssText)
  .join('')

const PSEUDO_REGEX = /^:/
const MEDIA_REGEX = /^@media/

let count = 0

const options = {
  prefix: ''
}

export const setOptions = (opts) => {
  for (let key in opts) {
    options[key] = opts[key]
  }
}

export const cache = {}

export const reset = () => {
  for (let key in cache) {
    delete cache[key]
  }
  sheet.flush()
  count = 0
}

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

    if (PSEUDO_REGEX.test(key)) {
      parse(value, media, pseudo + key)
        .forEach(s => classNames.push(s))
      continue
    }

    if (MEDIA_REGEX.test(key)) {
      parse(value, key, pseudo)
        .forEach(s => classNames.push(s))
      continue
    }

    if (Array.isArray(value)) {
      value.forEach(val => {
        classNames.push(createStyle(key, val, media, pseudo))
      })
      continue
    }
  }

  return classNames
}

const createStyle = (key, value, media, pseudo = '') => {
  const id = key + value + (media || '') + pseudo
  const dupe = cache[id]

  if (dupe) return dupe

  const className = options.prefix + alphaHash(count)
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

const isNum = (str) => {
  const num = parseInt(str)
  return typeof num === 'number' && !isNaN(num)
}

export const alphaHash = (n) => {
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

export const hyphenate = (str) => ('' + str)
  .replace(/[A-Z]|^ms/g, '-$&')
  .toLowerCase()

export const addPx = (prop, value) => {
  if (typeof value !== 'number') return value
  if (unitlessProps.indexOf(prop) > -1) return value
  return value + 'px'
}

export const rehydrate = (css) => {
  let dec

  while (dec = RULE_REG.exec(css)) {
    const media = dec[2] || ''
    const className = dec[3]
    const pseudo = dec[4] || ''
    const key = camel(dec[5])
    const val = removePx(dec[6])
    const id = key + val + media + pseudo

    cache[id] = className
  }
}

const RULE_REG = /((@media[^{]+){)?.([^:{]+)(:[^{]+)?{([^:]+):([^}]+)}}?/g

const camel = (str) => str.replace(/-[a-z]/g, (g) => g[1].toUpperCase())

const removePx = (str) => str.replace(/px$/, '')

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

cxs.getCss = getCss
cxs.reset = reset
cxs.cache = cache
cxs.rehydrate = rehydrate
cxs.setOptions = setOptions

export default cxs


