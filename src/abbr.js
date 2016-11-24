
import { clean, kebab } from './util'

const shortProps = [
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'display',
  'float',
  'font-family',
  'font-weight',
  'font-size',
  'line-height',
  'width',
  'height',
  'color',
  'background',
  'background-color',
  'background-image'
]

export const shorten = str => str
  .split('-')
  .map(c => c.charAt(0))
  .join('')

export const abbr = (prop, val) => {
  const property = kebab(prop)
  const value = '-' + clean(val)
  if (shortProps.includes(property)) {
    return shorten(property) + value
  }
  return property + value
}

export default abbr

