
import React from 'react'

class TweetButton extends React.Component {
  componentDidMount () {
    const { root } = this.refs
    if (typeof twttr !== 'undefined') {
      twttr.ready(() => {
        twttr.widgets.load(root)
      })
    }
  }

  render (){
    const cx = {
      display: 'inline-block',
      verticalAlign: 'middle',
      height: 28,
      marginRight: 16,
      marginTop: 8,
      marginBottom: 8,
      'iframe': {
        height: 28,
        margin: 0
      }
    }
    return (
      <div ref='root' className={cx}>
        <a href='https://twitter.com/share'
          style={{ minHeight: 28 }}
          data-size='large'
          className='twitter-share-button'
          data-url='http://jxnblk.com/react-cxs/'
          data-text='react-cxs: pass style objects to className in React to generate CSS'
          data-via='jxnblk'>
          Tweet
        </a>
      </div>
    )
  }
}

export default TweetButton

