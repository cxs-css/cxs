import kebabCase from 'lodash/kebabCase'

export default key => {
  if (/^[A-Z]/.test(key)) {
    const prop = `-${kebabCase(key)}`
    return prop
  } else {
    return kebabCase(key)
  }
}
