
import {
  parseValue,
  kebab,
  dot,
  createClassName,
} from './util'

const isArr = n => Array.isArray(n)
const isObj = n => n !== null && !isArr(n) && typeof n === 'object'

const createStylesArray = (obj, parent) => {
  return Object.keys(obj)
    .map(key => ({ key, value: obj[key] }))
    .filter(style => style.value !== null)
    .map(style => parent ? ({
      ...style,
      parent
    }) : style)
    .map(style => (
      !isArr(style.value) && isObj(style.value)
        ? createStylesArray(style.value, style.key)
        : style
    ))
    .reduce(flattenArray, [])
    .reduce(flattenArrayValues, [])
}

const flattenArray = (a, b) => isArr(b) ? [ ...a, ...b ] : [ ...a, b ]

const flattenArrayValues = (a, b) => isArr(b.value)
  ? [ ...a, ...b.value.map(val => ({...b, value: val })) ]
  : [ ...a, b ]

const createRule = (style) => {
  const { key, value, parent } = style
  const prop = kebab(key)
  const className = createClassName(prop, value, parent)
  const cssValue = parseValue(key, value)
  const selector = dot(className)
  const rule = `${selector}{${prop}:${cssValue}}`
  if (parent) {
    return `${parent}{${rule}}`
  }

  return rule
}

/*
const createMediaRule = ({ prop, cssValue, value, parent }) => {
  const className = createClassName(prop, value, parent)
  const css = createRule(dot(className), prop, value, parent)
  return { className, css }
}

const createPseudoRule = (prop, value, pseudo) => {
  const className = createClassName(prop, value, pseudo)
  const css = createRule(dot(className) + pseudo, prop, value)
  return { className, css }
}

const createNestedRule = (prop, value, selector) => {
  const className = createClassName(prop, value, selector + '-')
  const css = createRule(dot(className) + ' ' + selector, prop, value)
  return { className, css }
}
*/

const createRules = (originalStyle, prefix) => {
  const styles = createStylesArray(originalStyle)

  const rules = styles.map((style) => {
    const { key, value, parent } = style
    const css = createRule(style)
    const className = createClassName(key, value, parent)
    return { className, css }
  })

  return rules
}

export default createRules

