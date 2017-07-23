import React from 'react'
import Flex from './Flex'
import Box from './Box'
import Pre from './Pre'
import Text from './Text'

const Usage = () => (
  <section id='usage'>
    <Box pt={5} pb={5}>
      <Text f={5} mb={3} bold>Getting Started</Text>
      <Box p={3} mb={4} bg='dark' color='blue'>
        <Pre>npm i cxs</Pre>
      </Box>
      <Text f={3} bold>
        Usage
      </Text>
      <Text mb={3}>
        CXS works equally well in plain JavaScript or any UI framework where you can apply a className to an element.
      </Text>
      <Box p={3} mb={3} bg='dark' color='blue'>
        <Pre children={code.import} />
      </Box>
      <Text mb={3}>
        Pass a CSS declaration block to the cxs function to create a rule object.
      </Text>
      <Box p={3} mb={3} bg='dark' color='blue'>
        <Pre children={code.basic} />
      </Box>
      <Text mb={3}>
        Get the generated classname to apply to any element.
      </Text>
      <Box p={3} mb={3} bg='dark' color='blue'>
        <Pre children={code.classname} />
      </Box>
      <Text mb={3}>
        Use the chainable rule methods to create styles for pseudoclasses, child elements, or media queries.
      </Text>
      <Box p={3} mb={3} bg='dark' color='blue'>
        <Pre children={code.chaining} />
      </Box>
    </Box>
  </section>
)

const code = {
  import: `import cxs from 'cxs'`,
  basic: `const rule = cxs('color: tomato;')`,
  classname: `const className = rule.toString()`,
  chaining: `const rule = cxs('color: tomato')
  .hover('color: black')
  .media('@media screen and (min-width: 40em)')('font-size: 32px')`,
}


export default Usage
