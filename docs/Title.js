import cxs from 'cxs/component'

const Title = cxs('h1')`
  font-size: 48px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .75em;
  margin: 0;
  margin-right: -.75em;
`.media('@media screen and (min-width:40em)')`
  font-size: 64px;
`

export default Title
