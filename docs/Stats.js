import React from 'react'
import cxs from 'cxs'
import { format } from 'bytes'
import Pre from './Pre'

class Stats extends React.Component {
  constructor () {
    super()
    this.state = {
      css: '',
      bytes: 0
    }
  }

  componentDidMount () {
    const css = cxs.css
    this.setState({
      css,
      bytes: css.length
    })
  }

  render () {
    const { bytes, css } = this.state

    return (
      <Pre f={0}
        wrap
        title={css}
        onClick={e => alert(css) }>
        cxs generated {format(bytes)} of CSS to render this page.
      </Pre>
    )
  }
}

export default Stats
