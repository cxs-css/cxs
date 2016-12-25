
import React from 'react'
import classnames from 'classnames'
import cxs from 'cxs'

const getProps = (originalProps, removeProps) => {
  const props = Object.keys(originalProps)
    .map(key => {
      const value = originalProps[key]
      return { key, value }
    })
    .filter(prop => removeProps.indexOf(prop.key) < 0)
    .reduce((a, b) => {
      a[b.key] = b.value
      return a
    }, {})
  return props
}

const createComponent = (Tag = 'div') => (style = {}, options = {}) => {
  const { defaultProps = {}, removeProps = [] } = options

  const cx = typeof style === 'function'
    ? (props) => cxs(style(props))
    : cxs(style)

  const Component = ({ className, ...rest }) => {
    const cxsClassName = typeof cx === 'function' ? cx(rest) : cx
    const combinedClassName = classnames(cxsClassName, className)
    const props = getProps(rest, removeProps)

    return (
      <Tag
        {...props}
        className={combinedClassName}
      />
    )
  }

  Component.defaultProps = defaultProps

  return Component
}

export { default as cxs } from 'cxs'

export default createComponent

