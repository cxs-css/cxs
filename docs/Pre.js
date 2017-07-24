import cxs from 'cxs/component'
import Text from './Text'

const wrap = props => props.wrap ? { whiteSpace: 'pre-wrap' } : null
const Pre = cxs(Text)`
  font-family: 'Roboto Mono', 'SF Mono', Menlo, monospace;
  margin: 0;
  overflow: auto;
  ${wrap}
`

Pre.defaultProps = {
  is: 'pre'
}

export default Pre
