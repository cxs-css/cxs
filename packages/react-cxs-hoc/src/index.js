
import React from 'react'
import cxs from 'cxs'
import classnames from 'classnames'

const withCxs = (Comp) => {
  class CxsComponent extends React.Component {
    render () {
      const {
        css = {},
        className,
        ...rest
      } = this.props

      const cx = classnames(className, cxs(css))

      return <Comp {...rest} className={cx} />
    }
  }

  CxsComponent.propTypes = {
    className: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ])
  }

  return CxsComponent
}

export { default as cxs } from 'cxs'

export default withCxs

