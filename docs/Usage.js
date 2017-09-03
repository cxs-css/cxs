import React from 'react'
import Flex from './Flex'
import Box from './Box'
import Pre from './Pre'
import Heading from './Heading'
import Text from './Text'
import Bar from './Bar'

const Usage = () => (
  <section id='usage'>
    <Box pt={5} pb={5}>
      <Bar mb={4} />
      <Heading>Getting Started</Heading>
      <Pre>npm i cxs</Pre>
      <Heading>
        Usage
      </Heading>
      <Pre children={example} />
    </Box>
  </section>
)

const example = `const className = cxs({
  color: 'tomato'
})`

const code = {
  import: `import cxs from 'cxs'`,
  basic: `const rule = cxs('color: tomato;')`,
  classname: `const className = rule.toString()`,
  chaining: `const rule = cxs('color: tomato')
  .hover('color: black')
  .media('@media screen and (min-width: 40em)')('font-size: 32px')`,
}


export default Usage
