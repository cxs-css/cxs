const h = require('react').createElement
const PropTypes = require('prop-types')
const cxs = require('./index')

const Box = ({
  is = 'div',
  attr = {},
  css = {},
  className,
  children
}) => {
  attr.className = [
    className,
    cxs(css)
  ].join(' ').trim()

  attr['data-hello'] = true

  return h(is, attr, children)
}

module.exports = Box
