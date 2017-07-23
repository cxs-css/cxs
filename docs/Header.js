import React from 'react'
import Banner from './Banner'
import Box from './Box'
import Flex from './Flex'
import Badge from './Badge'
import Tweet from './Tweet'
import Title from './Title'
import Logo from './Logo'
import Text from './Text'
import Pre from './Pre'
import HideMobile from './HideMobile'
// import { blue0, blue1, blue } from './colors'
import { version } from '../package.json'

const Header = props => (
  <Banner>
    <Flex w={1} p={3}>
      <Flex ml='auto'>
        <Tweet />
        <Box mx={1} />
        <HideMobile>
          <Badge
            href='https://travis-ci.org/jxnblk/cxs'
            image='https://img.shields.io/travis/jxnblk/cxs/master.svg'
          />
        </HideMobile>
        <Box mx={1} />
        <HideMobile>
          <Badge
            href='https://github.com/siddharthkp/bundlesize'
            image='https://img.shields.io/badge/gzip-1%20kb-brightgreen.svg'
          />
        </HideMobile>
        <Box mx={1} />
        <HideMobile>
          <Badge
            href='https://standardjs.com'
            image='https://img.shields.io/badge/code_style-standard-brightgreen.svg'
          />
        </HideMobile>
        <Box mx={1} />
        <Badge
          href='https://github.com/jxnblk/cxs'
          image='https://img.shields.io/github/stars/jxnblk/cxs.svg?style=social&label=Star'
        />
      </Flex>
    </Flex>
    <Flex
      column
      align='center'
      mt='auto'
      mb='auto'>
      <Logo size={64} />
      <Title>
        CXS
      </Title>
      <Box mb={5} />
    </Flex>
    <Flex
      wrap
      align='baseline'
      w={1}
      mb={3}
      p={3}>
      <Text bold>
        Fast af css-in-js in 1kb
      </Text>
      <Box ml='auto' />
      <Pre>
        v{version}
      </Pre>
      <Box mx={2} />
      <Pre>
        npm i cxs
      </Pre>
    </Flex>
  </Banner>
)

export default Header
