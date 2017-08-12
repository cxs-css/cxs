import cxs from 'cxs/component'
import Box from './Box'

const Container = cxs(Box)({
  maxWidth: 1024,
  paddingLeft: 32,
  paddingRight: 32,
  marginLeft: 'auto',
  marginRight: 'auto',
})

export default Container
