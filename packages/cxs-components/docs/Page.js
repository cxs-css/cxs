
import comp from '../src'
import { breakpoints, scale, colors } from './styles'

const Page = comp('div')({
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  lineHeight: 1.5,
  padding: scale[3],
  color: colors.black,
  [breakpoints.medium]: {
    padding: scale[4]
  }
})

export default Page

