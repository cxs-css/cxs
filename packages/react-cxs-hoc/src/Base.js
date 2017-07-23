
import React from 'react'
import withCxs from '.'

const Base = ({ tag = 'div', ...props }) => {
  const Comp = tag
  return <Comp {...props} />
}

export default withCxs(Base)
