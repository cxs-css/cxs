
import React from 'react'

const M = 'M'
const L = 'L'
const a0 = 8
const a1 = 24

const Lambda = ({
  size = 128,
  strokeWidth = 2,
  color = 'currentcolor',
  ...props
}) => (
  <svg
    {...props}
    viewBox='0 0 32 32'
    width={size}
    height={size}
    fill='none'
    stroke={color}
    strokeWidth={strokeWidth}
  >
    <circle
      cx={16} cy={16} r={14} />
    <path
      d={[
        M, a0, a0,
        L, a1, a1,
        M, 16, 16,
        L, a0, a1
      ].join(' ')} />
  </svg>
)

export default Lambda

