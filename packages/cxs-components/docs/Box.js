
import { compose } from 'recompose'
import comp from '../src'
import { scale, colors } from './styles'
import withSpace from './withSpace'
import withColor from './withColor'

const Box = comp('div')({})

const enhance = compose(withSpace, withColor)

export default enhance(Box)

