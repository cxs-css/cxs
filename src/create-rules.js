
import addPx from 'add-px-to-style'
import commonDeclarations from './common-declarations'

const createRules = (name, style, parent) => {
  // Extract nested rules
  const rules = createNestedRules(name, style, parent)

  if (!name) return rules

  // Create styles array
  const styles = Object.keys(style)
    .filter(key => style[key] !== null)
    .filter(key => isArr(style[key]) || !isObj(style[key]))
    .map(key => {
      return {
        key,
        prop: kebab(key),
        value: parseValue(key, style[key])
      }
    })
    .reduce((a, b) => isArr(b.value)
        ? [...a, ...b.value.map(v => ({ ...b, value: v }))]
        : [...a, b]
    , [])

  const isPseudo = /:/.test(name)

  if (!isPseudo) {
    // Extract common declarations as rules
    styles
      .reduce(reduceCommonRules(parent), [])
      .forEach(r => rules.push(r))
  }
  // Remove common declarations
  const filteredStyles = isPseudo
    ? styles
    : styles.filter(filterCommonDeclarations)

  // Add base rule
  // const selector = /^@keyframes/.test(parent) ? name : '.' + name
  const selector = /^([0-9]|from|to)/.test(name) ? name : '.' + name

  rules.unshift({
    id: name + (parent || ''),
    order: parent ? 2 : 1,
    selector,
    css: createRuleset(selector, filteredStyles, parent)
  })

  return rules
}

const createNestedRules = (name, style, parent) => {
  return Object.keys(style)
    .filter(key => !!style[key])
    .filter(key => !isArr(style[key]) && isObj(style[key]))
    .map(key => {
      if (/^:/.test(key)) {
        return createRules(name + key, style[key], parent)
      } else if (/^@keyframes/.test(key)) {
        return createRules(null, style[key], key)
      } else if (/^@/.test(key)) {
        return createRules(name, style[key], key)
      } else {
        const selector = name ? `${name} ${key}` : key
        return createRules(selector, style[key], parent)
      }
    })
    .reduce((a, b) => a.concat(b), [])
}

const reduceCommonRules = (parent) => (a, style) => {
  const index = commonDeclarations[style.key]
    ? commonDeclarations[style.key].indexOf(style.value)
    : -1
  if (index > -1) {
    const selector = `.cxs-${style.prop}-${style.value}`
    return [...a, {
      id: selector,
      order: 0,
      selector,
      css: createRuleset(selector, [style], parent)
    }]
  } else {
    return a
  }
}

const filterCommonDeclarations = (style) => {
  return (
    commonDeclarations[style.key]
      ? commonDeclarations[style.key].indexOf(style.value)
      : -1
  ) < 0
}

const createRuleset = (selector, styles, parent) => {
  const declarations = styles.map(s => s.prop + ':' + s.value)
  const ruleset = `${selector}{${declarations.join(';')}}`
  return parent ? `${parent} { ${ruleset} }` : ruleset
}

const isObj = v => typeof v === 'object'
const isArr = v => Array.isArray(v)
const parseValue = (prop, val) => typeof val === 'number' ? addPx(prop, val) : val
const kebab = (str) => str.replace(/([A-Z])/g, g => '-' + g.toLowerCase())

export default createRules

