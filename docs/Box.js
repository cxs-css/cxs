import cxs from 'cxs/component'
import colors from './colors'
import { space, width, color } from 'styled-system'

const Box = cxs('div')(
  space,
  width,
  color
)

export default Box
