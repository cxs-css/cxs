import cxs from 'cxs/component'
import Text from './Text'

const Pre = cxs(Text)`
  font-family: 'Roboto Mono', 'SF Mono', Menlo, monospace;
  margin: 0;
  overflow: auto;
`

Pre.defaultProps = {
  is: 'pre'
}

export default Pre
