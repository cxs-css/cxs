import React from 'react'
import cxs from 'cxs/component'
import Box from './Box'

const Root = cxs('header')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  color: white;
  background-color: #111;
`

const Title = cxs('h1')`
  font-size: 48px;
  text-transform: uppercase;
  letter-spacing: .5em;
  margin-right: -.5em;
  margin-top: auto;
  margin-bottom: auto;
`
  .media('@media screen and (min-width:40em)')`
    font-size: 64px;
  `

const Top = cxs('div')`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 4px;
`

const Bottom = cxs('div')`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 4px;
`

const Header = props => (
  <Root>
    <Top>
      <Box ml='auto'>
        Derp
      </Box>
    </Top>
    <Title>
      CXS
    </Title>
    <Bottom>
      fast af css-in-js
    </Bottom>
  </Root>
)

export default Header
