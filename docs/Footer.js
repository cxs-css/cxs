import React from 'react'
import Flex from './Flex'
import Box from './Box'
import Logo from './Logo'
import Link from './Link'
import Stats from './Stats'

const Footer = () => (
  <footer>
    <Flex
      align='center'
      wrap
      mt={4}
      pt={4}
      pb={4}>
      <Link
        href='https://github.com/jxnblk/cxs'
        children='GitHub'
      />
      <Link
        href='http://jxnblk.com'
        children='Made by Jxnblk'
      />
      <Box ml='auto' />
      <Stats />
    </Flex>
    <Flex p={4} mt={5} mb={5} align='center' justify='center'>
      <Logo size={32} />
    </Flex>
  </footer>
)

export default Footer
