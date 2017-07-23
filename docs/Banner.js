import cxs from 'cxs/component'
import {
  blue,
  blue0,
  blue1
} from './colors'

// yellow
// const color = '#fa2'
// const bg = '#100'

// blue
const color = '#08f'
const bg = '#011'
// const alt = '#3af'
const hi = '#012'
const shadow = '#000'

const Banner = cxs('header')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  color: white;
  background-color: ${bg};
`
// background-blend-mode: screen;
// background-image: linear-gradient(-30deg, transparent 25%, ${hi});

// background-image: linear-gradient(-60deg, ${blue1}, ${blue});

export default Banner
