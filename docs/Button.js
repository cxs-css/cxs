import cxs from 'cxs/component'
import { blue, dark } from './colors'

const Button = cxs('a')`
  display: inline-block;
  text-decoration: none;
  padding: 12px;
  color: white;
  background-color: ${blue};
  border-radius: 3px;
  box-shadow: 0 0 8px rgba(0, 0, 0, .25);
`.hover`
  background-color: ${dark};
`

export default Button
