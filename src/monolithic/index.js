
import assign from 'object-assign'
import addPx from 'add-px-to-style'
import hash from '../hash'
import {
  sheet,
  cache,
  insert,
  reset,
  css
} from '../sheet'
import {
  createStylesArray,
  isObj,
  hyphenate,
  objToArr
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
  const { id, selector } = b
  a[id] = a[id] || assign({}, b, {
    // To do: Add selector before this step?
    selector: selector || '',
    declarations: []
  })
  a[id].declarations.push(b)
  return a
}

const createRules = (rootSelector, styles) => objToArr(styles)
  .map(({ key, value }) => {
    const { id, selector, declarations, parent } = value
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

const getObjectArgs = (a = {}, b) => isObj(b) ? assign(a, b) : a

const getStringArgs = (a = [], b) => typeof b === 'string' ? [ ...a, b ] : a

cxs.sheet = sheet
cxs.css = css
cxs.reset = reset

export {
  sheet,
  cache,
  reset,
  css
} from '../sheet'
export default cxs

