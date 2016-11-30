
import assign from 'object-assign'
import addPx from 'add-px-to-style'
import hash from './hash'
import sheet from './sheet'

export const cache = []

const cxs = (...args) => {
  const selectors = args.reduce(getStringArgs, [])
  const selector = selectors.length ? selectors.join(', ') : null
  const style = args.reduce(getObjectArgs, {})
  const hashname = hash(JSON.stringify(style))
  const styles = createStylesArray(style)
  const grouped = styles.reduce(group, {})
  const rootSelector = selector || dot(underscore(hashname))
  const rules = createRules(rootSelector, grouped)

  // WIP
  // const stylesObj = createStylesObject(style)
  // console.log(JSON.stringify(stylesObj, null, 2))

  rules.forEach(insert)

  const className = underscore(hashname)
  return selector || className
}

const objToArr = obj => Object.keys(obj).map(key => ({
  key,
  value: obj[key]
}))

const createStylesArray = (style, keys = []) => (
  objToArr(style)
    .filter(style => style.value !== null)
    .map(parseNested(keys))
    .map(createNestedStyle(keys))
    .reduce(flatten, [])
    .reduce(flattenArrayValues, [])
)

const parseNested = (keys) => ({ key, value }) => isObj(value)
  ? createStylesArray(value, [ ...keys, key ])
  : ({ key, value })

const createNestedStyle = (keys) => (style) => keys.length ?
  assign(style, {
    id: keys.join('-'),
    parent: keys.reduce(getParent, null),
    selector: keys.reduce(getSelector, '')
  }) : style

const getParent = (a, b) => /^@/.test(b) ? b : a

const getSelector = (a = '', b) => {
  if (/^@/.test(b)) {
    return a
  } else if (/^:/.test(b)) {
    return a + b
    // to do: add support for & parent selector
    // { else if (/&/.test(b)) {
  } else {
    return [a, b].join(' ')
  }
}

// styles reducer
const flatten = (a = [], b) =>
  isArr(b) ? [ ...a, ...b ] : [ ...a, b ]

const flattenArrayValues = (a = [], b) => isArr(b.value)
  ? [ ...a, ...b.value.map(val => ({...b, value: val })) ]
  : [ ...a, b ]

// styles reducer
const group = (a = {}, b) => {
  const { id, parent, selector } = b
  if (!id) {
    if (!a[0]) {
      a[0] = {
        selector: '',
        declarations: []
      }
    }
    a[0].declarations.push(b)
  } else {
    if (!a[id]) {
      a[id] = {
        selector,
        parent,
        declarations: []
      }
    }
    a[id].declarations.push(b)
  }
  return a
}

// parse grouped styles
const createRules = (rootSelector, styles) => {
  const rules = Object.keys(styles).map(key => {
    const { id, selector, declarations, parent } = styles[key]
    const rule = createRule(rootSelector + selector)(declarations)
    const css = parent ? `${parent}{${rule}}` : rule

    return {
      id: rootSelector + '-' + key,
      css
    }
  })

  return rules
}

const createRule = (selector) => (declarations) => {
  const body = declarations.map(({ key, value }) => {
    const prop = hyphenate(key)
    const val = addPx(key, value)
    return `${prop}:${val}`
  }).join(';')
  return `${selector}{${body}}`
}

const dot = s => '.' + s
const underscore = s => '_' + s
const isArr = n => Array.isArray(n)
const isObj = n => typeof n === 'object' && n !== null && !isArr(n)

const hyphenate = (str) => ('' + str)
  .replace(/([A-Z]|^ms)/g, g => '-' + g.toLowerCase())

const insert = rule => {
  if (cache.indexOf(rule.id) > -1) {
    return
  }
  cache.push(rule.id)
  sheet.insert(rule.css)
}

// Reducer to get style arguments
const getObjectArgs = (a = {}, b) => isObj(b) ? assign(a, b) : a

// Reducer to get selector arguments
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

