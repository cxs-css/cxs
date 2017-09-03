import cxs from 'cxs/component'
import Box from './Box'

const Container = cxs(Box)({
  maxWidth: '1024px'
})

Container.defaultProps = {
  mx: 'auto',
  px: 4
}

export default Container
