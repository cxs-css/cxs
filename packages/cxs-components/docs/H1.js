
import comp from '../src'
import withSpace from './withSpace'
import { breakpoints, typescale } from './styles'

const H1 = comp('h1')({
  fontSize: typescale[2],
  lineHeight: 1.25,
  margin: 0,
  [breakpoints.medium]: {
    fontSize: typescale[1]
  },
  [breakpoints.large]: {
    fontSize: typescale[0]
  }
})

export default withSpace(H1)

