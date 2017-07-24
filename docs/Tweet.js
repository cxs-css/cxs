import React from 'react'

class Tweet extends React.Component {
  componentDidMount () {
    if (typeof twttr !== 'undefined') {
      twttr.widgets.load(
        this.root
      )
    }
  }

  render () {
    return (
      <a
        ref={ref => this.root = ref}
        className='twitter-share-button'
        href='https://twitter.com/intent/tweet?text=fast%20af%20css-in-js%20in%201kb&via=jxnblk'
        children='Tweet'
      />
    )
  }
}

export default Tweet
