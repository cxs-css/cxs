
// Combined module for file size reduction

import assign from 'object-assign'
import addPx from 'add-px-to-style'
import { StyleSheet } from 'glamor/lib/sheet'

export const hash = (str) => {
  let val = 5381
  let i = str.length

  while (i) {
    val = (val * 33) ^ str.charCodeAt(--i)
  }

  return '_' + (val >>> 0).toString(36)
}

export const sheet = new StyleSheet()
sheet.inject()

export const cache = []

export const insert = (rule) => {
  if (cache.indexOf(rule.id) > -1) return
  cache.push(rule.id)
  sheet.insert(rule.css)
}

export const reset = () => {
  while (cache.length) cache.pop()
  sheet.flush()
}

export const css = () => sheet.rules()
  .map(rule => rule.cssText)
  .join('')


export const isArr = n => Array.isArray(n)
export const isObj = n => typeof n === 'object' && n !== null && !isArr(n)

export const clean = (str) => ('' + str)
  .replace(/[\(\)]/g, '')
  .replace(/[%.]/g, 'p')
  .replace(/[&#,]/g, '')
  .replace(/@/g, '_')
  .replace(/[\:"\s]/g, '-')
  .replace(/^-+/, '')

export const hyphenate = (str) => ('' + str)
  .replace(/([A-Z]|^ms)/g, g => '-' + g.toLowerCase())

export const combine = (str = '') => (...args) => args
  .filter(a => a !== null)
  .join(str)

export const flatten = (a = [], b) => isArr(b) ? [ ...a, ...b ] : [ ...a, b ]

export const flattenValues = (a = [], b) => isArr(b.value)
  ? [ ...a, ...b.value.map(val => ({...b, value: val })) ]
  : [ ...a, b ]

export const objToArr = obj => Object.keys(obj).map(key => ({
  key,
  value: obj[key]
}))

export const createStylesArray = (style, keys = []) => (
  objToArr(style)
    .filter(({ value }) => value !== null)
    .map(parseNested(keys))
    .map(createNestedStyle(keys))
    .reduce(flatten, [])
    .reduce(flattenValues, [])
)

const getId = keys => keys.length ? keys.join('-') : 0

const parseNested = (keys) => ({ key, value }) => isObj(value)
  ? createStylesArray(value, [ ...keys, key ])
  : ({ id: getId(keys), key, value })

const createNestedStyle = (keys) => (style) => keys.length ?
  assign(style, {
    parent: keys.reduce(getParent, null),
    selector: keys.reduce(getSelector, '')
  }) : assign(style, { selector: '' })

const getParent = (a, b) => /^@/.test(b) ? b : a

const getSelector = (a, b) => /^@/.test(b)
  ? a : /^:/.test(b)
  ? a + b : a + ' ' + b

export const getObjectArgs = (a = {}, b) => isObj(b) ? assign(a, b) : a

export const getStringArgs = (a = [], b) => typeof b === 'string' ? [ ...a, b ] : a

const cxs = (style) => {
  const rules = createStylesArray(style)
    .map(createRule)
  const classNames = rules
    .map(rule => rule.className)

  rules.forEach(insert)

  return classNames.join(' ')
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
    prefix ? clean(prefix) : null,
    base,
    clean(value)
  )

  const className = parts.length < 16 ? parts : hash(parts)
  return className
}

const createRule = ({ id, key, value, parent = '', selector = '' }) => {
  const prop = hyphenate(key)
  const prefix = combine()(parent, selector)
  const className = createClassName(prop, value, prefix)
  const sel = combine()('.', className, selector)
  const rule = `${sel}{${prop}:${addPx(key, value)}}`
  const css = parent ? `${parent}{${rule}}` : rule

  return {
    id: className + id,
    className,
    css
  }
}

export default cxs

