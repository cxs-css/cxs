
import comp from '../src'
import { breakpoints, typescale } from './styles'

const Blockquote = comp('blockquote')({
  fontSize: typescale[3],
  lineHeight: 1.25,
  fontStyle: 'normal',
  fontWeight: 'bold',
  margin: 0,
  [breakpoints.medium]: {
    fontSize: typescale[2],
  }
})

export default Blockquote

