
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { cxs } from '..'

const div = document.getElementById('app')

ReactDOM.render(<App />, div)

console.log(cxs.css)
