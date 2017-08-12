const h = require('react').createElement
const { render } = require('react-dom')
const cxs = require('../../dist/component')

const app = document.createElement('div')

module.exports = () => {
  const Button = cxs('button')(props => ({
    fontFamily: 'inherit',
    fontSize: 'inherit',
    display: 'inline-block',
    margin: 0,
    padding: 16,
    border: 0,
    borderRadius: 4,
    color: 'white',
    backgroundColor: props.color,
    appearance: 'none',
    ':hover': {
      backgroundColor: 'black'
    }
  }))

  const button = render(
    h(Button, { color: 'tomato' }, 'Hello'),
    app
  )
}
