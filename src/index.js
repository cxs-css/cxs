
import sheet from './sheet'
import hash from './hash'
import {
  isArr,
  isObj,
  parseValue,
  clean,
  kebab,
  dot,
  flattenArray,
  flattenArrayValues,
} from './util'
import shorthands from './shorthands'

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

const abbr = (str) => str
  .split('-')
  .map(c => c.charAt(0))
  .join('')

const createClassName = (prop, value, prefix) => {
  const base = (shorthands.includes(prop)
    ? abbr(prop)
    : prop).replace(/^-/, '')
  const parts = [
    prefix ? clean(prefix) : null,
    base,
    clean(value)
  ].filter(p => !!p)
  .join('-')

  // Hash long classnames
  const className = parts.length < 16 ? parts : '_' + hash(parts)
  return className
}

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
  const selector = selectors.join(', ')
  const declarations = styles.map(s => {
    const prop = kebab(s.key)
    const cssValue = parseValue(s.key, s.value)
    return `${prop}:${cssValue}`
  })
  const rule = `${selector}{${declarations.join(';')}}`

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

