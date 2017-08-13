import cxs from 'cxs/component'
import { blue, dark } from './colors'

const Button = cxs('a')({
  display: 'inline-block',
  textDecoration: 'none',
  padding: 12,
  color: 'white',
  backgroundColor: blue,
  borderRadius: 3,
  boxShadow: '0 0 8px rgba(0, 0, 0, .25)',
  ':hover': {
    backgroundColor: dark
  }
})

export default Button
