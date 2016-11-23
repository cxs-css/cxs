
import hs from 'shorthash'
import hash from 'murmurhash-js/murmurhash3_gc'
import addPx from 'add-px-to-style'
import abbreviations from './abbreviations'

export const parseValue = (prop, val) => typeof val === 'number' ? addPx(prop, val) : val

export const clean = (str) => ('' + str)
  .replace(/[\(\)]/g, '')
  .replace(/%/g, 'p')
  .replace(/[.,\:"#\s]/g, '-')

export const kebab = (str) => ('' + str)
  .replace(/([A-Z]|^ms)/g, g => '-' + g.toLowerCase())

export const abbreviate = str => abbreviations[str] || str

export const dot = str => '.' + str

export const createClassName = (prop, value, prefix) => {
  const base = abbreviate(prop) + '-' + clean(kebab(value))
  const name = prefix
    ? clean(prefix) + base
    : base
  return '_' + hs.unique(name)
}

