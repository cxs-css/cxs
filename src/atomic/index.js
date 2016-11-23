
import sheet from '../sheet'
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

const reduceStringArgs = (a = '', b) => {
  if (typeof b === 'string') {
    return [a, b].join(', ')
  }
  return a
}

const reduceObjArgs = (a = {}, b) => {
  if (b !== null && !Array.isArray(b) && typeof b === 'object') {
    return Object.assign(a, b)
  }
  return a
}

const cxs = (...args) => {
  const selector = args.reduce(reduceStringArgs)
  const style = args.reduce(reduceObjArgs)

  const rules = createRules(style)
    // temporarily remove unhandled styles
    .filter(rule => !!rule)

  const classNames = rules
    // .filter(rule => rule.className) // Do any rules not have a className?
    .map(rule => rule.className)

  inject(rules)

  return classNames.join(' ')
}

cxs.sheet = sheet

export const clear = () => {
  while (cache.length) {
    cache.pop()
  }
}

export const reset = () => {
  cxs.clear()
  cxs.sheet.flush()
}

export const css = () => {
  return sheet.rules()
    .map(rule => rule.cssText)
    .join('')
}

cxs.clear = clear
cxs.reset = reset
cxs.css = css

export { default as sheet } from '../sheet'
export default cxs

