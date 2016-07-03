
import addPx from 'add-px-to-style'
import commonDeclarations from './common-declarations'

const createRules = (name, style, parent) => {
  // Extract nested rules
  const rules = createNestedRules(name, style, parent)

  // Create styles array
  const styles = Object.keys(style)
    .filter(key => style[key] !== null)
    .filter(key => Array.isArray(style[key]) || typeof style[key] !== 'object')
    .map(key => {
      const value = parseValue(key, style[key])
      return {
        key,
        prop: kebab(key),
        value
      }
    })
    .reduce((a, b) => {
      if (Array.isArray(b.value)) {
        return [...a, ...b.value.map(v => ({ ...b, value: v }))]
      } else {
        return [...a, b]
      }
    }, [])

  // Extract common declarations as rules
  const commonRules = styles
    .reduce(reduceCommonRules(parent), [])
    .forEach(r => rules.push(r))

  // Remove common declarations
  const filteredStyles = styles
    .filter(filterCommonDeclarations)

  // Add base rule
  rules.unshift({
    id: name + (parent || ''),
    order: parent ? 2 : 1,
    selector: '.' + name,
    css: createRuleset('.' + name, filteredStyles, parent)
  })

  return rules
}

const createNestedRules = (name, style, parent) => {
  return Object.keys(style)
    .filter(key => !!style[key])
    .filter(key => !Array.isArray(style[key]) && typeof style[key] === 'object')
    .map(key => {
      if (/^:/.test(key)) {
        return createRules(name + key, style[key], parent)
      } else if (/^@/.test(key)) {
        return createRules(name, style[key], key)
      }
    })
    .reduce((a, b) => a.concat(b), [])
}

const reduceCommonRules = (parent) => (a, style) => {
  const index = commonDeclarations[style.key] ? commonDeclarations[style.key].indexOf(style.value) : -1
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
  const index = commonDeclarations[style.key] ? commonDeclarations[style.key].indexOf(style.value) : -1
  return index < 0
}

const createRuleset = (selector, styles, parent) => {
  const declarations = styles
    .map(({ prop, value }) => prop + ':' + value)
  const ruleset = `${selector}{${declarations.join(';')}}`
  return parent ? `${parent} { ${ruleset} }` : ruleset
}

const parseValue = (prop, val) => typeof val === 'number' ? addPx(prop, val) : val
const kebab = (str) => str.replace(/([A-Z])/g, g => '-' + g.toLowerCase())

export default createRules

