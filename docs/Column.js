import Box from './Box'
import media from './media'

const Column = Box.push()`
  width: 100%;
`.media(media[0])`
  width: ${100 / 2}%;
`.media(media[1])`
  width: ${100 / 3}%;
`.media(media[2])`
  width: ${100 / 4}%;
`

export default Column
