
import comp from '../src'
import { col, colors } from './styles'

const Link = comp('a')({
  color: col(5, 8, 4),
  textDecoration: 'none',
  transition: 'border .2s ease-out',
  borderBottom: '3px solid',
  borderBottomColor: col(4, 8, 4),
  ':hover': {
    color: col(5, 8, 3),
    borderBottomColor: col(5, 8, 3),
  },
  ':focus': {
    outline: 'none',
    color: col(5, 8, 3),
    borderBottomColor: col(5, 8, 3),
  }
})

export default Link

