
import cxs from './index'
import commonDeclarations from './common-declarations'
import {
  createRuleset,
  kebab,
  parseValue
} from './create-rules'
import sheet from './sheet'

const commonCache = []

const isCommon = (prop, value) =>
  commonDeclarations[prop] &&
  commonDeclarations[prop].indexOf(value) > -1

const extractCommon = (style) => {
  const rules = Object.keys(style)
    .map(prop => {
      const value = style[prop]
      return { prop, value }
    })
    .filter(({ prop, value }) => isCommon(prop, value))
    .map(({ prop, value }) => ({
      prop: kebab(prop),
      value: parseValue(prop, value)
    }))
  return rules
}

const filterCommon = (style) => {
  const custom = {}
  Object.keys(style).map(prop => {
    if (!isCommon(prop, style[prop])) {
      custom[prop] = style[prop]
    }
  })
  return custom
}

const createCommonRule = ({ prop, value }) => {
  const id = prop + '_' + value
  const selector = `.cxs-${prop}-${value}`
  const css = createRuleset(selector, [{ prop, value }])

  return {
    id,
    selector,
    css
  }
}

const optimized = (style) => {
  const commonRules = extractCommon(style)
    .map(createCommonRule)
  const commonClassNames = commonRules.map(({ selector }) => selector.replace(/^\./, ''))

  commonRules
    .filter(rule => commonCache.indexOf(rule.id) < 0)
    .forEach(({ id, css }) => {
      commonCache.push(id)
      sheet.insert(css)
    })

  const customStyle = filterCommon(style)
  const customClassName = cxs(customStyle)

  return [
    ...commonClassNames,
    customClassName
  ].join(' ')
}

optimized.sheet = sheet

optimized.clear = () => {
  while (commonCache.length) {
    commonCache.pop()
  }
  cxs.clear()
}

Object.defineProperty(optimized, 'rules', {
  get () {
    return sheet.rules()
  }
})

Object.defineProperty(optimized, 'css', {
  get () {
    return sheet.rules().map(r => r.cssText).join('')
  }
})

export default optimized

