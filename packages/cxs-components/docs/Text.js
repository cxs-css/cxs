
import comp from '../src'
import { typescale } from './styles'

const Text = comp('p')(props => ({
  fontSize: typescale[props.size] || typescale[4],
  maxWidth: '40em'
}), {
  removeProps: [ 'size' ]
})

export default Text

