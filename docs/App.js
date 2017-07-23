import React from 'react'
import cxs from 'cxs'
import Header from './Header'
import About from './About'
import Usage from './Usage'
import ReactAPI from './ReactAPI'
import CTA from './CTA'
import Footer from './Footer'
import Container from './Container'
import { dark } from './colors'

import Title from './Title'

cxs(`box-sizing:border-box`, { selector: '*' })
cxs(`
  font-family: 'Roboto Mono', 'SF Mono', Menlo, monospace;
  line-height: 1.5;
  margin:0;
  color: ${dark};
`, { selector: 'body' })

const App = props => (
  <div>
    <Header />
    <Container pl={3} pr={3}>
      <About />
      <Usage />
      <ReactAPI />
      <CTA />
      <Footer />
    </Container>
  </div>
)

export default App
