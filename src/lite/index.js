
import { StyleSheet } from 'glamor/lib/sheet'

export const sheet = new StyleSheet()
export const mediaSheet = new StyleSheet()

sheet.inject()
mediaSheet.inject()

export const getCss = () => {
  let css = ''
  const rules = sheet.rules().concat(mediaSheet.rules())
  for (let i = 0; i < rules.length; i++) {
    css += rules[i].cssText
  }
  return css
}

let count = 0

const options = {
  prefix: ''
}

export const setOptions = (opts) => {
  for (let key in opts) {
    options[key] = opts[key]
  }
}


export const reset = () => {
  cxs.cache = {}
  sheet.flush()
  mediaSheet.flush()
  count = 0
}

export const cxs = (obj) => parse(obj)

cxs.cache = {}

const parse = (obj, media, pseudo = '') => {
  let className = ''

  for (let key in obj) {
    const value = obj[key]
    const type = typeof value

    if (type === 'string' || type === 'number') {
      className += ' ' + createStyle(key, value, media, pseudo)
      continue
    }

    if (key.charAt(0) === ':') {
      className += ' ' + parse(value, media, pseudo + key)
      continue
    }

    if (key.charAt(0) === '@') {
      className += ' ' + parse(value, key, pseudo)
      continue
    }

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        className += ' ' + (createStyle(key, value[i], media, pseudo))
      }
      continue
    }
  }

  return className.trim()
}

const createStyle = (key, value, media, pseudo = '') => {
  const id = key + value + (media || '') + pseudo
  const dupe = cxs.cache[id]

  if (dupe) return dupe

  const className = options.prefix + alphaHash(count)
  count++
  const selector = '.' + className + pseudo
  const prop = hyphenate(key)
  const val = addPx(key, value)

  const rule = selector + '{' + prop + ':' + val + '}'

  if (media) {
    mediaSheet.insert(media + '{' + rule + '}')
  } else {
    sheet.insert(rule)
  }
  cxs.cache[id] = className

  return className
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

const alpha = 'abcdefghijklmnopqrstuvwxyz'.split('')

export const hyphenate = (str) => ('' + str)
  .replace(/[A-Z]|^ms/g, '-$&')
  .toLowerCase()

export const addPx = (prop, value) => {
  if (typeof value !== 'number' || unitlessProps[prop]) return value
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

    cxs.cache[id] = className
  }
}

const RULE_REG = /((@media[^{]+){)?.([^:{]+)(:[^{]+)?{([^:]+):([^}]+)}}?/g

const camel = (str) => str.replace(/-[a-z]/g, (g) => g[1].toUpperCase())

const removePx = (str) => str.replace(/px$/, '')

const unitlessProps = {
  animationIterationCount: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridColumn: 1,
  fontWeight: 1,
  lineClamp: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  fillOpacity: 1,
  stopOpacity: 1,
  strokeDashoffset: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}

cxs.getCss = getCss
cxs.reset = reset
cxs.rehydrate = rehydrate
cxs.setOptions = setOptions

export default cxs
