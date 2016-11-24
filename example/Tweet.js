
import React from 'react'
import cxs from 'cxs'

const text = encodeURI(`
cxs: functional CSS for functional UI
`)

const href = 'https://twitter.com/intent/tweet?text=' + text

const Tweet = () => (
  <div className={cx}>
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
  width: 61
})

export default Tweet

