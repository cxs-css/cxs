import React from 'react'
import Flex from './Flex'
import Box from './Box'
import Pre from './Pre'
import Heading from './Heading'
import Text from './Text'
import Live from './Live'
import Bar from './Bar'

const ReactAPI = () => (
  <section id='react-api'>
    <Box pt={5} pb={5}>
      <Bar mb={4} />
      <Heading>React API</Heading>
      <Text mb={4}>
        cxs also includes a React higher order component API similar to <a href='https://styled-components.com'>styled-components</a>.
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
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  padding: 16px;
  border: 0;
  border-radius: 2px;
  color: white;
  background-color: #08f;
\`

render(<Button>Hello</Button>)
`,

}


export default ReactAPI
