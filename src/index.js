
import addPx from 'add-px-to-style'
import sheet from './sheet'
// replace with abbr
import hash from './hash'

export const cache = []

// Insert rule into stylesheet and cache
const insert = rule => {
  if (cache.indexOf(rule.className) > -1) {
    return
  }
  cache.push(rule.className)
  sheet.insert(rule.css)
}

// Reducer to get style arguments
const getObjectArgs = (a = {}, b) => {
  if (isObj(b)) {
    return Object.assign(a, b)
  }
  return a
}

// Reducer to get selector arguments
const getStringArgs = (a = [], b) => {
  if (typeof b === 'string') {
    return [ ...a, b ]
  }
  return a
}

// Utils
const isArr = n => Array.isArray(n)
const isObj = n => typeof n === 'object' && n !== null && !isArr(n)

const parseValue = (prop, val) => typeof val === 'number' ? addPx(prop, val) : val

const clean = (str) => ('' + str)
  .replace(/[\(\)]/g, '')
  .replace(/%/g, 'p')
  .replace(/[#\:]/g, '')
  .replace(/@/g, '_')
  .replace(/[.,\:"\s]/g, '-')

const kebab = (str) => ('' + str)
  .replace(/([A-Z]|^ms)/g, g => '-' + g.toLowerCase())

const dot = str => '.' + str

const createClassName = (prop, value, prefix) => {
  const base = [ prop, clean(value) ].join('') // + '-' + clean(kebab(value))
  const name = prefix ? clean(prefix) + base : base
  return '_' + hash(name)
}

const flattenArray = (a = [], b) => isArr(b) ? [ ...a, ...b ] : [ ...a, b ]

const flattenArrayValues = (a = [], b) => isArr(b.value)
  ? [ ...a, ...b.value.map(val => ({...b, value: val })) ]
  : [ ...a, b ]

// Creates a flat array for micro rulesets
const createStylesArray = (style, root) => (
  Object.keys(style)
    .map(key => ({
      key,
      value: style[key]
    }))
    .filter(s => s.value !== null)
    .map(s => root ? ({ ...s, root }) : s)
    .map(s => isObj(s.value)
      ? createStylesArray(s.value, interpolate(s.key, root))
      : s
    )
    .reduce(flattenArray, [])
    .reduce(flattenArrayValues, [])
)

const createRules = (selectors, style) => {
  const styles = createStylesArray(style)
  if (!selectors.length) {
    return styles.map(createRule)
  }
  // Handle custom selectors
  return [ createMonolithicRule(selectors, styles) ]
}

const interpolate = (key, parent) => {
  if (!parent) return key
  return key.replace(/&/, parent)
}

const createSelector = (className, root) => {
  if (/&/.test(root)) {
    return interpolate(root, dot(className))
  }

  return dot(className)
}

// Only handles microrules
const createRule = ({ key, value, root }) => {
  const prop = kebab(key)
  const className = createClassName(prop, value, root) // prefix
  const cssValue = parseValue(key, value)
  const selector = createSelector(className, root)
  const rule = `${selector}{${prop}:${cssValue}}`

  if (/^@/.test(root)) {
    return {
      className,
      css: `${root}{${rule}}`
    }
  }

  return { className, css: rule }
}

// Create monolithic, global rule
// Does not support nesting, media queries, or pseudoclass objects
const createMonolithicRule = (selectors, styles) => {
  console.log(selectors, styles)
  const selector = selectors.join(', ')
  const declarations = styles.map(s => {
    const prop = kebab(s.key)
    const cssValue = parseValue(s.key, s.value)
    return `${prop}:${cssValue}`
  })
  const rule = `${selector}{${declarations.join(';')}}`

  console.log(selector)
  return {
    className: selector,
    css: rule
  }
}

/*
 * Main exported function
 */
const cxs = (...args) => {
  const selectors = args.reduce(getStringArgs, [])
  const style = args.reduce(getObjectArgs, {})
  const rules = createRules(selectors, style)

  const classNames = rules
    .map(rule => rule.className)

  rules.forEach(insert)

  return classNames.join(' ')
}

export const reset = () => {
  while (cache.length) {
    cache.pop()
  }
  sheet.flush()
}

export const css = () => sheet.rules()
  .map(rule => rule.cssText)
  .join('')

cxs.sheet = sheet
cxs.reset = reset
cxs.css = css

export default cxs

