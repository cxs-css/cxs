import React from 'react'
import cxs from 'cxs/component'

const Link = cxs('a')`
  display: block;
  text-decoration: none;
  color: inherit;
`

const Img = cxs('img')`
  display: block;
  margin: 0;
`

const Badge = ({
  href,
  image
}) => (
  <Link href={href}>
    <Img src={image} />
  </Link>
)

export default Badge
