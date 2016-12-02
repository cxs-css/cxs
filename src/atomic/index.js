
import assign from 'object-assign'
import addPx from 'add-px-to-style'
import { insert } from '../sheet'
import hash from '../hash'
import {
  createStylesArray,
  isObj,
  clean,
  combine,
  hyphenate
} from '../util'
import shorthands from './shorthands'

const cxs = (style) => {
  const rules = createStylesArray(style)
    .map(createRule)
  const classNames = rules
    .map(rule => rule.className)

  rules.forEach(insert)

  return classNames.join(' ')
}

const abbr = (str) => str
  .split('-')
  .map(c => c.charAt(0))
  .join('')

const createClassName = (prop, value, prefix) => {
  const base = (shorthands.indexOf(prop) > -1
    ? abbr(prop)
    : prop).replace(/^-/, '')
  const parts = combine('-')(
    prefix ? clean(prefix) : null,
    base,
    clean(value)
  )

  const className = parts.length < 16 ? parts : hash(parts)
  return className
}

const createRule = ({ id, key, value, parent = '', selector = '' }) => {
  const prop = hyphenate(key)
  const prefix = combine()(parent, selector)
  const className = createClassName(prop, value, prefix)
  const sel = combine()('.', className, selector)
  const rule = `${sel}{${prop}:${addPx(key, value)}}`
  const css = parent ? `${parent}{${rule}}` : rule

  return {
    id: className + id,
    className,
    css
  }
}

export { sheet, cache, reset, css } from '../sheet'
export default cxs

