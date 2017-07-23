import cxs from 'cxs/component'
import { breakpoints } from './media'

const HideMobile = cxs('div', {
  media: `@media screen and (max-width: ${breakpoints[0]}em)`
})`display: none;`

export default HideMobile
