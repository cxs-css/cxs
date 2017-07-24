import cxs from 'cxs/component'
import media from './media'

const Title = cxs('h1')`
  font-size: 64px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: .5em;
  margin: 0;
  margin-right: -.5em;
  mix-blend-mode: difference;
  opacity: .875;
`.media(media[0])`
  font-size: 72px;
`.media(media[1])`
  font-size: 96px;
`.media(media[2])`
  font-size: 128px;
`

export default Title
