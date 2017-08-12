const h = require('react').createElement
const PropTypes = require('prop-types')
const cxs = require('./index')

module.exports = C => (...args) => {
  const Comp = props =>
    h(C, Object.assign({}, props, {
      className: [
        props.className,
        ...args.map(a => typeof a === 'function' ? a(props) : a)
          .filter(s => s !== null)
          .map(s => cxs(s))
      ].join(' ')
    }))

  Comp.displayName = C.displayName
  Comp.contextTypes = {
    theme: PropTypes.object
  }

  return Comp
}

module.exports.css = cxs.css
module.exports.reset = cxs.reset
