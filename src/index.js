
import hash from 'node-murmurhash'
import { kebabCase } from 'lodash'
import addPx from 'add-px-to-style'
import prefix from 'inline-style-prefix-all'
import cache from './cache'
import commonDeclarations from './common-declarations'

let styleTag = null

const cxs = (...args) => {
  const classNames = []

  args.forEach(arg => {
    if (typeof arg === 'string') {
      classNames.push(arg)
    } else if (typeof arg === 'object') {
      const hashname = 'cxs-' + hash(JSON.stringify(arg), 128)
      const rules = createRules(hashname, arg)

      rules.forEach(rule => {
        if (!/\:/.test(rule.selector)) {
          classNames.push(rule.selector.replace(/^\./, ''))
        }
        if (cache.rules[rule.id]) {
          // console.warn('Rule already exists', cache[rule.id], rule)
        } else {
          cache.add([rule.id], rule)
        }
      })
    }
  })

  return classNames.join(' ')
}

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

const sortRules = (a, b) => {
  return a.order - b.order
}

cxs.attach = () => {
  if (typeof document === 'undefined') {
    console.warn('Cannot attach stylesheet without a document')
    return
  }

  const rules = cxs.getRules()
  styleTag = styleTag || document.getElementById('cxs')

  if (styleTag === null) {
    styleTag = document.createElement('style')
    styleTag.id = 'cxs'
    document.head.appendChild(styleTag)
    cxs.sheet = styleTag.sheet
  }

  rules.forEach((rule, i) => {
    try {
      cxs.sheet.insertRule(rule, cxs.sheet.cssRules.length)
    } catch (e) {
      // console.warn('Could not insert rule', rule, e)
    }
  })
}

cxs.getRules = () => {
  const cssRules = Object.keys(cache.rules || {})
    .map(k => cache.rules[k].css || false)
    .filter(r => r.length)
    .sort(sortRules)

  return cssRules
}

cxs.getCss = () => {
  return cxs.getRules().join('')
}

cxs.clearCache = () => {
  cache.rules = {}
}

export default cxs

