const h = require('react').createElement
const { render } = require('react-dom')
const styled = require('emotion/react').default

const app = document.createElement('div')

module.exports = () => {
  const Button = styled('button')`
    font-family: inherit;
    font-size: inherit;
    display: inline-block;
    margin: 0;
    padding: 16px;
    border: 0;
    border-radius: 4px;
    color: white;
    background-color: ${props => props.color};
    appearance: none;
    &:hover: {
      background-color: black;
    }
  `

  const button = render(
    h(Button, { color: 'tomato' }, 'Hello'),
    app
  )
}
