import cxs from 'cxs/component'
import Text from './Text'

const Heading = cxs(Text)`
  margin: 0;
`

Heading.defaultProps = {
  is: 'h2',
  f: 5
}

export default Heading
