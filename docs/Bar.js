import cxs from 'cxs/component'
import Box from './Box'

const Bar = cxs(Box)(props => ({
  width: 32,
  height: 8,
  backgroundColor: props.theme('colors.blue')
}))

export default Bar
