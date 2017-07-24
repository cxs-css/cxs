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

cxs(`
  transform: rotate(0deg);
`, {
  selector: 'from',
  media: '@keyframes spin-alt'
}).push(`
  transform: rotate(-360deg);
`, {
  selector: 'to',
  media: '@keyframes spin-alt'
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
  bottom: -50%;
  right: -50%;
  opacity: .125;
`

const Ring2 = comp(Ring)`
outline: 1px solid red;
  bottom: -55%;
  right: -55%;
  transform-origin: 48% 49%;
  animation-name: spin-alt;
  animation-duration: 60s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`

const Vector = comp(props => (
  <svg
    {...props}
    viewBox='0 0 32 2'
    width={props.size}
    height={props.size / 16}
    fill='none'
    stroke='currentcolor'
    strokeWidth={2}
  >
    <path
      d='M0 1 h32'
      vectorEffect='non-scaling-stroke'
    />
  </svg>
))`
  position: absolute;
  bottom: -30%;
  right: -50%;
  opacity: .5;
  transform: rotate(-6deg);
`

const Vector2 = comp(Vector)`
  transform: translate(256px, -512px) rotate(30deg);
`

const Graphic = props => (
  <Root {...props}>
    <Blend>
      <Spinning size={320} />
      <Ring size={768} />
      <Ring2 size={832} />
      <Vector size={2048} />
      <Vector2 size={2048} />
    </Blend>
  </Root>
)

export default Graphic
