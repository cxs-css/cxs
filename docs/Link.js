import cxs from 'cxs/component'
import { blue } from './colors'

const Link = cxs('a')({
  textDecoration: 'none',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  marginRight: '1em',
  color: 'inherit',
  ':hover': {
    color: blue,
    textDecoration: 'underline',
  }
})

export default Link
