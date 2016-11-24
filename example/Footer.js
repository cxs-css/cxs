
import React from 'react'
import cxs from 'cxs'
import Box from './Box'
import Link from './Link'

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
    display: 'flex',
    alignItems: 'baseline',
  }),
  link: cxs({
    marginRight: 16
  })
}

