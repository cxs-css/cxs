
import comp from '../src'

const Flex = comp('div')({
  display: 'flex',
  alignItems: 'center'
})

export const FlexWrap = comp(Flex)({
  flexWrap: 'wrap'
})

export default Flex

