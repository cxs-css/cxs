
import comp from '../src'
import { scale } from './styles'

const Bar = comp('hr')(props => ({
  border: 0,
  maxWidth: scale[7],
  height: scale[2],
  margin: 0,
  marginTop: scale[3],
  marginBottom: scale[3],
  backgroundColor: props.color || 'currentcolor'
}), {
  removeProps: [ 'color' ]
})

export default Bar

