
import React from 'react'
import cxs from 'cxs'
import classnames from './classnames'

const Badge = ({ href, img, className }) => (
  <a href={href}
    className={classnames(cx.root, className)}>
    <img
      className={cx.img}
      src={img} />
  </a>
)

const cx = {
  root: cxs({
    display: 'inline-block',
    // width: 90,
  }),
  img: cxs({
    display: 'block'
  })
}

export default Badge

