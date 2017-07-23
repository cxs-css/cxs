
import React from 'react'
import cxs from 'cxs'
import { breakpoints, colors } from './config'
import Box from './Box'
import Tweet from './Tweet'
import Star from './Star'
import Travis from './Travis'
import Standard from './Standard'
import Carbon from './Carbon'
import Logo from './Logo'

const Header = () => {
  return (
    <header>
      <Box className={cx.root}>
        <nav className={cx.nav}>
          <h1 className={cx.title}>CXS</h1>
          <Travis className={cx.navLink} />
          <Standard className={cx.navLink} />
          <Star className={cx.navLink} />
          <Tweet className={cx.navLink} />
        </nav>
        <Box className={cx.box}>
          <div className={cx.inner}>
            <Logo size={96} />
            <p className={cx.tagline}>Functional CSS for Functional UI</p>
            <pre
              className={cx.pre}
              children={`const className = cxs({ color: 'cyan' })`} />
          </div>
        </Box>
        <div className={cx.footer}>
          <div className={cx.about}>
            <p className={cx.description}>
              CXS is a functional CSS-in-JS solution that uses atomic styles to maximize deduplication and help with dead code elimination.
            </p>
            <pre
              className={cx.pre}
              children={`npm i cxs`} />
          </div>
          <Carbon />
        </div>
      </Box>
    </header>
  )
}

const cx = {
  root: cxs({
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
  box: cxs({
    display: 'flex',
    alignItems: 'center',
    minHeight: '60vh',
    backgroundColor: colors.primary,
    [breakpoints[2]]: {
      fontSize: 40
    }
  }),
  inner: cxs({
    maxWidth: '100%'
  }),
  title: cxs({
    fontSize: 16,
    fontWeight: 600,
    margin: 8,
    marginRight: 'auto',
    textTransform: 'uppercase',
    letterSpacing: '.2em'
  }),
  tagline: cxs({
    fontSize: 24,
    fontWeight: 600,
    margin: 0,
    [breakpoints[2]]: {
      fontSize: 40
    }
  }),
  pre: cxs({
    fontFamily: 'Menlo, monospace',
    fontSize: 14,
    whiteSpace: 'pre-wrap',
    maxWidth: '100%',
    overflow: 'auto',
    margin: 0
  }),
  footer: cxs({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 48
  }),
  about: cxs({
    marginRight: 'auto',
    marginTop: 16,
    marginBottom: 16
  }),
  description: cxs({
    fontSize: 20,
    fontWeight: 600,
    margin: 0,
    marginBottom: 24,
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
