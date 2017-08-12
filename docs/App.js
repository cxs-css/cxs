import React from 'react'
import cxs from 'cxs/component'
import Container from './Container'
import Header from './Header'

const Root = cxs('div')({
  fontFamily: '"Roboto Mono", Menlo, monospace',
  lineHeight: '1.5'
})

const App = props => (
  <Root>
    <Container>
      <Header />
    </Container>
  </Root>
)

export default App
