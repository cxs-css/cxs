const React = require('react')
const PropTypes = require('prop-types')
const h = React.createElement

class ThemeProvider extends React.Component {
  getChildContext () {
    return {
      theme: this.props.theme
    }
  }

  render () {
    return (
      h('div', null, this.props.children)
    )
  }
}

ThemeProvider.childContextTypes = {
  theme: PropTypes.object
}

module.exports = ThemeProvider
