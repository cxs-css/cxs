
# ϟ cxs

[![Build Status](https://travis-ci.org/jxnblk/cxs.svg?branch=master)](https://travis-ci.org/jxnblk/cxs)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Functional CSS for functional UI components

cxs is a css-in-js solution to dynamically create stylesheets with a functional approach

---

## Utility Notes

## Atomic mode

```js
import cxs from 'cxs/atomic'

const className = cxs({ color: 'tomato' })
```

---

## Features
- 5.6KB gzipped       (5.5KB)
- Avoids collisions with consistently hashed classnames
- Supports pseudo-classes without JS event listeners
- Supports media queries without using `window.matchMedia`
- Support @keyframe rules
- Supports nested selectors - useful for styling markdown and other user-generated content
- Dedupes repeated styles
- Avoid maintaining and using custom syntax or classname DSLs from CSS frameworks and manually written CSS
- Scoped styles with a component-based architecture
- No separate CSS files to process or maintain
- Optionally extract common CSS declarations like `display: block` and `float: left`
- **Use JavaScript to author styles**
  - Objects & Object.assign
  - Module imports
  - Anything from npm
  - Numbers and operators
  - Functions
  - Plus whatever you can dream up
  - No fiddling with tagged template literals


```sh
npm i cxs
```

## Example Usage

```js
// UI component example
import yo from 'yo-yo'
import cxs from 'cxs'

const Button = ({ text, onclick }) => {

  // Pass a style object to cxs, which returns a string for
  // adding hashed classnames to HTML.
  const className = cxs({
    // Numbers are converted to px values.
    fontSize: 14,
    color: 'white',
    backgroundColor: '#07c',
    // Pseudo classes and @media queries work as well.
    '&:hover': {
      backgroundColor: '#06b'
    },
    '@media screen and (min-width:40em)': {
      fontSize: 18
    }
  })

  // cxs attaches a stylesheet to the head and updates
  // rules with each call.

  // Apply the classname to your component
  return yo`
    <button
      className=${className}
      onclick=${onclick}>
      ${text}
    </button>
  `
}
```

### Server-Side Rendering

```js
// For server-side rendering,
// get the CSS string after rendering a component tree
const body = view(state).toString()
const css = cxs.css

// Reset the cache for subsequent renders
cxs.reset()

const html `<!DOCTYPE html>
<html>
  <head>
    <style>${css}</style>
  </head>
  <body>${body}</body>
</html>
`
```

### Using with React
```js
import React from 'react'

const Box = (props) => {
  return (
    <div {...props} className={cx} />
  )
}

// Static styles can be outside of the component render function for better performance.
const cx = cxs({
  boxSizing: 'border-box',
  padding: 32,
  borderRadius: 3,
  backgroundColor: '#f6f6f6'
})

export default Button
```

### Global Selectors

Normally, you should avoid adding global selectors to the page,
but cxs can be used to set base body styles.
Pass a string as the first argument to create a style with a custom selector.

```js
cxs('body', {
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  lineHeight: 1.5,
  margin: 0
})
```

*Note: if you ARE NOT using babel, be sure to import with `require('cxs').default`*

## API

```js
// Returns a hashed className string and creates CSS rules for style objects
const className = cxs({ color: 'tomato' })

// A CSS string of attached rules. Useful for server-side rendering
const css = cxs.css()

// The threepointone/glamor StyleSheet instance
// See https://github.com/threepointone/glamor
cxs.sheet

// Clear the cache and flush the glamor stylesheet.
// This is useful for cleaning up in server-side contexts.
cxs.reset()
```

### Vendor prefixes

cxs **does not** handle vendor prefixing to keep the module size at a minimum.
To add vendor prefixes, use a prefixing module like [`inline-style-prefixer`](https://github.com/rofrischmann/inline-style-prefixer)

```js
import cxs from 'cxs'
import prefixer from 'inline-style-prefixer/static'

const prefixed = prefixer({
  display: 'flex'
})
const cx = cxs(prefixed)
```

### Common Declaration Utilities

Cxs comes with an alternative, experimental module that attempts to extract
commonly used declarations, such as `margin: 0` and `display: block`, into global utility rulesets.

To use the common declarations version, import the following instead of `cxs`.

```js
import cxs from 'cxs/optimized'
```

Each common utility selector follows this pattern: `.cxs-<property>-<value>`.
Once a utility ruleset has been registered,
cxs will not add that ruleset to the stylesheet again, unless the `cxs.clear()` method has been called.

### Related

- [glamor](https://github.com/threepointone/glamor)
- [react-cxs](https://github.com/jxnblk/react-cxs)
- [cxs-components](https://github.com/jxnblk/cxs-components)
- [Axs](https://github.com/jxnblk/Axs)
- [hyp](https://github.com/jxnblk/hyp)

### Other CSS-in-JS options

Compared to other, similar modules, cxs is an attempt to create a smaller and simpler API and a smaller overall module.
For more customizable and robust solutions, see the following:

- [glamor](https://github.com/threepointone/glamor)
- [Aphrodite](https://github.com/Khan/aphrodite)
- [jss](https://github.com/jsstyles/jss)

### Browser support

IE9+, due to the following:
- `Array.filter`
- `Array.map`
- `Array.reduce`
- `Array.forEach`

MIT License
