
import { kebabCase } from 'lodash'
import addPx from 'add-px-to-style'
import prefix from 'inline-style-prefix-all'
import commonDeclarations from './common-declarations'

const createRules = (hashname, rawStyle, media) => {
  const selector = '.' + hashname
  const declarations = []
  const rules = []
  const style = filterNull(rawStyle)

  extractCommonDeclarations(style, { media, hashname })
    .forEach(r => rules.push(r))

  const customStyle = filterCommonDeclarations(style)
  const prefixed = prefix(customStyle)

  createNestedRules(hashname, prefixed)
    .forEach(r => rules.push(r))

  const ruleset = createRuleset(selector, prefixed)
  const css = media ? `${media} { ${ruleset} }` : ruleset
  const id = media ? hashname + media : hashname

  const rule = {
    id,
    order: media ? 2 : 1,
    selector,
    css
  }

  rules.unshift(rule)

  return rules
}

const createRuleset = (selector, style) => {
  const declarations = []

  for (let key in style) {
    const value = style[key]
    const prop = toCssProperty(key)
    if (isNestedStyle(value)) {
      // Skip
    } else if (Array.isArray(value)) {
      value.forEach(v => {
        const declaration = prop + ':' + v
        declarations.push(declaration)
      })
    } else if (typeof value === 'number') {
      const declaration = prop + ':' + addPx(key, value)
      declarations.push(declaration)
    } else if (typeof value === 'string') {
      const declaration = prop + ':' + value
      declarations.push(declaration)
    }
  }

  return `${selector}{${declarations.join(';')}}`
}

const createNestedRules = (hashname, style) => {
  const rules = []

  for (let key in style) {
    const value = style[key]
    if (typeof value === 'object' && !Array.isArray(value)) {
      if (/^:/.test(key)) {
        // Pseudo-class
        createRules(hashname + key, value)
          .forEach(r => rules.push(r))
      } else if (/^@media/.test(key)) {
        // Media query
        createRules(hashname, value, key)
          .forEach(r => rules.push(r))
      }
    }
  }

  return rules
}

const filterCommonDeclarations = (style) => {
  const newStyle = {}
  for (let key in style) {
    const index = commonDeclarations[key] ? commonDeclarations[key].indexOf(style[key]) : -1
    if (index < 0) {
      newStyle[key] = style[key]
    }
  }
  return newStyle
}

const extractCommonDeclarations = (style, { media, hashname }) => {
  const commonRules = []

  if (media || /:/.test(hashname)) {
    return commonRules
  }

  for (let key in style) {
    const index = commonDeclarations[key] ? commonDeclarations[key].indexOf(style[key]) : -1
    if (index > -1) {
      const property = toCssProperty(key)
      // To do: handle prefixed declarations (flex, inline-flex)
      const value = style[key]
      const selector = `.cxs-${property}-${value}`
      const rule = {
        id: selector,
        order: 0,
        selector,
        css: createRuleset(selector, { [key]: value })
      }
      commonRules.push(rule)
      delete style[key]
    }
  }

  return commonRules
}

const filterNull = (obj) => {
  const newObj = {}
  for (let key in obj) {
    if (obj[key] !== null) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

const toCssProperty = (key) => {
  if (/^[A-Z]/.test(key)) {
    const prop = '-' + kebabCase(key)
    return prop
  } else {
    return kebabCase(key)
  }
}

const createDeclaration = (key, value) => {
  return toCssProperty(key) + ':' + value
}

const isNestedStyle = (value) => {
  return value === null || (typeof value === 'object' && !Array.isArray(value))
}

export default createRules

