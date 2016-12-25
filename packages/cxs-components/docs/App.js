
import React from 'react'
import {
  compose,
  withProps,
  withState
} from 'recompose'
import Page from './Page'
import Header from './Header'
import Features from './Features'
import Intro from './Intro'
import Usage from './Usage'
import Footer from './Footer'

const App = (props) => {
  return (
    <Page>
      <Header {...props} />
      <Features />
      <Intro />
      <Usage />
      <Footer />
    </Page>
  )
}

const hoc = compose(
  withState('count', 'setCount', 0),
  withProps(({ setCount }) => ({
    increment: () => setCount(n => n + 1),
    decrement: () => setCount(n => n - 1)
  }))
)

export default hoc(App)

