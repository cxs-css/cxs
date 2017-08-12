import cxs from 'cxs/component'
import Box from './Box'
import media from './media'

const Column = cxs(Box)({
  width: '100%',
  [media[0]]: {
    width: 100 / 2 + '%'
  },
  [media[1]]: {
    width: 100 / 3 + '%'
  },
  [media[2]]: {
    width: 100 / 4 + '%'
  },
})

  /*
.push()`
  width: 100%;
`.media(media[0])`
  width: ${100 / 2}%;
`.media(media[1])`
  width: ${100 / 3}%;
`.media(media[2])`
  width: ${100 / 4}%;
`
*/

export default Column
