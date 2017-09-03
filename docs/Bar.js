import cxs from 'cxs/component'
import Box from './Box'

const Bar = cxs(Box)(props => ({
  width: '32px',
  height: '8px',
  backgroundColor: props.theme('colors.blue')
}))

export default Bar
