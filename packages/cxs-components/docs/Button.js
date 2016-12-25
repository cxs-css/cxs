
import comp from '../src'
import { colors } from './styles'

const Button = comp('button')(props => ({
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 600,
  padding: 8,
  color: colors[props.color],
  backgroundColor: colors[props.bg] || 'transparent',
  borderRadius: 2,
  border: '1px solid transparent',
  appearance: 'none',
  ':hover': {
    boxShadow: 'inset 0 0 0 256px rgba(0,0,0,.25)'
    // backgroundColor: colors.darkblue(1/2)
  },
  ':focus': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${colors.darkblue(1/2)}`
  }
}), {
  removeProps: [ 'color', 'bg' ]
})

export default Button

