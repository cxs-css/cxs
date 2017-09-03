import cxs from 'cxs/component'
import Box from './Box'

const Column = cxs(Box)({})

Column.defaultProps = {
  w: [ 1, 1/2, 1/3, 1/4 ]
}

export default Column
