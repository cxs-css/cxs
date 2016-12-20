
import assign from 'object-assign'
import addPx from 'add-px-to-style'
import hash from '../hash'
import { insert, css, reset } from '../sheet'
import {
  createStylesArray,
  hyphenate,
  objToArr,
  getStringArgs,
  getObjectArgs
} from '../util'

const cxs = (...args) => {
  const selectors = args.reduce(getStringArgs, [])
  const style = args.reduce(getObjectArgs, {})
  const hashname = hash(JSON.stringify(style))
  const selector = selectors.length ? selectors.join(', ') : '.' + hashname

  const styles = createStylesArray(style)
    .reduce(group, {})

  const rules = createRules(selector, styles)

  rules.forEach(insert)

  return hashname
}

const group = (a = {}, b) => {
  const { id } = b
  a[id] = a[id] || assign({}, b, { declarations: [] })
  a[id].declarations.push(b)
  return a
}

const createRules = (rootSelector, styles) => objToArr(styles)
  .map(({ key, value }) => {
    const { selector, declarations, parent } = value
    const rule = createRule(rootSelector + selector)(declarations)
    const css = parent ? `${parent}{${rule}}` : rule

    return {
      id: rootSelector + '-' + key,
      css
    }
  })

const createRule = (selector) => (declarations) => {
  const body = declarations.map(({ key, value }) => (
    hyphenate(key) + ':' + addPx(key, value)
  )).join(';')
  return `${selector}{${body}}`
}

cxs.reset = reset
cxs.css = css

export {
  sheet,
  cache,
  reset,
  css
} from '../sheet'
export default cxs

