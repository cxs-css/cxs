
# cxs

fast af css-in-js in 0.7kb

http://jxnblk.com/cxs

[![Build Status][b]](https://travis-ci.org/jxnblk/cxs)
[![Coverage][cov]](https://codecov.io/github/jxnblk/cxs)
[![js-standard-style][std]](http://standardjs.com/)
[![0.7kb gzip][kb]](https://github.com/siddharthkp/bundlesize)

[b]: https://img.shields.io/travis/jxnblk/cxs/master.svg?style=flat-square
[std]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[kb]: https://img.shields.io/badge/gzip-0.7%20kb-brightgreen.svg?style=flat-square
[cov]: https://img.shields.io/codecov/c/github/jxnblk/cxs.svg?style=flat-square

```js
const className = cxs({ color: 'tomato' })
```

cxs is a minimal css-in-js solution that uses an atomic css approach to maximize performance and deduplication

## Features

- 0.7 KB
- Zero dependencies
- High performance
- Style encapsulation
- Deduplicates repeated styles
- Dead-code elimination
- Framework independent
- Media queries
- Pseudoclasses
- Nesting
- No CSS files
- No tagged template literals
- Optional [React component](#react-components) API


## Install

```sh
npm install cxs
```

## Usage

cxs works with any framework, but this example uses React for demonstration purposes.

```js
import React from 'react'
import cxs from 'cxs'

const Box = (props) => {
  return (
    <div {...props} className={className} />
  )
}

const className = cxs({
  padding: '32px',
  backgroundColor: 'tomato'
})

export default Box
```

### Pseudoclasses

```js
const className = cxs({
  color: 'tomato',
  ':hover': {
    color: 'black'
  }
})
```

### Media Queries

```js
const className = cxs({
  fontSize: '32px',
  '@media screen and (min-width: 40em)': {
    fontSize: '48px'
  }
})
```

### Child Selectors

```js
const className = cxs({
  color: 'black',
  ' > a': {
    color: 'tomato'
  }
})
```


### Static/Server-Side Rendering

For Node.js environments, use the `css()` method to return the static CSS string *after* rendering a view.

```js
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import cxs from 'cxs'
import App from './App'

const html = ReactDOMServer.renderToString(<App />)
const css = cxs.css()

const doc = `<!DOCTYPE html>
<style>${css}</style>
${html}
`

// Reset the cache for the next render
cxs.reset()
```

Note: cxs does not currently have a mechanism for rehydrating styles on the client, so use with caution in universal JavaScript applications.


## React Components

cxs also has an alternative higher order component API for creating styled React components, similar to the [styled-components][sc] API.

```js
import cxs from 'cxs/component'

const Heading = cxs('h1')({
  margin: 0,
  fontSize: '32px',
  lineHeight: 1.25
})
```

### Extending components

To extend a cxs component, pass it to the component creator function.

```js
const Button = cxs('button')({
  color: 'white',
  backgroundColor: 'blue'
})

const TomatoButton = cxs(Button)({
  backgroundColor: 'tomato'
})
```

### Other components

Any component can be passed to cxs to add styles.

```js
import { Link } from 'react-router'

const MyLink = cxs(Link)({
  color: 'tomato'
})
```

Note: components must accept `className` as a prop to work with cxs.


### Functional styles

cxs components can also handle dynamic styling based on props by passing a function as an argument

```js
const Heading = cxs('h1')(props => ({
  color: props.color
}))
```

#### Removing style props

To remove style props from the rendered HTML element,
use the [`prop-types`][pt] package to define `propTypes` on a component.
cxs/component will remove any prop that matches a key from the `propTypes` object.

```js
import cxs from 'cxs/component'
import PropTypes from 'prop-types'

const Heading = cxs('h2')(props => ({
  fontSize: props.big ? '48px' : '32px'
}))

Heading.propTypes = {
  big: PropTypes.bool
}
```

### styled-system

Style utility functions, like those in [styled-system][s2], can be used with cxs/component.

```js
import cxs from 'cxs/component'
import {
  space,
  color
} from 'styled-system'

const Heading = cxs('h2')(space, color)
```

### Theming

Theming is supported with the `<ThemeProvider>` component.

```jsx
import React from 'react'
import ThemeProvider from 'cxs/ThemeProvider'
import theme from './theme'

const App = props => (
  <ThemeProvider theme={theme}>
    <Heading>
      Hello
    </Heading>
  </ThemeProvider>
)
```

```jsx
import cxs from 'cxs/component'

const Heading = cxs('h2')(props => ({
  fontSize: props.theme.fontSizes[4] + 'px',
  color: props.theme.blue
}))
```

## API

### `cxs(...styles)`

Accepts styles objects or functions that return style objects and returns a className string.

### `cxs.css()`

Returns the rendered CSS string for static and server-side rendering.

### `cxs.reset()`

Resets the cache for server-side rendering

### `cxs/component`

A [styled-components][sc]-like API for creating React components with cxs.

---

### Vendor prefixes

cxs **does not** handle vendor prefixing to keep the module size at a minimum.

### Previous Versions

For previous versions of cxs, see the [v3 branch][v3] or [v4 branch][v4]

[sc]: https://www.styled-components.com (styled-components)
[pt]: https://www.npmjs.com/package/prop-types

[s2]: https://github.com/jxnblk/styled-system
[v3]: https://github.com/jxnblk/cxs/tree/v3
[v4]: https://github.com/jxnblk/cxs/tree/v4

[MIT License](LICENSE.md)
