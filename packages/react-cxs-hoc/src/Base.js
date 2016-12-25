
import React from 'react'
import Cxs from '.'

class Base extends React.Component {
  render () {
    const {
      tag = 'div',
      ...rest
    } = this.props

    const Comp = tag

    return (
      <Comp {...rest} />
    )
  }
}

export default Cxs(Base)

