
import Color from 'color'

export const darken = (c, d) => Color(c).darken(d).rgbString()
export const alpha = (c, a) => Color(c).alpha(a).rgbString()

const blue = '#07c'
const purple = '#80c'
const gray = '#f3f3f3'
const midgray = '#777'

export const colors = {
  blue,
  darkBlue: darken(blue, 1 / 8),
  purple,
  gray,
  midgray
}

export const breakpoints = {
  sm: '@media screen and (min-width: 40em)',
  md: '@media screen and (min-width: 52em)',
  lg: '@media screen and (min-width: 64em)'
}

const style = {
  colors,
  breakpoints
}

export default style
