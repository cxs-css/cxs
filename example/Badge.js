
import React from 'react'
import cxs from 'cxs'

const Badge = ({ href, img }) => (
  <a href={href}
    className={cx.root}>
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

