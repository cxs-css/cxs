import React from 'react'
import Flex from './Flex'
import Box from './Box'
import Pre from './Pre'
import Heading from './Heading'
import Text from './Text'
import Live from './Live'

const ReactAPI = () => (
  <section id='react-api'>
    <Box pt={5} pb={5}>
      <Heading mb={3}>React API</Heading>
      <Text mb={4}>
        CXS also includes a React higher order component API similar to <a href='https://styled-components.com'>styled-components</a>.
      </Text>
      <Box mb={3}>
        <Live
          noInline
          code={code.component}
        />
      </Box>
    </Box>
  </section>
)

const code = {
  component: `// import cxs from 'cxs/component'

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

render(<Button>Hello</Button>)
`,

}


export default ReactAPI
