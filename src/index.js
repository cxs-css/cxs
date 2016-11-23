
import hash from 'murmurhash-js/murmurhash3_gc'
import addPx from 'add-px-to-style'
import sheet from './sheet'

export const cache = []

export const parseValue = (prop, val) => typeof val === 'number' ? addPx(prop, val) : val

export const kebab = (str) => ('' + str).replace(/([A-Z]|^ms)/g, g => '-' + g.toLowerCase())
  .replace(/[\(\)]/g, '')
  .replace(/%/g, 'p')
  .replace(/[.,"\s]/g, '-')

const abbreviations = {
  'margin': 'm',
  'margin-top': 'mt',
  'margin-right': 'mr',
  'margin-bottom': 'mb',
  'margin-left': 'ml',
  'padding': 'p',
  'padding-top': 'pt',
  'padding-right': 'pr',
  'padding-bottom': 'pb',
  'padding-left': 'pl',
  'font-family': 'ff',
  'font-size': 'fs',
  'font-weight': 'fw',
  'line-height': 'lh',
  'display': 'd',
  'height': 'h',
  'width': 'w',
  'min-width': 'minw',
  'max-width': 'maxw',
  'min-height': 'minh',
  'max-height': 'maxh',
  'position': 'pos',
  'background': 'bg',
  'background-color': 'bgc',
  'background-image': 'bgimg',
  'z-index': 'z',
}
const abbr = str => abbreviations[str] || str

const dot = str => '.' + str

const createClassName = (prop, value, prefix) => {
  const base = abbr(prop) + '-' + kebab(value)
  const name = prefix
    ? prefix + base
    : base
  // return 'c' + hash(name, 64)
  return name
}

const createRule = (selector, prop, value, parent) => {
  const rule = `${selector}{${prop}:${value}}`
  if (parent) {
    return `${parent}{${rule}}`
  }

  return rule
}

const flattenArray = (a, b) => Array.isArray(b) ? [ ...a, ...b ] : [ ...a, b ]

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

const createPrefixedRule = (prop, value, prefix) => {
  if (/^@media/.test(prefix)) {
    return createMediaRule(prop, value, prefix)
  }
  if (/^:/.test(prefix)) {
    return createPseudoRule(prop, value, prefix)
  }
}

const flattenArrayValues = (a, b) => Array.isArray(b.value)
  ? [ ...a, ...b.value.map(val => ({...b, value: val })) ]
  : [ ...a, b ]

const createStylesArray = (obj, parent) => {
  return Object.keys(obj)
    .map(key => ({
      key,
      value: obj[key]
    }))
    .filter(style => style.value !== null)
    .map(style => parent ? ({
      ...style,
      parent
    }) : style)
    .map(style => {
      if (!Array.isArray(style.value) && typeof style.value === 'object') {
        const arr = createStylesArray(style.value, style.key)
        return arr
      }
      return style
    })
    .reduce(flattenArray, [])
    .reduce(flattenArrayValues, [])
    .map(style => ({
      ...style,
      value: parseValue(style.key, style.value)
    }))
}

const createRules = (style, prefix) => {
  const styles = createStylesArray(style)

  const rules = styles.map(({ key, value, parent }) => {
    const prop = kebab(key)
    if (parent) {
      return createPrefixedRule(prop, value, parent)
    }

    const className = createClassName(prop, value)
    const css = createRule(dot(className), prop, value)

    return { className, css }
  })

  return rules
}

const inject = rules => {
  rules
    .filter(rule => cache.indexOf(rule.className) < 0)
    .forEach(rule => {
      cache.push(rule.className)
      sheet.insert(rule.css)
    })
}

const cxs = (style) => {
  const rules = createRules(style)
    // temporarily remove unhandled styles
    .filter(rule => !!rule)

  console.log(rules)
  const classNames = rules
    .filter(rule => rule.className) // Do any rules not have a className?
    .map(rule => rule.className)

  inject(rules)

  return classNames.join(' ')
}

cxs.sheet = sheet

cxs.clear = () => {
  while (cache.length) {
    cache.pop()
  }
}

cxs.reset = () => {
  cxs.clear()
  cxs.sheet.flush()
}

Object.defineProperty(cxs, 'css', {
  get () {
    return sheet.rules()
      .map(r => r.cssText)
      .join('')
  }
})

export const css = cxs.css

export default cxs

