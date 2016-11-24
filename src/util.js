

import addPx from 'add-px-to-style'
// import abbreviations from './abbreviations'
import hash from './hash'
import abbr from './abbr'

export const parseValue = (prop, val) => typeof val === 'number' ? addPx(prop, val) : val

export const clean = (str) => ('' + str)
  .replace(/[\(\)]/g, '')
  .replace(/%/g, 'p')
  .replace(/[#\:]/g, '')
  .replace(/@/g, '_')
  .replace(/[.,\:"\s]/g, '-')

export const kebab = (str) => ('' + str)
  .replace(/([A-Z]|^ms)/g, g => '-' + g.toLowerCase())

export const dot = str => '.' + str

export const createClassName = (prop, value, prefix) => {
  const base = abbr(prop, value) // + '-' + clean(kebab(value))
  const name = prefix
    ? clean(prefix) + base
    : base

  // return '_' + hash(name)
  return name
}

