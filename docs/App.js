import React from 'react'
import cxs from 'cxs/component'
import Container from './Container'
import Header from './Header'
import About from './About'
import Usage from './Usage'
import CTA from './CTA'
import Footer from './Footer'

const Root = cxs('div')({
  fontFamily: '"Roboto Mono", Menlo, monospace',
  lineHeight: '1.5'
})

const App = props => (
  <Root>
    <Container>
      <Header />
      <About />
      <Usage />
      <CTA />
      <Footer />
    </Container>
  </Root>
)

export default App
