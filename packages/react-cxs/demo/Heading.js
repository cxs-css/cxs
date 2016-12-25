
import { breakpoints } from './style'

const Heading = (props) => {
  const cx = {
    fontSize: 64,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    margin: 0,
    animationName: 'rainbow',
    animationDuration: '16s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    [breakpoints.md]: {
      fontSize: 128
    },
    [breakpoints.lg]: {
      fontSize: 192
    },
    '@keyframes rainbow': {
      '0%': {
        color: 'cyan',
      },
      '50%': {
        color: 'magenta'
      },
      '100%': {
        color: 'cyan',
      }
    }
  }

  return <h1 {...props} className={cx} />
}

export default Heading

