
import sheet from './sheet'
import createRules from './create-rules'

export const cache = []

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

  const classNames = rules
    .map(rule => rule.className)

  inject(rules)

  return classNames.join(' ')
}

export const reset = () => {
  while (cache.length) {
    cache.pop()
  }
  cxs.sheet.flush()
}

export const css = () => {
  return sheet.rules()
    .map(rule => rule.cssText)
    .join('')
}

cxs.sheet = sheet
cxs.reset = reset
cxs.css = css

export { default as sheet } from './sheet'
export default cxs

