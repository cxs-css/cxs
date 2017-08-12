import cxs from 'cxs/component'
import Box from './Box'
import { blue } from './colors'

const Bar = cxs(Box)({
  width: 32,
  height: 8,
  backgroundColor: blue
})

export default Bar
