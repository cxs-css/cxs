
import comp from '../src'
import { colors } from './styles'

const color = ({ color, bg, borderColor }) => ({
  color: colors[color] || color || null,
  backgroundColor: colors[bg] || bg || null,
  borderColor: colors[borderColor] || borderColor || null
})

/*
 * border={true}
 * border={false}
 * border={2}
 * border='top'
 * border='x'
 */

const borderStyle = ({ border }) => {
  console.log('border', border)
  if (typeof border === 'undefined' || border === null) {
    return
  }
  if (border === true) {
    return { border: '1px solid' }
  }
  if (border === false) {
    return { border: 0 }
  }

  if (typeof border === 'number') {
    return {
      borderStyle: 'solid',
      borderWidth: border
    }
  }

  if (typeof border === 'string') {
    switch (border) {
      case 'top':
        return { borderTop: '1px solid' }
        break
      case 'right':
        return { borderRight: '1px solid' }
        break
      case 'bottom':
        return { borderBottom: '1px solid' }
        break
      case 'left':
        return { borderLeft: '1px solid' }
        break
      case 'x':
        return {
          borderLeft: '1px solid',
          borderRight: '1px solid'
        }
        break
      case 'y':
        return {
          borderTop: '1px solid',
          borderBottom: '1px solid'
        }
        break
      default:
        return
    }
  }
}

const withColor = Tag => {
  return comp(Tag)(props => Object.assign({},
    color(props),
    borderStyle(props)
  ), {
    removeProps: [
      'color',
      'bg',
      'border',
      'borderColor'
    ]
  })
}

export default withColor

