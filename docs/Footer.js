import React from 'react'
import Flex from './Flex'
import Box from './Box'
import Logo from './Logo'
import Link from './Link'

const Footer = () => (
  <footer>
    <Flex p={4} mt={5} align='center' justify='center'>
      <Logo size={64} />
    </Flex>
    <Flex align='center'
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
    </Flex>
  </footer>
)

export default Footer
