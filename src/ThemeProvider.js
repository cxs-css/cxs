const React = require('react')
const PropTypes = require('prop-types')
const createTheme = require('./createTheme')
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

module.exports = ThemeProvider
