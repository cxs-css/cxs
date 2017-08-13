const h = require('react').createElement
const PropTypes = require('prop-types')
const cxs = require('./index')

module.exports = C => (...args) => {
  const Comp = (props, context) =>
    h(C, Object.assign({}, props, {
      className: [
        props.className,
        ...args.map(a => typeof a === 'function'
          ? a(Object.assign({ theme: context.theme }, props))
          : a)
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
