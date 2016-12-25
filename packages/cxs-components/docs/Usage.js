
import React from 'react'
import H2 from './H2'
import Pre from './Pre'
import Bar from './Bar'
import { col } from './styles'

export default () => (
  <section id='usage'>
    <Bar color={col(1, 8, 4)} />
    <H2>Usage</H2>
    <Pre
      children={`
import React from 'react'
import comp from 'cxs-components'

const Box = comp('div')({
  padding: 32
})

const TomatoBox = comp(Box)({
  backgroundColor: 'tomato'
})

const App = () => (
  <div>
    <Box>
      Hello
    </Box>
    <TomatoBox>
      Tomato
    </TomatoBox>
  </div>
)`} />
  </section>
)

