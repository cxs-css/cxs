import cxs from 'cxs/component'
import PropTypes from 'prop-types'
import Box from './Box'
import { blue } from './colors'

const scale = n => ([
  12,
  14,
  16,
  20,
  24,
  32,
  48,
  64
][n] || n) + 'px'

const size = props => props.f !== null || props.f !== undefined
  ? { fontSize: scale(props.f) }
  : null

const bold = props => props.bold ? { fontWeight: 'bold' } : null

const Text = cxs(Box)(size, bold, {
  ' a': {
    color: blue
  }
})

Text.propTypes = {
  f: PropTypes.number,
  bold: PropTypes.bool,
}

export default Text
