import cxs from 'cxs/component'
import Box from './Box'
import { blue } from './colors'

const Bar = cxs(Box)`
  width: 160px;
  height: 2px;
  background-color: ${blue};
`

export default Bar
