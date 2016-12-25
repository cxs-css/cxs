
import comp from '../src'
import { colors, col } from './styles'

const Triangle = comp('div')(props => ({
  width: 0,
  height: 0,
  borderWidth: props.size,
  borderStyle: 'solid',
  borderTopColor: props.top ? props.color : 'transparent',
  borderRightColor: props.right ? props.color : 'transparent',
  borderBottomColor: props.bottom ? props.color : 'transparent',
  borderLeftColor: props.left ? props.color : 'transparent',
}), {
  defaultProps: {
    color: colors.magenta,
    size: 32,
  },
  removeProps: [
    'size',
    'color',
    'top',
    'right',
    'bottom',
    'left',
  ]
})

export default Triangle

