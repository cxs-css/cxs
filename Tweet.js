
import React from 'react'
import cxs from 'cxs/lite'
import classnames from './classnames'

const text = encodeURI(`
cxs: functional CSS for functional UI
`)

const href = 'https://twitter.com/intent/tweet?text=' + text

const Tweet = ({ className }) => (
  <div className={classnames(cx, className)}>
    <a
      className='twitter-share-button'
      href={href}
      data-via='jxnblk'
      children='Tweet'
    />
  </div>
)

const cx = cxs({
  fontSize: 12,
  width: 61,
  height: 20
})

export default Tweet

