import React from 'react'
import Flex from './Flex'
import Box from './Box'
import Text from './Text'

const CTA = () => (
  <section id='cta'>
    <Text>
      Read the documentation on GitHub to learn more about using CXS.
    </Text>
    <a
      href='https://github.com/jxnblk/cxs'
      children='GitHub'
    />
  </section>
)

export default CTA
