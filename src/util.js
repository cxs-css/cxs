
export const isArr = n => Array.isArray(n)
export const isObj = n => typeof n === 'object' && n !== null && !isArr(n)

const BLANK_REG = /[\(\)#]/g
const P_REG = /%/g
const SYMBOL_REG = /[&,:"\s]/g
const AT_REG = /@/g
const HYPHEN_REG = /^-/

export const clean = (str) => ('' + str)
  .replace(BLANK_REG, '')
  .replace(P_REG, 'P')
  .replace(SYMBOL_REG, '--')
  .replace(AT_REG, '_')
  .replace(HYPHEN_REG, '')

export const hyphenate = (str) => ('' + str)
  .replace(/[A-Z]|^ms/g, '-$&')
  .toLowerCase()

export const combine = (str = '') => (...args) => args
  .filter(a => a !== null)
  .join(str)

export const addPx = (prop, value) => {
  if (typeof value !== 'number') return value
  if (unitlessProps.indexOf(prop) > -1) return value
  return value + 'px'
}

const unitlessProps = [
  'animationIterationCount',
  'boxFlex',
  'boxFlexGroup',
  'boxOrdinalGroup',
  'columnCount',
  'flex',
  'flexGrow',
  'flexPositive',
  'flexShrink',
  'flexNegative',
  'flexOrder',
  'gridRow',
  'gridColumn',
  'fontWeight',
  'lineClamp',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'tabSize',
  'widows',
  'zIndex',
  'zoom',
  'fillOpacity',
  'stopOpacity',
  'strokeDashoffset',
  'strokeOpacity',
  'strokeWidth'
]

