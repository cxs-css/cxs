
# ϟ CXS

[![Build Status](https://travis-ci.org/jxnblk/cxs.svg?branch=master)](https://travis-ci.org/jxnblk/cxs)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

High performance, lightweight CSS-in-JS

```js
const style = cxs(`color: tomato`)
```

CXS is a minimal CSS-in-JS solution that uses
an API that closely follows the native CSSStyleSheet API
to maximize performance and reduce bloat.

## Features

- < 1.5KB
- Deduplicates repeated styles
- Dead-code elimination
- Framework independent
- CSS-in-JS
- Media queries
- Pseudoclasses
- Nested selectors
- Avoid maintaining separate stylesheets
- Use plain CSS strings

## Install

```sh
npm install cxs
```

## Usage

CXS works with any framework, but this example uses React for demonstration purposes.

```js
import React from 'react'
import cxs from 'cxs'

const Box = (props) => {
  return (
    <div {...props} className={className} />
  )
}

const className = cxs(`
  padding: 32px;
  backgroundColor: tomato;
`)

export default Box
```

### Pseudoclasses

```js
cxs('color: tomato')
  .hover('color: red')
```

### Media Queries

```js
cxs('color: tomato')
  .media('@media (min-width: 40em)', 'color: red')
})
```

### Descendant Selectors

```js
cxs('color: tomato', ' > h1')
```

### Server-Side Rendering

To use CXS in server environments, use the `css` getter to get the static CSS string *after* rendering a view.

```js
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import cxs from 'cxs'
import App from './App'

const html = ReactDOMServer.renderToString(<App />)
const css = cxs.css

const doc = `<!DOCTYPE html>
<style>${css}</style>
${html}
`

// Reset the cache for the next render
cxs.reset()
```


## API

Calling the `cxs` function returns a rule object.

```js
import cxs from 'cxs'

const rule = cxs(cssDeclarationBlock, options)
```

The first argument to `cxs` should be a string containing a valid CSS declaration block.

The second argument is an options object, where:

- `options.media` is a CSS media query string
- `options.descendant` is a pseudoclass or descendant selector string that follows the class selector
- `options.selector` is any valid CSS selector string
- `options.className` is a string for internal use to manually set the classname

The `.toString()` method on the rule object returns a classname for use in HTML.

```js
rule.toString() // '_0'
```

The rule object also includes chainable methods to add multiple rulesets with the same classname.

```js
// Adds a pseudoclass rule with the same classname
rule.hover()
rule.focus()
rule.active()
rule.disabled()

// Adds a media query rule with the same classname
rule.media(mediaQuery, cssDeclarationBlock)

// Adds another rule with the same classname
rule.push()
```

```js
// Gets a CSS string of CSS rules. Useful for server-side rendering
cxs.css

// Clear the cache and flush the stylesheet.
// This is useful for cleaning up in server-side contexts.
cxs.reset()
```

Additional exports

```
import {
  Sheet,  // create stylesheet function
  sheet,  // cxs stylesheet instance
  css,    // string of rendered CSS - same as cxs.css
  reset   // same as cxs.reset
} from 'cxs'
```


## React Components

CXS also has a higher order component for creating styled React components, similar to [styled-components][0] API.

```js
import cxs from 'cxs/component'

const Heading = cxs(`
  margin: 0;
  font-size: 32px;
  line-height: 1.25;
`).component('h1')
```

Unlike styled-components, CXS components can be composed with other higher order components and works seamlessly with libraries like [Recompose][1].

```jsx
import React from 'react'
import cxs from 'cxs/component'
import { compose, withState } from 'recompose'

const Box = props => (
  <div {...props} />
)

const withTomato = cxs('color: tomato').component

const enhance = compose(
  withTomato,
  withState
)

export default enhance(Box)
```


## JS Objects

Coming soon

```js
import cxs from 'cxs/object'

const style = cxs({
  color: 'tomato'
})
```


### Vendor prefixes

CXS **does not** handle vendor prefixing to keep the module size at a minimum.
To add vendor prefixes, use a prefixing module like [`inline-style-prefixer`](https://github.com/rofrischmann/inline-style-prefixer)

<!--
  ```js
  import cxs from 'cxs'
  import prefixer from 'inline-style-prefixer/static'

  const prefixed = prefixer({
    display: 'flex'
  })
  const cx = cxs(prefixed)
  ```
-->

## Related

[0]: https://www.styled-components.com (styled-components)
[1]: https://github.com/acdlite/recompose (Recompose)

[MIT License](LICENSE.md)
