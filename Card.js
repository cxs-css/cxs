
import React from 'react'
import Logo from './Logo'
import { colors } from './config'

const Card = () => (
  <div>
    <style dangerouslySetInnerHTML={{ __html: css }} />
    <svg
      viewBox='0 0 128 96'
      width='512'
      height='384'>
      <rect
        width={128}
        height={96}
        fill={colors.blue}
      />
      <g transform='translate(48 32)'>
        <Logo size={32} color={colors.black} />
      </g>
    </svg>
  </div>
)

const css = `
body{
  margin: 0;
}
`

export default Card

