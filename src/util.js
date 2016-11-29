
import addPx from 'add-px-to-style'

export const isArr = n => Array.isArray(n)
export const isObj = n => typeof n === 'object' && n !== null && !isArr(n)

export const parseValue = (prop, val) => typeof val === 'number' ? addPx(prop, val) : val

export const clean = (str) => ('' + str)
  .replace(/[\(\)]/g, '')
  .replace(/[%.]/g, 'p')
  .replace(/[&#,]/g, '')
  .replace(/@/g, '_')
  .replace(/[\:"\s]/g, '-')
  .replace(/^-+/, '')

export const kebab = (str) => ('' + str)
  .replace(/([A-Z]|^ms)/g, g => '-' + g.toLowerCase())

export const dot = str => '.' + str

export const flattenArray = (a = [], b) => isArr(b) ? [ ...a, ...b ] : [ ...a, b ]

export const flattenArrayValues = (a = [], b) => isArr(b.value)
  ? [ ...a, ...b.value.map(val => ({...b, value: val })) ]
  : [ ...a, b ]

