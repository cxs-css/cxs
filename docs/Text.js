import cxs from 'cxs/component'
import Box from './Box'

const scale = n => [
  12,
  14,
  16,
  20,
  24,
  32,
  48,
  64
][n] || n

const size = props => props.f
  ? { fontSize: scale(props.f) }
  : null

const bold = props => props.bold ? { fontWeight: 'bold' } : null

const Text = cxs(Box)`
  max-width: 40em;
  ${size}
  ${bold}
`

export default Text
