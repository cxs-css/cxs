const h = require('react').createElement
const { render } = require('react-dom')
const { createRenderer } = require('fela')
const { createComponent, Provider } = require('react-fela')

const app = document.createElement('div')

const renderer = createRenderer()

module.exports = () => {
  const Button = createComponent(props => ({
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
  }), 'button')

  const button = render(
    h(Provider, { renderer },
      h(Button, { color: 'tomato' }, 'Hello')
    ),
    app
  )
}
