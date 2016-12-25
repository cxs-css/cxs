
import React from 'react'
import comp from '../src'

const Ad = (props) => (
  <div {...props}>
    <script
      async
      id='_carbonads_js'
      src='//cdn.carbonads.com/carbon.js?zoneid=1696&serve=CVYD42T&placement=jxnblkcom'
    />
  </div>
)

const CarbonAd = comp(Ad)({
  display: 'inline-block',
  fontSize: 14,
  lineHeight: 1.25,
  maxWidth: 320,
  marginTop: 32,
  marginBottom: 32,
  marginLeft: 16,
  marginRight: 16,
  'a': {
    textDecoration: 'none',
    color: 'inherit'
  },
  span: {
    display: 'block'
  },
  '.carbon-img': {
    float: 'left',
    marginRight: 8
  },
  img: {
    display: 'block'
  },
  '.carbon-text': {
    overflow: 'hidden'
  },
  '.carbon-poweredby': {
    float: 'left',
    marginTop: 4,
    opacity: .5
  }
})

export default CarbonAd

