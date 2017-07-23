import React from 'react'
import Flex from './Flex'
import Box from './Box'
import Text from './Text'
import Column from './Column'

const About = () => (
  <section id='about'>
    <Box
      pl={3}
      pr={3}
      pt={5}
      pb={5}
      color='blue1'>
      <Text f={4} bold>
        CXS is a minimal CSS-in-JS solution that uses an API that closely follows the native CSSStyleSheet API to maximize performance and reduce bloat.
      </Text>
    </Box>
    <Flex wrap color='blue1'>
      {features.map(feat => (
        <Column key={feat} p={3}>
          <Text bold>
            {feat}
          </Text>
        </Column>
      ))}
    </Flex>
  </section>
)

const features = [
  '1 KB',
  'Zero dependencies',
  'High performance',
  'Style encapsulation',
  'Deduplicates repeated styles',
  'Dead-code elimination',
  'Framework independent',
  'Media queries',
  'Pseudoclasses',
  'Nested selectors',
  'Avoid maintaining separate stylesheets',
  // 'Use plain CSS strings',
  'React component API',
]


export default About
