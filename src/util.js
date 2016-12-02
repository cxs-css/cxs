
import assign from 'object-assign'
import addPx from 'add-px-to-style'

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

export const dot = str => '.' + str

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
  }) : style

const getParent = (a, b) => /^@/.test(b) ? b : a

const getSelector = (a, b) => /^@/.test(b)
  ? a : /^:/.test(b)
  ? a + b : a + ' ' + b

