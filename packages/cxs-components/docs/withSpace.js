
import comp from '../src'
import { margin, padding } from 'understyle'

const withSpace = Tag => {
  return comp(Tag)(props => {
    return Object.assign({},
      margin(props),
      padding(props),
    )
  }, {
    removeProps: [
      'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my',
      'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py',
    ]
  })
}

export default withSpace

