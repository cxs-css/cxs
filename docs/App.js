import React from 'react'
import cxs from 'cxs'
import Header from './Header'
import About from './About'
import Usage from './Usage'
import ReactAPI from './ReactAPI'
import Footer from './Footer'
import Container from './Container'

cxs(`box-sizing:border-box`, { selector: '*' })
cxs(`margin:0`, { selector: 'body' })

const App = props => (
  <div>
    <Header />
    <Container>
      <About />
      <Usage />
      <ReactAPI />
      <Footer />
    </Container>
  </div>
)

export default App
