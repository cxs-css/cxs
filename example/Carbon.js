
import React from 'react'
import cxs from 'cxs/lite'

class Carbon extends React.Component {
  componentDidMount () {
    const script = document.createElement('script')
    script.src = '//cdn.carbonads.com/carbon.js?zoneid=1696&serve=CVYD42T&placement=jxnblkcom'
    script.id = '_carbonads_js'
    this.root.appendChild(script)
  }

  render () {
    return (
      <div {...this.props} className={cx}>
        <div ref={r => { this.root = r }} />
      </div>
    )
  }
}

const cx = cxs({
  width: 320,
  height: 118,
  '#carbonads': {
    fontSize: 12,
    lineHeight: 1.25,
    textAlign: 'left',
    maxWidth: 320,
    '> span': {
      display: 'block'
    },
    'a': {
      textDecoration: 'none',
      color: 'inherit',
      ':hover': {}
    },
    '.carbon-wrap': {
      display: 'flex',
      alignItems: 'flex-start'
    },
    '.carbon-img': {
      marginRight: 8
    },
    '.carbon-poweredby': {
      float: 'right',
      textAlign: 'right',
      opacity: 0.5
    }
  }
})

export default Carbon

