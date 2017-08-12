import React from 'react'
import Banner from './Banner'
import Box from './Box'
import Flex from './Flex'
import Badge from './Badge'
import Tweet from './Tweet'
import Title from './Title'
import Bar from './Bar'
import Text from './Text'
import Button from './Button'
import Pre from './Pre'
import HideMobile from './HideMobile'
import { blue0, blue1, blue } from './colors'
import { version } from '../package.json'

import cxs from 'cxs/component'

const Header = props => (
  <Banner>
    <Flex
      style={{
        height: 64,
        // backgroundColor: 'tomato'
      }}
      align='center'
      w={1}
      pt={3}>
      <Flex ml='auto'>
        <HideMobile>
          <Badge
            href='https://travis-ci.org/jxnblk/cxs'
            image='https://img.shields.io/travis/jxnblk/cxs/master.svg?style=flat-square'
          />
        </HideMobile>
        <Box ml={2} />
        <HideMobile>
          <Badge
            href='https://github.com/siddharthkp/bundlesize'
            image='https://img.shields.io/badge/gzip-0.7%20kb-brightgreen.svg?style=flat-square'
          />
        </HideMobile>
        <Box ml={2} />
        <HideMobile>
          <Badge
            href='https://standardjs.com'
            image='https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square'
          />
        </HideMobile>
        <Box ml={2} />
        <Tweet />
        <Box ml={2} />
        <Badge
          href='https://github.com/jxnblk/cxs'
          image='https://img.shields.io/github/stars/jxnblk/cxs.svg?style=social&label=Star'
        />
      </Flex>
    </Flex>
    <Flex
      column
      pt={6}
      pb={6}
      mt='auto'
      mb='auto'>
      <Bar />
      <Box mb={5} />
      <Title>
        cxs
      </Title>
      <Box mb={3} />
      <Text f={3}>fast af css-in-js in 0.7kb</Text>
      <Flex mt={5} align='center'>
        <Button href='https://github.com/jxnblk/cxs'>GitHub</Button>
        <Box mr={3} />
        <Pre>npm install cxs</Pre>
      </Flex>
    </Flex>
    <Flex
      wrap
      align='baseline'
      w={1}
      pt={3}>
      <Box ml='auto' />
      <Pre>v{version}</Pre>
      <Box mr={3} />
      <Pre>0.7kB</Pre>
    </Flex>
  </Banner>
)

export default Header
