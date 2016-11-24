
import React from 'react'
import cxs from 'cxs'

export default props => (
  <iframe
    {...props}
    src='//ghbtns.com/github-btn.html?user=jxnblk&repo=cxs&type=star&count=true'
    frameBorder='0'
    scrolling='0'
    width='96px'
    height='20px'
    className={cx}
  />
)

const cx = cxs({
  width: 96,
  height: 20
})

