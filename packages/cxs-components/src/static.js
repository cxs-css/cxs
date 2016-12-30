
import React from 'react'
import classnames from 'classnames'
import cxs from 'cxs'

const createComponent = (Tag = 'div') => (style = {}) => {
  const cx = cxs(style)

  const Component = ({ className, ...props }) => {
    const combinedClassName = classnames(cx, className)

    return (
      <Tag
        {...props}
        className={combinedClassName}
      />
    )
  }

  return Component
}

export { default as cxs } from 'cxs'

export default createComponent

