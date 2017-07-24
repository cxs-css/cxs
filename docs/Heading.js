import cxs from 'cxs/component'
import Text from './Text'

const Heading = cxs(Text)`
  line-height: 1.25;
`

Heading.defaultProps = {
  is: 'h2',
  mt: 0,
  mb: 0,
  f: 5
}

export default Heading
