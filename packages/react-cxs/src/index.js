
const React = require('react')
const cxs = require('cxs').default

const transformProps = (originalProps) => {
  const props = { ...originalProps }
  if (props.className && typeof props.className === 'object') {
    props.className = cxs(props.className)
  }

  return props
}

const createElement = (tag, originalProps, ...children) => {
  const props = transformProps(originalProps)

  return React.createElement(tag, props, ...children)
}

module.exports = createElement
module.exports.cxs = cxs

