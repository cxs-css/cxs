
import React from 'react'
import Box from './Box'
import Link from './Link'
import Flex from './Flex'
import Triangle from './Triangle'
import { InlineList } from './List'
import { col } from './styles'

export default () => (
  <footer>
    <Box py={6}>
      <Flex>
        <Triangle
          bottom
          right
        />
      </Flex>
      <Box py={3}>
        <InlineList>
          <Link href='https://github.com/jxnblk/cxs-components'>
            GitHub
          </Link>
          <Link href='http://jxnblk.com'>
            Jxnblk
          </Link>
        </InlineList>
      </Box>
      <Flex>
        <Box mx='auto' />
        <Triangle
          top
          left
          color={col(4, 8, 4)}
        />
      </Flex>
    </Box>
  </footer>
)

