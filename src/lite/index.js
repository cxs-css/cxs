
import { sheet, css } from '../sheet'
import { addPx, hyphenate } from '../util'

const PSEUDO_REGEX = /^:/
const MEDIA_REGEX = /^@media/

let count = 0

export const cache = {}

export const reset = () => {
  for (let key in cache) {
    delete cache[key]
  }
  sheet.flush()
  count = 0
}

export const cxs = (obj) => {
  const classNames = parse(obj)

  return classNames.join(' ')
}

const parse = (obj, media, pseudo = '') => {
  const classNames = []

  for (let key in obj) {
    const value = obj[key]
    const type = typeof value

    if (type === 'string' || type === 'number') {
      classNames.push(createStyle(key, value, media, pseudo))
      continue
    }

    if (PSEUDO_REGEX.test(key)) {
      parse(value, media, pseudo + key)
        .forEach(s => classNames.push(s))
      continue
    }

    if (MEDIA_REGEX.test(key)) {
      parse(value, key, pseudo)
        .forEach(s => classNames.push(s))
      continue
    }

    if (Array.isArray(value)) {
      value.forEach(val => {
        classNames.push(createStyle(key, val, media, pseudo))
      })
      continue
    }
  }

  return classNames
}

const createStyle = (key, value, media, pseudo = '') => {
  const id = key + value + (media || '') + pseudo
  const dupe = cache[id]

  if (dupe) return dupe

  const className = alphaHash(count)
  count++
  const selector = '.' + className + pseudo
  const prop = hyphenate(key)
  const val = addPx(key, value)

  const rule = `${selector}{${prop}:${val}}`
  const css = media ? `${media}{${rule}}` : rule

  sheet.insert(css)
  cache[id] = className

  return className
}

const isNum = (str) => {
  const num = parseInt(str)
  return typeof num === 'number' && !isNaN(num)
}

export const alphaHash = (n) => {
  if (alpha[n]) return alpha[n]

  let residual = Math.floor(n)
  let result = ''
  const length = alpha.length

  while (residual !== 0) {
    const i = residual % length
    result = alpha[i] + result
    residual = Math.floor(residual / length)
  }

  return result
}

const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

cxs.css = css
cxs.reset = reset

export { sheet, css } from '../sheet'
export default cxs


