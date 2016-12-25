
import comp from '../src'
import { scale } from './styles'

const Pre = comp('pre')({
  fontFamily: 'Menlo, monospace',
  fontSize: 14,
  overflow: 'auto',
  padding: scale[2]
})

export default Pre

