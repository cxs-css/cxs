
import addPx from 'add-px-to-style'
import hash from './hash'
import sheet from './sheet'

export const cache = []

// Core function
const createStyle = (style) => {
  const hashname = hash(JSON.stringify(style))
  const styles = createStylesArray(style)
  const grouped = styles.reduce(group, {})
  const rules = createRules(hashname, grouped)

  // console.log(JSON.stringify(grouped, null, 2))
  // console.log(rules)
  rules.forEach(insert)

  const className = underscore(hashname)
  return className
}

const createStylesArray = (style, keys = []) => {
  return Object.keys(style).map(key => {
    const value = style[key]
    if (isObj(value)) {
      // const roots = [ ...keys, key ]
      return createStylesArray(value, [ ...keys, key ])
    }

    const dec = {
      key,
      value
    }

    if (keys.length) {
      dec.id = keys.join()
      dec.parent = keys.reduce(getParent, null)
      dec.selector = keys.reduce(getSelector, '')
    }

    return dec
  }).reduce(flatten, [])
}

// style.keys reducer
const getParent = (a, b) => {
  if (/^@/.test(b)) {
    return b
  }
  return a
}

// style.keys reducer
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
const createRules = (hashname, styles) => {
  const rules = Object.keys(styles).map(key => {
    const { id, selector, declarations, parent } = styles[key]
    const rule = createRule(dot(underscore(hashname)) + selector)(declarations)
    const css = parent ? `${parent}{${rule}}` : rule

    return {
      id: hashname + '-' + key,
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
  console.log(rule.css)
}

export const reset = () => {
  while (cache.length) cache.pop()
  sheet.flush()
}

export const css = () => sheet.rules()
  .map(r => r.cssText)
  .join('')

export default createStyle

