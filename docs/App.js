import React from 'react'
import cxs from 'cxs'
import Header from './Header'

cxs(`box-sizing:border-box`, { selector: '*' })
cxs(`margin:0`, { selector: 'body' })

const App = props => (
  <div>
    <Header />
  </div>
)

export default App
