
import React from 'react'
import H1 from './H1'
import H2 from './H2'
import Box from './Box'
import Pre from './Pre'
import Button from './Button'
import Flex, { FlexWrap } from './Flex'
import Travis from './Travis'
import Tweet from './Tweet'
import GitHub from './GitHub'
import CarbonAd from './CarbonAd'
import Triangle from './Triangle'
import { col } from './styles'

export default ({
  count,
  increment,
  decrement
}) => {
  const color = col(Math.abs(count) % 8, 8, 4)
  return (
    <header>
      <Flex>
        <Box mx='auto' />
        <Triangle
          top
          right
        />
      </Flex>
      <Box py={4} my={3}>
        <H1 mb={4}>
          cxs-components
        </H1>
        <H2>
          Styled UI component primitives for React - built with cxs
        </H2>
      </Box>
      <Pre>npm install cxs-components</Pre>
      <FlexWrap>
        <Travis />
        <Box mx='auto' />
        <Tweet />
        <Box mx='auto' />
        <GitHub />
        <Box mx='auto' />
        <CarbonAd />
      </FlexWrap>
      <Triangle
        bottom
        left
        color={col(4, 8, 4)}
      />
    </header>
  )
}

