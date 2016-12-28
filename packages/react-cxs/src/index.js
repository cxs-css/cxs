
const React = require('react')
const classnames = require('classnames')
const cxs = require('cxs').default

const transformProps = ({
  css = {},
  className,
  ...rest
} = {}) => {
  const cx = classnames(className, cxs(css))

  return {
    ...rest,
    className: cx
  }
}

const createElement = (tag, originalProps, ...children) => {
  const props = transformProps(originalProps)

  return React.createElement(tag, props, ...children)
}

module.exports = createElement
module.exports.cxs = cxs

