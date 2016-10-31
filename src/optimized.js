
import cxs from './index'
import commonDeclarations from './common-declarations'
import { kebab, createRuleset } from './create-rules'
import sheet from './sheet'

const commonCache = []

const isCommon = (prop, value) => {
  return commonDeclarations[prop] &&
    commonDeclarations[prop].indexOf(value) > -1
}

const extractCommons = (style) => {
  const decs = Object.keys(style).map(prop => {
    const value = style[prop]
    return { prop, value }
  }).filter(d => isCommon(d.prop, d.value))
    .map(({ prop, value }) => ({
      prop: kebab(prop),
      value
    }))

  return decs
}

const filterCommons = (style) => {
  const result = {}
  Object.keys(style).forEach(prop => {
    if (!isCommon(prop, style[prop])) {
      result[prop] = style[prop]
    }
  })
  return result
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
  const commonRules = extractCommons(style)
    .map(createCommonRule)

  commonRules
    .filter(r => commonCache.indexOf(r.id) < 0)
    .forEach(r => {
      commonCache.push(r.id)
      sheet.insert(r.css)
    })

  const commonClassNames = commonRules.map(r => r.selector)
    .map(s => s.replace(/^\./, ''))

  const customStyle = filterCommons(style)
  const customClassName = cxs(customStyle)

  const classNames = [
    ...commonClassNames,
    customClassName
  ].join(' ')

  console.log(classNames)
  return classNames
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

