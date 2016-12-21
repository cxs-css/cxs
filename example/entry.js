
import React from 'react'
import ReactDOM from 'react-dom'
import cxs from 'cxs/monolithic'
import { colors } from './config'
import App from './App'
import CssOutput from './CssOutput'


const app = document.getElementById('app')
const css = document.getElementById('css')

cxs('*', { boxSizing: 'border-box' })

cxs('body', {
  margin: 0,
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  lineHeight: 1.5,
  color: colors.black
})

ReactDOM.render(<App />, app)

ReactDOM.render(<CssOutput />, css)

