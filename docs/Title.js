import cxs from 'cxs/component'
import media from './media'

const Title = cxs('h1')`
  font-size: 48px;
  line-height: 1;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .75em;
  margin: 0;
  margin-right: -.75em;
`.media(media[0])`
  font-size: 64px;
`.media(media[1])`
  font-size: 96px;
`.media(media[2])`
  font-size: 128px;
`

export default Title
