
import React from 'react'
import ReactDOM from 'react-dom'
import cxs from '../src' // '../src/optimized'

const App = () => {
  return (
    <div className={cx.root}>
      <h1 className={cx.heading}>Hello cxs</h1>
      <p className={cx.text}>This section is rendered with React, using the cxs module</p>
    </div>
  )
}

const cx = {
  root: cxs({
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 64,
    paddingBottom: 64,
    marginBottom: 96,
    animationName: 'rainbow',
    animationDuration: '16s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    // To do, handle this somehow
    '@keyframes rainbow': {
      '0%': {
        color: 'cyan',
      },
      '50%': {
        color: 'magenta'
      },
      '100%': {
        color: 'cyan',
      }
    }
  }),
  heading: cxs({
    fontSize: 48,
    '@media (min-width: 40em)': {
      fontSize: 64
    },
    '@media (min-width: 56em)': {
      fontSize: 72
    }
  }),
  text: cxs({})
}

ReactDOM.render(<App />, reactApp)

