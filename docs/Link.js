import cxs from 'cxs/component'
import { blue1 } from './colors'

const Link = cxs('a')`
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  margin-right: 1em;
  color: inherit;
`.hover`
  text-decoration: underline;
`

export default Link
