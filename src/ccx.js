
import hash from 'node-murmurhash'
import { kebabCase } from 'lodash'
import addPx from 'add-px-to-style'
import prefix from 'inline-style-prefix-all'

// Usage: <div className=${ccx({ color: 'tomato' }, 'mb2', 'custom-class')}>Hello</div>

export const store = {
  cache: {},
  styleTag: null
}

export let cache = store.cache

const createSubRule = (baseHashname, key, obj) => {
  if (/^:/.test(key)) {
    // Pseudo-class
    const rules = createRules(baseHashname + key, obj)
    return rules[0]
  } else if (/^@media/.test(key)) {
    // Media query
    const rules = createRules(baseHashname, obj, key)
    return rules[0]
  } else {
    console.warn('not a pseudoclass or media query', key, obj)
    return ''
  }
}

const createRules = (hashname, style, media) => {
  const selector = '.' + hashname
  const declarations = []
  const rules = []

  const prefixed = prefix(style)

  for (let key in prefixed) {
    const value = prefixed[key]
    if (Array.isArray(value)) {
      // Handle prefixed styles
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

// To do extractCommonRules

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
  store.styleTag = store.styleTag || document.createElement('style')
  store.styleTag.id = 'ccx'
  document.head.appendChild(store.styleTag)
  ccx.sheet = store.styleTag.sheet
  rules.forEach((rule, i) => {
    ccx.sheet.insertRule(rule, i)
  })

}

export const clearCache = () => {
  cache = {}
}

const ccx = (...args) => {
  const classNames = []

  args.forEach(arg => {
    if (typeof arg === 'string') {
      cache[arg] = cache[arg] || {}
      classNames.push(arg)
    } else if (typeof arg === 'object') {
      const hashname = 'cx-' + hash(JSON.stringify(arg), 128)
      if (cache[hashname]) {
        // console.warn('skipping duplicate rule', arg, hash(arg))
      } else {
        const rules = createRules(hashname, arg)
        rules.forEach(rule => {
          cache[rule.id] = rule
        })
      }
      classNames.push(hashname)
    }
  })

  return classNames.join(' ')
}

ccx.clearCache = clearCache

export default ccx

