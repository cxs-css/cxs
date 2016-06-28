
import hash from 'node-murmurhash'
import { kebabCase } from 'lodash'
import addPx from 'add-px-to-style'
import prefix from 'inline-style-prefix-all'
import commonDeclarations from './common-declarations'

let styleTag = null
export let cache = {}

const cxs = (...args) => {
  const classNames = []

  args.forEach(arg => {
    if (typeof arg === 'string') {
      classNames.push(arg)
    } else if (typeof arg === 'object') {
      const hashname = 'cxs-' + hash(JSON.stringify(arg), 128)
      const rules = createRules(hashname, arg)

      rules.forEach(rule => {
        if (rule.selector !== '.' + hashname && !/\:/.test(rule.selector)) {
          classNames.push(rule.selector.replace(/^\./, ''))
        }
        // if (cache[rule.id]) { // console.warn('Rule already exists', cache[rule.id], rule) }
        cache[rule.id] = rule
      })

      classNames.push(hashname)
    }
  })

  return classNames.join(' ')
}

const createSubRule = (baseHashname, key, obj) => {
  if (/^:/.test(key)) {
    // Pseudo-class
    const rules = createRules(baseHashname + key, obj)
    return rules[0] // Ignore nested objects
  } else if (/^@media/.test(key)) {
    // Media query
    const rules = createRules(baseHashname, obj, key)
    return rules[0]
  } else {
    console.warn('not a pseudoclass or media query', key, obj)
    return ''
  }
}

const filterNull = (obj) => {
  const newObj = {}
  for (let key in obj) {
    if (obj[key]) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

const createRules = (hashname, style, media) => {
  const selector = '.' + hashname
  const declarations = []
  const rules = []

  const { customStyle, commonRules } = extractCommonDeclarations(filterNull(style), media)

  commonRules.forEach(r => rules.push(r))

  const prefixed = prefix(customStyle)

  for (let key in prefixed) {
    const value = prefixed[key]
    if (value === null || typeof value  === 'undefined') {
      return
    } else if (Array.isArray(value)) {
      value.forEach(val => {
        const declaration = `${kebabCase(key)}:${val}`
        declarations.push(declaration)
      })
    } else if (typeof value === 'object') {
      // Handle pseudo-classes, media queries, etc.
      const r = createSubRule(hashname, key, value)
      rules.push(r)
    } else {
      const val = typeof value === 'number'
        ? addPx(key, value)
        : value
      const declaration = `${kebabCase(key)}:${val}`
      declarations.push(declaration)
    }
  }

  const ruleSet = `${selector}{${declarations.join(';')}}`
  const css = media ? `${media} { ${ruleSet} }` : ruleSet

  const rule = {
    id: hashname + (media ? media : ''),
    selector,
    css
  }

  rules.unshift(rule)

  return rules
}

const extractCommonDeclarations = (style, media) => {
  const commonRules = []

  if (media) {
    return {
      commonRules,
      customStyle: style
    }
  }

  for (let key in style) {
    const index = commonDeclarations[key] ? commonDeclarations[key].indexOf(style[key]) : -1
    if (index > -1) {
      const property = kebabCase(key)
      // To do: handle prefixed declarations (flex, inline-flex)
      const value = style[key]
      const selector = `.cxs-${property}-${value}`
      const rule = {
        id: selector,
        selector,
        css: `${selector}{${property}:${value}}`
      }
      commonRules.push(rule)
      delete style[key]
    }
  }

  return {
    customStyle: style,
    commonRules
  }
}

export const getRules = () => {
  const cssRules = Object.keys(cache || {})
    .map(k => cache[k].css || false)
    .filter(r => r.length)

  return cssRules
}

export const getCss = () => {
  return getRules().join('')
}

export const attach = () => {
  if (typeof document === 'undefined') {
    console.warn('Cannot attach stylesheet without a document')
    return
  }

  const rules = getRules()
  styleTag = styleTag || document.getElementById('cxs')

  if (styleTag === null) {
    styleTag = document.createElement('style')
    styleTag.id = 'cxs'
    document.head.appendChild(styleTag)
    cxs.sheet = styleTag.sheet
  }

  rules.forEach((rule, i) => {
    cxs.sheet.insertRule(rule, i)
  })
}

export const clearCache = () => {
  cache = {}
}

cxs.getRules = getRules
cxs.getCss = getCss
cxs.attach = attach
cxs.clearCache = clearCache

export default cxs

