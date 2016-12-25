
import React from 'react'
import Box from './Box'
import Blockquote from './Blockquote'
import Text from './Text'
import Link from './Link'
import { col, colors } from './styles'

export default () => (
  <Box py={4}>
    <Text size={4}>
      cxs-components' API is inspired by <Link
        href='https://github.com/styled-components/styled-components'>
        styled-components
      </Link> but instead of tagged template literals it uses plain JavaScript objects,
      which allow for the use of native JavaScript types without the need to escape embedded CSS.
    </Text>
    <Text>
      For reasons similar to the motivations behind JSX, this is preferred over embedded CSS syntax.
    </Text>
    <Box
      p={3}
      mx='auto'
      style={{
        maxWidth: '48em'
      }}
      my={4}
      color={col(8, 8, 3)}
      border={4}
      borderColor={col(8, 8, 3)}>
      <Blockquote>
        ”Template literals work well for long embedded DSLs. Unfortunately the syntax noise is substantial when you exit in and out of embedded arbitrary ECMAScript expressions with identifiers in scope.”
      </Blockquote>
    </Box>
    <Text>
      cxs-components helps enforce separation of style and business logic by promoting pure functional UI components – i.e. presentational or "dumb" components.
    </Text>
  </Box>
)

