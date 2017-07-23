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
