import React from 'react'
import Flex from './Flex'
import Box from './Box'
import Pre from './Pre'
import Text from './Text'

const Usage = () => (
  <section id='usage'>
    <Box
      pt={5}
      pb={5}
      pl={3}
      pr={3}>
      <Text f={5} mb={3} bold>Getting Started</Text>
      <Box p={2} mb={4} bg='blue1' color='white'>
        <Pre>npm i cxs</Pre>
      </Box>
      <Text f={3} bold>
        Usage
      </Text>
      <Text mb={3}>
        CXS works equally well in plain JavaScript or any UI framework where you can apply a className to an element.
      </Text>
      <Box p={2} bg='blue1' color='white'>
        <Pre children={code.basic} />
      </Box>
    </Box>
  </section>
)

const code = {
  basic: `import cxs from 'cxs'

// create a CXS rule which is inserted into a style tag
const rule = cxs('color: tomato;')

// get a classname string to apply to any element
rule.toString()`,
}


export default Usage
