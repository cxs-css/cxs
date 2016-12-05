
import React from 'react'
import cxs from 'cxs'
import Box from './Box'
import Link from './Link'
import { colors } from './config'

export default () => (
  <footer>
    <Box className={cx.root}>
      <Link href='https://github.com/jxnblk/cxs'
        className={cx.link}>
        GitHub
      </Link>
      <Link href='http://jxnblk.com'
        className={cx.link}>
        Made by Jxnblk
      </Link>
    </Box>
  </footer>
)

const cx = {
  root: cxs({
    // textAlign: 'center',
    // display: 'flex',
    // alignItems: 'baseline',
    marginBottom: 48
  }),
  link: cxs({
    marginRight: 16,
    ':last-child': {
      marginRight: 0
    }
  })
}

