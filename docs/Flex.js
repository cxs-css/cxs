import cxs from 'cxs/component'
import PropTypes from 'prop-types'
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

Flex.propTypes = {
  align: PropTypes.string,
  justify: PropTypes.string,
  column: PropTypes.bool,
  wrap: PropTypes.bool,
}

export default Flex
