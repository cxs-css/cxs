
import chroma from 'chroma-js'

const darken = c => n => chroma(c).darken(n).hex()

export const breakpoints = {
  small: '@media screen and (min-width:40em)',
  medium: '@media screen and (min-width:52em)',
  large: '@media screen and (min-width:64em)',
}

export const typescale = [
  72,
  64,
  48,
  32,
  20,
  16,
  12
]

export const scale = [
  0,
  8,
  16,
  32,
  48,
  64,
  96,
  128
]

const hues = [
  0,    // red
  45,   // yellow
  90,   // green
  135,  // lime
  180,  // cyan
    200, // blue
  225,  // blue
  270,  // violet
  315,  // magenta
]

const sats = [
  0,
  1/8,
  1/4,
  3/8,
  1/2,
  5/8,
  3/4,
  7/8,
  1
]

export const col = (...args) => chroma.hsl([
  hues[args[0]],
  sats[args[1]],
  sats[args[2]]
]).hex()

// 0 1 2 3 4 5 6 7 8
// a b c d e f g h i
// <hue>-<sat>-<lte>
// 0-a-0
// red-a-0

// const black = '#20292f'
const black = '#11577a'
const blue = '#07c'

const cyan = '#0ff'
const magenta = '#f0f'
const yellow = '#ff0'

export const colors = {
  black,
  blue,
  cyan,
  magenta,
  yellow,
  darkblue: darken(blue),
  darkmagenta: darken(magenta),
}

const styles = {
  typescale,
  breakpoints,
  scale,
  colors,
  col
}

export default styles

