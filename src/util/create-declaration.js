import toCssProperty from './to-css-property'

export default (key, value) => (
  `${toCssProperty(key)}:${value}`
)
