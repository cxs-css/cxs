
import React from 'react'
import cxs from 'cxs'
import Box from './Box'
import { colors } from './config'

export default () => (
  <Box className={cx.root}>
    <h3 className={cx.heading}>Get Started</h3>
    <a href='https://github.com/jxnblk/cxs' className={cx.button}>
      GitHub
    </a>
  </Box>
)

const cx = {
  root: cxs({
    textAlign: 'center',
    marginTop: 96,
    marginBottom: 96,
  }),
  heading: cxs({
    fontSize: 32,
    fontWeight: 600,
    margin: 0,
    marginBottom: 32,
  }),
  button: cxs({
    fontWeight: 'bold',
    textDecoration: 'none',
    display: 'inline-block',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 8,
    color: colors.black,
    backgroundColor: colors.primary,
    ':hover': {
      color: '#fff',
      backgroundColor: colors.darkblue,
      // boxShadow: 'inset 0 0 0 999px rgba(0, 0, 0, .25)'
    }
  }),
}

