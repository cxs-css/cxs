
import assign from 'object-assign'
import addPx from 'add-px-to-style'
import {
  sheet ,
  cache,
  insert,
  reset,
  css
} from '../sheet'
import hash from '../hash'
import {
  createStylesArray,
  isArr,
  isObj,
  clean,
  hyphenate,
  dot,
  objToArr,
  flatten,
  flattenValues,
} from '../util'
import shorthands from './shorthands'

const cxs = (style) => {
  const rules = createRules(style)

  const classNames = rules
    .map(rule => rule.className)

  rules.forEach(insert)

  return classNames.join(' ')
}

// Reducer to get style arguments
const getObjectArgs = (a = {}, b) => {
  if (isObj(b)) {
    return assign(a, b)
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

  const className = parts.length < 16 ? parts : hash(parts)
  return className
}

const createRules = (style) => {
  const styles = createStylesArray(style)
  return styles.map(createRule)
}

const createSelector = (className, selector) => {
  if (selector) {
    return dot(className) + selector
  }

  return dot(className)
}

const createRule = ({ key, value, parent = '', selector = '' }) => {
  const prop = hyphenate(key)
  const prefix = parent
    ? parent + selector
    : selector
  const className = createClassName(prop, value, prefix)
  const cssValue = addPx(key, value)
  const sel = createSelector(className, selector)
  const rule = `${sel}{${prop}:${cssValue}}`

  if (parent) {
    return {
      id: className,
      className,
      css: `${parent}{${rule}}`
    }
  }

  return {
    id: className,
    className,
    css: rule
  }
}

cxs.sheet = sheet
cxs.reset = reset
cxs.css = css

export {
  sheet,
  cache,
  reset,
  css
} from '../sheet'
export default cxs

