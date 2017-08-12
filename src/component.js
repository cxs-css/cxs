const h = require('react').createElement
const cxs = require('./index')

module.exports = C => (...args) => props =>
  h(C, Object.assign({}, props, {
    className: [
      props.className,
      ...args.map(a => typeof a === 'function' ? a(props) : a)
        .filter(s => s !== null)
        .map(s => cxs(s))
    ].join(' ')
  }))
