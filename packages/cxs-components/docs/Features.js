
import React from 'react'
import Box from './Box'
import H2 from './H2'
import List from './List'
import Bar from './Bar'
import { col } from './styles'

export default () => (
  <Box py={4}>
    <Bar color={col(3, 8, 4)} />
    <H2>Features</H2>
    <List bold size={4}>
      <span>7 KB</span>
      <span>Simple API to quickly create UI components</span>
      <span>Performant, functional CSS-in-JS</span>
      <span>Uses native JavaScript objects</span>
      <span>Avoids style collisions with hashed class selectors</span>
      <span>Supports pseudoclasses, media queries, and keyframes</span>
    </List>
  </Box>
)

