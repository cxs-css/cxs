
import React from 'react'
import cxs from 'cxs'
import { breakpoints, colors } from './config'
import Box from './Box'
import Tweet from './Tweet'
import Star from './Star'
import Travis from './Travis'
import Standard from './Standard'
import Carbon from './Carbon'

const Header = () => {
  return (
    <header>
      <Box>
        <nav className={cx.nav}>
          <h1 className={cx.title}>Cxs</h1>
          <Travis />
          <Standard />
          <Star />
          <Tweet />
        </nav>
        <Box className={cx.box}>
          <pre className={cx.pre}
            children={`const className = cxs({ color: 'tomato' })`} />
        </Box>
        <div className={cx.footer}>
          <p className={cx.description}>Functional CSS for Functional UI</p>
          <Carbon />
        </div>
      </Box>
    </header>
  )
}

const cx = {
  root: cxs({
    padding: 16,
    [breakpoints[1]]: {
      padding: 48
    }
  }),
  nav: cxs({
    display: 'flex',
    alignItems: 'center',
    color: colors.primary,
    paddingBottom: 8,
    // padding: 48
  }),
  title: cxs({
    margin: 0,
    marginRight: 'auto',
    fontSize: 20,
    textTransform: 'uppercase',
    letterSpacing: '.2em',
    // '@media (min-width: 40em)': {
    //   fontSize: 64
    // }
  }),
  box: cxs({
    display: 'flex',
    alignItems: 'center',
    minHeight: '60vh',
    color: 'white',
    backgroundColor: colors.primary
  }),
  pre: cxs({
    fontFamily: 'Menlo, monospace',
  }),
  footer: cxs({
    display: 'flex',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 48,
  }),
  description: cxs({
    fontSize: 20,
    fontWeight: 'bold',
    margin: 0,
    marginRight: 'auto'
  })
}

export default Header

