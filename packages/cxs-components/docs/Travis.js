
import React from 'react'
import comp from '../src'

const Img = comp('img')({
  display: 'block'
})

const Travis = () => (
  <a href='https://travis-ci.org/jxnblk/cxs-components'>
    <Img
      src='https://travis-ci.org/jxnblk/cxs-components.svg'
      alt='Build Status' />
  </a>
)

export default Travis

