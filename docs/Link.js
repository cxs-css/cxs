import cxs from 'cxs/component'
import { blue1 } from './colors'

const Link = cxs('a')`
  text-decoration: none;
  font-weight: bold;
  margin-right: 1em;
  color: ${blue1};
`.hover`
  text-decoration: underline;
`

export default Link
