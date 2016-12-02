
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
      <Box className={cx.root}>
        <nav className={cx.nav}>
          <h1 className={cx.title}>Cxs</h1>
          <Travis className={cx.navLink} />
          <Standard className={cx.navLink} />
          <Star className={cx.navLink} />
          <Tweet className={cx.navLink} />
        </nav>
        <Box className={cx.box}>
          <p className={cx.tagline}>Functional CSS for Functional UI</p>
          <pre className={cx.pre}
            children={`const className = cxs({ color: 'tomato' })`} />
        </Box>
        <div className={cx.footer}>
          <p className={cx.description}>
            Cxs is a functional CSS-in-JS solution that uses atomic styles to maximize deduplication and help with dead code elimination.
          </p>
          <Carbon />
        </div>
      </Box>
    </header>
  )
}

const cx = {
  root: cxs({
    color: colors.primary,
    // paddingTop: 16
  }),
  nav: cxs({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: -8,
    marginLeft: -8,
    marginRight: -8,
    paddingBottom: 8
  }),
  title: cxs({
    fontSize: 20,
    fontWeight: 600,
    margin: 8,
    marginRight: 'auto',
    textTransform: 'uppercase',
    letterSpacing: '.2em',
  }),
  tagline: cxs({
    fontSize: 20,
    fontWeight: 600,
    marginRight: 'auto',
    [breakpoints[1]]: {
      fontSize: 32
    }
  }),
  box: cxs({
    display: 'flex',
    alignItems: 'center',
    minHeight: '60vh',
    color: '#fff',
    backgroundColor: colors.primary,
  }),
  pre: cxs({
    fontFamily: 'Menlo, monospace',
    fontSize: 20,
    overflow: 'auto'
  }),
  footer: cxs({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 48,
  }),
  description: cxs({
    fontSize: 20,
    fontWeight: 600,
    marginTop: 24,
    marginBottom: 24,
    marginRight: 'auto',
    maxWidth: 768,
    [breakpoints[2]]: {
      fontSize: 24
    }
  }),
  navLink: cxs({
    margin: 8
  })
}

export default Header

