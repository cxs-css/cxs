
import React from 'react'
import cxs from 'cxs'
import Box from './Box'
import { colors } from './config'

export default () => (
  <Box>
    <h3 className={cx.heading}>Get Started</h3>
    <p className={cx.text}>View the documentation to read more about how to use cxs in your next project.</p>
    <a href='https://github.com/jxnblk/cxs' className={cx.button}>
      GitHub
    </a>
  </Box>
)

const cx = {
  root: cxs({
    // color: '#fff',
    backgroundColor: colors.primary,
    marginTop: 96,
    marginBottom: 96,
  }),
  heading: cxs({
    fontSize: 32,
    margin: 0
    // color: colors.primary
  }),
  text: cxs({
    margin: 0,
    marginBottom: 32
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
    color: '#fff',
    backgroundColor: colors.primary,
    '&:hover': {
      boxShadow: 'inset 0 0 0 999px rgba(0, 0, 0, .25)'
    }
  }),
}

