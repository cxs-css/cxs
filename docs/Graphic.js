import React from 'react'
import cxs from 'cxs'
import comp from 'cxs/component'
import Logo from './Logo'
import { dark, blue } from './colors'

cxs(`
  transform: scale(2) rotate(0deg);
`, {
  selector: 'from',
  media: '@keyframes slow-spin'
}).push(`
  transform: scale(2) rotate(360deg);
`, {
  selector: 'to',
  media: '@keyframes slow-spin'
})

const Root = comp('div')`
  color: ${blue};
  // background-color: ${dark};
`

const Spinning = comp(Logo)`
  transform-origin: 50% 50%;
  transform: scale(2) rotate(0deg);
  opacity: .25;
  animation-name: slow-spin;
  animation-timing-function: linear;
  animation-duration: 60s;
  animation-iteration-count: infinite;
`

const Blend = comp('div')`
  position: relative;
  mix-blend-mode: screen;
`

const Ring = comp(props => (
  <svg
    {...props}
    viewBox='0 0 32 32'
    width={props.size}
    height={props.size}
    fill='none'
    stroke='currentcolor'
    strokeWidth={2}
  >
    <circle
      cx={16}
      cy={16}
      r={15.5}
      vectorEffect='non-scaling-stroke'
    />
  </svg>
))`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 50% 50%;
  transform: translate(-58%, -58%);
  opacity: .125;
`

const Graphic = props => (
  <Root {...props}>
    <Blend>
      <Spinning size={320} />
      <Ring size={768}/>
    </Blend>
  </Root>
)

export default Graphic
