import React from 'react'
import cxs from 'cxs/component'
import {
  dark,
  blue,
  blue0,
  blue1
} from './colors'
import Graphic from './Graphic'

const Gfx = cxs(Graphic)`
  position: absolute;
  top: 62.5%;
  left: 75%;
  transform: translate(-50%, -50%);
`

const bg = '#011'

const Root = cxs('header')`
  position: relative;
  color: white;
  background-color: ${dark};
  box-shadow: inset 0 0 256px rgba(0, 136, 255, .125);
  background-image: linear-gradient(
    60deg,
    transparent,
    rgba(0, 136, 255, .25)
  );
  overflow: hidden;
`

const Inner = cxs('div')`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`

const Banner = props => (
  <Root>
    <Gfx />
    <Inner {...props} />
  </Root>
)

export default Banner
