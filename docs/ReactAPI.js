import React from 'react'
import Flex from './Flex'
import Box from './Box'
import Pre from './Pre'
import Text from './Text'

const ReactAPI = () => (
  <section id='react-api'>
    <Box pt={5} pb={5}>
      <Text f={5} mb={3} bold>React API</Text>
      <Text mb={3}>
        CXS also includes a React higher order component API similar to <a href='https://styled-components.com'>styled-components</a>.
      </Text>
      <Box p={3} mb={3} bg='dark' color='blue'>
        <Pre children={code.component} />
      </Box>
    </Box>
  </section>
)

const code = {
  component: `import cxs from 'cxs/component'

// create a React component
const Button = cxs('button')\`
  display: inline-block;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  padding: 12px;
  border: 0;
  border-radius: 2px;
  color: white;
  background-color: #07c;
\`
`,

}


export default ReactAPI
