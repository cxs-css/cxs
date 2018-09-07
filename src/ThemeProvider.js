import createTheme from './createTheme'
import PropTypes from 'prop-types'
import React from 'react'

const h = React.createElement

class ThemeProvider extends React.Component {
  getChildContext () {
    return {
      theme: createTheme(this.props.theme)
    }
  }

  render () {
    return (
      h('div', null, this.props.children)
    )
  }
}

ThemeProvider.childContextTypes = {
  theme: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ])
}

export default ThemeProvider
