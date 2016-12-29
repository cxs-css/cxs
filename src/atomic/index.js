
import { StyleSheet } from 'glamor/lib/sheet'
import hash from '../hash'
import {
  addPx,
  clean,
  combine,
  hyphenate
} from '../util'
import shorthands from './shorthands'

export const sheet = new StyleSheet()

sheet.inject()

export const getCss = () => sheet.rules()
  .map(rule => rule.cssText)
  .join('')

export const cache = {}

export const reset = () => {
  for (let key in cache) {
    delete cache[key]
  }
  sheet.flush()
}

const cxs = (style) => {
  const classNames = parse(style)
  return classNames.join(' ')
}

const parse = (obj, media, children = '') => {
  const classNames = []

  for (let key in obj) {
    const value = obj[key]
    const type = typeof value

    if (type === 'string' || type === 'number') {
      classNames.push(createStyle(key, value, media, children))
      continue
    }

    if (Array.isArray(value)) {
      value.forEach(val => {
        classNames.push(
          createStyle(key, value, media, children)
        )
      })
      continue
    }

    if (/^:/.test(key)) {
      parse(value, media, children + key)
        .forEach(className => {
          classNames.push(className)
        })
      continue
    }

    if (/^@media/.test(key)) {
      parse(value, key, children)
        .forEach(className => {
          classNames.push(className)
        })
      continue
    }

    parse(value, media, children + ' ' + key)
      .forEach(className => {
        classNames.push(className)
      })
    continue
  }

  return classNames
}

const createStyle = (key, value, media, children = '') => {
  const prefix = (media || '') + children
  const id = key + value + prefix
  const dupe = cache[id]

  if (dupe) return dupe

  const prop = hyphenate(key)
  const val = addPx(key, value)
  const className = createClassName(prop, value, prefix)
  const selector = '.' + className + children
  const rule = `${selector}{${prop}:${val}}`
  const css = media ? `${media}{${rule}}` : rule

  sheet.insert(css)
  cache[id] = className

  return className
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

  const className = parts.length < 24 ? parts : hash(parts)
  return className
}

cxs.reset = reset
cxs.getCss = getCss

export default cxs

