const h = require('react').createElement
const { render } = require('react-dom')

const app = document.createElement('div')

module.exports = () => {
  const Button = styled('button')(props => ({
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

const styled = C => (...args) => props => h(C, Object.assign({}, props, {
  style: Object.assign({}, props.style,
    ...args.map(a => typeof a === 'function' ? a(props) : a)
  )
}))
