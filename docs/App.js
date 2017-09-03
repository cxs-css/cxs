import React from 'react'
import cxs from 'cxs/component'
import ThemeProvider from 'cxs/ThemeProvider'
import theme from './theme'
import Container from './Container'
import Header from './Header'
import About from './About'
import Usage from './Usage'
import CTA from './CTA'
import Footer from './Footer'

const Root = cxs('div')(props => ({
  fontFamily: '"Roboto Mono", Menlo, monospace',
  color: typeof props.theme,
  lineHeight: 1.5
}))

const App = props => (
  <ThemeProvider theme={theme}>
    <Root>
      <Container>
        <Header />
        <About />
        <Usage />
        <CTA />
        <Footer />
      </Container>
    </Root>
  </ThemeProvider>
)

export default App
