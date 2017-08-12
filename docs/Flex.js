import cxs from 'cxs/component'
import Box from './Box'

const align = props => props.align
  ? { alignItems: props.align }
  : null

const justify = props => props.justify
  ? { justifyContent: props.justify }
  : null

const column = props => props.column ? { flexDirection: 'column' } : null
const wrap = props => props.wrap ? { flexWrap: 'wrap' } : null

const Flex = cxs(Box)({
  display: 'flex',
},
  column,
  wrap,
  align,
  justify
)

export default Flex
