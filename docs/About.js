import React from 'react'
import Flex from './Flex'
import Box from './Box'
import Text from './Text'
import Column from './Column'

const About = () => (
  <section id='about'>
    <Box pt={5} pb={5}>
      <Text f={4} bold>
        CXS is a minimal CSS-in-JS solution with an API that closely follows the native CSSStyleSheet API to maximize performance and reduce bloat.
      </Text>
    </Box>
    <Flex wrap ml={-3} mr={-3}>
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
  'Deduplication',
  'Dead-code elimination',
  'Framework independent',
  'Media queries',
  'Pseudoclasses',
  'Nested selectors',
  'No CSS files',
  'React component API',
]


export default About
