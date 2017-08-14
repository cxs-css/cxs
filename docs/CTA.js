import React from 'react'
import Flex from './Flex'
import Box from './Box'
import Heading from './Heading'
import Text from './Text'
import Button from './Button'

const CTA = () => (
  <section id='cta'>
    <Box mt={6} mb={6}>
      <Heading>
        Documentation
      </Heading>
      <Text mb={4}>
        Read the documentation on GitHub to learn more about using cxs.
      </Text>
      <Button
        href='https://github.com/jxnblk/cxs'
        children='GitHub'
      />
    </Box>
  </section>
)

export default CTA
