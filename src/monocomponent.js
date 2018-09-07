import _cxs from './monolithic'
import PropTypes from 'prop-types'
import React from 'react'

const h = React.createElement

function cxs (C) {
  return (...args) => {
    const Comp = (props, context = {}) => {
      const stylePropKeys = Object.keys(Comp.propTypes || {})
      const styleProps = Object.assign({ theme: context.theme || {} }, props)

      const next = {}
      for (let key in props) {
        if (stylePropKeys.includes(key)) continue
        next[key] = props[key]
      }
      next.className = [
        next.className,
        ...args.map(a => typeof a === 'function' ? a(styleProps) : a)
        .filter(s => !!s)
        .map(s => _cxs(s))
      ].join(' ').trim()

      return h(C, next)
    }

    Comp.contextTypes = {
      theme: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
      ])
    }

    return Comp
  }
}

cxs.css = _cxs.css
cxs.reset = _cxs.reset

export default cxs
