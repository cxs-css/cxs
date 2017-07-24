export const breakpoints = [
  40,
  56,
  72,
]
export const media = breakpoints
  .map(n => `@media screen and (min-width: ${n}em)`)
export default media
