
import React from 'react'
import cxs from 'cxs'
import { colors } from './config'
import classnames from './classnames'

export default ({ className, ...props }) => (
  <a {...props} className={classnames(cx, className)} />
)

const cx = cxs({
  fontSize: 14,
  fontWeight: 'bold',
  color: colors.darkblue,
  textDecoration: 'none',
  ':hover': {
    color: colors.blue,
    textDecoration: 'underline'
  }
})

