
import addPx from 'add-px-to-style'

export const isArr = n => Array.isArray(n)
export const isObj = n => typeof n === 'object' && n !== null && !isArr(n)

export const clean = (str) => ('' + str)
  .replace(/[\(\)]/g, '')
  .replace(/[%.]/g, 'p')
  .replace(/[&#,]/g, '')
  .replace(/@/g, '_')
  .replace(/[\:"\s]/g, '-')
  .replace(/^-+/, '')

export const hyphenate = (str) => ('' + str)
  .replace(/([A-Z]|^ms)/g, g => '-' + g.toLowerCase())

export const dot = str => '.' + str

export const flatten = (a = [], b) => isArr(b) ? [ ...a, ...b ] : [ ...a, b ]

export const flattenValues = (a = [], b) => isArr(b.value)
  ? [ ...a, ...b.value.map(val => ({...b, value: val })) ]
  : [ ...a, b ]

