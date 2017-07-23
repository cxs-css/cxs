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
import { blue0, blue1, blue } from './colors'
import { version } from '../package.json'

const Header = props => (
  <Banner>
    <Flex align='center' w={1} p={3}>
      <Logo size={32} color={blue} />
      <Flex ml='auto'>
        <Tweet />
        <Box ml={2} />
        <HideMobile>
          <Badge
            href='https://travis-ci.org/jxnblk/cxs'
            image='https://img.shields.io/travis/jxnblk/cxs/master.svg'
          />
        </HideMobile>
        <Box ml={2} />
        <HideMobile>
          <Badge
            href='https://github.com/siddharthkp/bundlesize'
            image='https://img.shields.io/badge/gzip-1%20kb-brightgreen.svg'
          />
        </HideMobile>
        <Box ml={2} />
        <HideMobile>
          <Badge
            href='https://standardjs.com'
            image='https://img.shields.io/badge/code_style-standard-brightgreen.svg'
          />
        </HideMobile>
        <Box ml={2} />
        <Badge
          href='https://github.com/jxnblk/cxs'
          image='https://img.shields.io/github/stars/jxnblk/cxs.svg?style=social&label=Star'
        />
      </Flex>
    </Flex>
    <Flex
      column
      mt='auto'
      mb='auto'>
      <Title>
        CXS
      </Title>
      <Text>fast af css-in-js in 1kb</Text>
      <Box mb={5} />
    </Flex>
    <Flex
      wrap
      align='baseline'
      w={1}
      p={3}>
      <Pre>
        v{version}
      </Pre>
      <Box ml='auto' />
      <Pre>
        npm i cxs
      </Pre>
    </Flex>
  </Banner>
)

export default Header
