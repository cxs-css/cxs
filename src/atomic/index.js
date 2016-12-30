
import { StyleSheet } from 'glamor/lib/sheet'
import hash from '../hash'

export const sheet = new StyleSheet()

sheet.inject()

export const getCss = () => sheet.rules()
  .map(rule => rule.cssText)
  .join('')

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
}

const cxs = (style) => {
  const classNames = parse(style)
  return classNames.join(' ')
}

const parse = (obj, media, children = '') => {
  const classNames = []

  for (let key in obj) {
    const value = obj[key]
    const type = typeof value

    if (type === 'string' || type === 'number') {
      classNames.push(createStyle(key, value, media, children))
      continue
    }

    if (Array.isArray(value)) {
      value.forEach(val => {
        classNames.push(
          createStyle(key, value, media, children)
        )
      })
      continue
    }

    if (/^:/.test(key)) {
      parse(value, media, children + key)
        .forEach(className => {
          classNames.push(className)
        })
      continue
    }

    if (/^@media/.test(key)) {
      parse(value, key, children)
        .forEach(className => {
          classNames.push(className)
        })
      continue
    }

    parse(value, media, children + ' ' + key)
      .forEach(className => {
        classNames.push(className)
      })
    continue
  }

  return classNames
}

const createStyle = (key, value, media, children = '') => {
  const prefix = (media || '') + children
  const id = key + value + prefix
  const dupe = cache[id]

  if (dupe) return dupe

  const prop = hyphenate(key)
  const val = addPx(key, value)
  const className = createClassName(prop, value, prefix)
  const selector = '.' + className + children
  const rule = `${selector}{${prop}:${val}}`
  const css = media ? `${media}{${rule}}` : rule

  sheet.insert(css)
  cache[id] = className

  return className
}

const abbr = (str) => str
  .split('-')
  .map(c => c.charAt(0))
  .join('')

const createClassName = (prop, value, prefix) => {
  const base = (shorthands.indexOf(prop) > -1
    ? abbr(prop)
    : prop).replace(/^-/, '')
  const parts = combine('-')(
    options.prefix ? options.prefix : null,
    prefix ? clean(prefix) : null,
    base,
    clean(value)
  )

  const className = parts.length < 24 ? parts : hash(parts)
  return className
}

const BLANK_REG = /[\(\)#]/g
const P_REG = /%/g
const SYMBOL_REG = /[&,:"\s]/g
const AT_REG = /@/g
const DOT_REG = /\./g

export const clean = (str) => ('' + str)
  .replace(BLANK_REG, '')
  .replace(P_REG, 'P')
  .replace(SYMBOL_REG, '_')
  .replace(AT_REG, '_')
  .replace(DOT_REG, 'p')

export const combine = (str = '') => (...args) => args
  .filter(a => a !== null)
  .join(str)

export const hyphenate = (str) => ('' + str)
  .replace(/[A-Z]|^ms/g, '-$&')
  .toLowerCase()

export const addPx = (prop, value) => {
  if (typeof value !== 'number') return value
  if (unitlessProps.indexOf(prop) > -1) return value
  return value + 'px'
}

const shorthands = [
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'display',
  'float',
  'font-family',
  'font-weight',
  'font-size',
  'line-height',
  'width',
  'height',
  'color',
  'background',
  'background-color',
  'background-image'
]

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

cxs.reset = reset
cxs.getCss = getCss
cxs.setOptions = setOptions

export default cxs

