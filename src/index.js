
import assign from 'object-assign'
import addPx from 'add-px-to-style'
import hash from './hash'
import sheet from './sheet'
import {
  isObj,
  flatten,
  flattenValues
} from './util'

export const cache = []

const cxs = (...args) => {
  const selectors = args.reduce(getStringArgs, [])
  const style = args.reduce(getObjectArgs, {})
  const hashname = hash(JSON.stringify(style))
  const selector = selectors.length ? selectors.join(', ') : '.' + hashname

  const styles = createStylesArray(style)
    .reduce(group, {})

  const rules = createRules(selector, styles)

  rules.forEach(insert)

  return hashname
}

const objToArr = obj => Object.keys(obj).map(key => ({
  key,
  value: obj[key]
}))

const createStylesArray = (style, keys = []) => (
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

const group = (a = {}, b) => {
  const { id } = b
  a[id] = a[id] || assign({}, b, { declarations: [] })
  a[id].declarations.push(b)
  return a
}

const createRules = (rootSelector, styles) => objToArr(styles)
  .map(({ key, value }) => {
    const { id, selector, declarations, parent } = value
    const rule = createRule(rootSelector + selector)(declarations)
    const css = parent ? `${parent}{${rule}}` : rule

    return {
      id: rootSelector + '-' + key,
      css
    }
  })

const createRule = (selector) => (declarations) => {
  const body = declarations.map(({ key, value }) => (
    hyphenate(key) + ':' + addPx(key, value)
  )).join(';')
  return `${selector}{${body}}`
}

const hyphenate = (str) => ('' + str)
  .replace(/([A-Z]|^ms)/g, g => '-' + g.toLowerCase())

const insert = rule => {
  if (cache.indexOf(rule.id) > -1) return
  cache.push(rule.id)
  sheet.insert(rule.css)
}

const getObjectArgs = (a = {}, b) => isObj(b) ? assign(a, b) : a

const getStringArgs = (a = [], b) => typeof b === 'string' ? [ ...a, b ] : a

export const reset = () => {
  while (cache.length) cache.pop()
  sheet.flush()
}

export const css = () => sheet.rules()
  .map(r => r.cssText)
  .join('')

cxs.sheet = sheet
cxs.css = css
cxs.reset = reset

export { default as sheet } from './sheet'
export default cxs

