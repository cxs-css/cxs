
import React from 'react'
import cxs from 'cxs/lite'
import { breakpoints } from './config'
import classnames from './classnames'

export default ({ className, ...props }) => (
  <div {...props} className={classnames(cx, className)} />
)

const cx = cxs({
  padding: 16,
  [breakpoints[1]]: {
    padding: 48
  }
})

