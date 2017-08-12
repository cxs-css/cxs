import cxs from 'cxs/component'
import Text from './Text'

const wrap = props => props.wrap ? { whiteSpace: 'pre-wrap' } : null
const Pre = cxs(Text)({
  margin: 0,
  overflow: 'auto'
}, wrap)

Pre.defaultProps = {
  is: 'pre',
  f: 1
}

export default Pre
