
import React from 'react'
import cxs from 'cxs'

const Cxs = (Comp) => {
  class CxsWrap extends React.Component {
    render () {
      const {
        className,
        ...rest
      } = this.props

      const cx = typeof className === 'object'
        ? cxs(className)
        : className

      return <Comp {...rest} className={cx} />
    }
  }

  CxsWrap.propTypes = {
    className: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ])
  }

  return CxsWrap
}

export cxs from 'cxs'

export default Cxs

