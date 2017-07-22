import React from 'react'
import cxs from './index'

const component = (...args) => {
  const rule = cxs(...args)

  rule.component = Comp => {
    const className = rule.toString()
    return props => (
      <Comp
        {...props}
        className={className}
      />
    )
  }

  return rule
}

export default component
