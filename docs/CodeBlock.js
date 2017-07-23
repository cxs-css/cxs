import React from 'react'
import cxs from 'cxs/component'
import Pre from './Pre'

const CodeBlock = cxs(Pre)`
  border-radius: 3px;
  box-shadow: 0 0 8px rgba(0, 0, 0, .25);
`

CodeBlock.defaultProps = {
  p: 3,
  mb: 4,
  color: 'blue',
  bg: 'dark'
}

export default CodeBlock
