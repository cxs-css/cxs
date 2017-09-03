import React from 'react'
import cxs from 'cxs'
import { format } from 'bytes'
import Pre from './Pre'

class Stats extends React.Component {
  render () {
    const css = cxs.css()

    return (
      <Pre f={0}
        wrap
        title={css}>
        cxs generated {format(css.length)} of CSS to render this page.
      </Pre>
    )
  }
}

export default Stats
