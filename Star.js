
import React from 'react'
import cxs from 'cxs'
import classnames from './classnames'

export default ({ className, ...props }) => (
  <iframe
    {...props}
    src='//ghbtns.com/github-btn.html?user=jxnblk&repo=cxs&type=star&count=true'
    frameBorder='0'
    scrolling='0'
    width='96px'
    height='20px'
    className={classnames(cx, className)}
  />
)

const cx = cxs({
  width: 96,
  height: 20
})

