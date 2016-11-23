
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
        ?  createStylesArray(style.value, style.key)
        : style
    ))
    .reduce(flattenArray, [])
    .reduce(flattenArrayValues, [])
    .map(style => ({
      ...style,
      value: parseValue(style.key, style.value)
    }))
}

const flattenArray = (a, b) => isArr(b) ? [ ...a, ...b ] : [ ...a, b ]

const flattenArrayValues = (a, b) => isArr(b.value)
  ? [ ...a, ...b.value.map(val => ({...b, value: val })) ]
  : [ ...a, b ]

const createRule = (selector, prop, value, parent) => {
  const rule = `${selector}{${prop}:${value}}`
  if (parent) {
    return `${parent}{${rule}}`
  }

  return rule
}

const createMediaRule = (prop, value, media) => {
  const className = createClassName(prop, value, media)
  const css = createRule(dot(className), prop, value, media)
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

const createRules = (style, prefix) => {
  const styles = createStylesArray(style)

  const rules = styles.map(({ key, value, parent }) => {
    const prop = kebab(key)
    if (parent) {
      if (/^@media/.test(parent)) {
        return createMediaRule(prop, value, parent)
      }
      if (/^:/.test(parent)) {
        return createPseudoRule(prop, value, parent)
      }
      return createNestedRule(prop, value, parent)
    }

    const className = createClassName(prop, value)
    const css = createRule(dot(className), prop, value)

    return { className, css }
  })

  return rules
}

export default createRules

