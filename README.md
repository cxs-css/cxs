
# ϟ CXS

[![Build Status](https://travis-ci.org/jxnblk/cxs.svg?branch=master)](https://travis-ci.org/jxnblk/cxs)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Functional CSS for functional UI components

```js
const className = cxs({ color: 'tomato' })
```

CXS is a functional CSS-in-JS solution that uses atomic styles
to maximize deduplication and help with dead code elimination.

## Features

- Three different [modes](#modes) of operation: Atomic, Lite, & Monolithic
- < 5KB
- Avoids collisions with atomic rulesets
- Deduplicates repeated styles
- Dead-code elimination
- Framework independent
- CSS-in-JS
- Media queries
- Keyframes
- Pseudoclasses
- Nested selectors
- Avoid maintaining separate stylesheets
- Use plain JS objects and types
- No tagged template literals

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

const className = cxs({
  padding: 32,
  backgroundColor: 'tomato'
})

export default Box
```

### Pseudoclasses

```js
cxs({
  color: 'tomato',
  ':hover': {
    color: 'red'
  }
})
```

### Media Queries

```js
cxs({
  color: 'tomato',
  '@media (min-width: 40em)': {
    color: 'red'
  }
})
```

### Keyframes
```js
cxs({
  animationName: {
    from: {
      background: 'red',
    },
    to: {
      background: 'blue',
    }
  }
})
```
Note: only works with monolithic mode.

### Nested Selectors

```js
cxs({
  color: 'tomato',
  h1: {
    color: 'red'
  }
})
```

### Server-Side Rendering

To use CXS in server environments, use the `getCss()` function to get the static CSS string *after* rendering a view.

```js
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import cxs from 'cxs'
import App from './App'

const html = ReactDOMServer.renderToString(<App />)
const css = cxs.getCss()

const doc = `<!DOCTYPE html>
<style>${css}</style>
${html}
`

// Optionally reset the cache for the next render
cxs.reset()

```

## Modes

CXS offers three different modes of operation, which produce different rules and class names.

```js
import cxsAtomic from 'cxs'
import cxsMonolithic from 'cxs/monolithic'
import cxsLite from 'cxs/lite'

const styles = {
  margin: 0,
  marginBottom: 32,
  padding: 16,
  color: 'tomato',
  ':hover': {
    color: 'orangered'
  },
  '@media (min-width: 40em)': {
    padding: 32
  }
}

// Each mode returns a different set of class names

cxsAtomic(styles)
// m-0 mb-32 p-16 c-tomato -hover-c-orangered _zsp35u

cxsMonolithic(styles)
// _q5nmba

cxsLite(styles)
// a b c d e f
```

### Atomic Mode (Default)

```js
import cxs from 'cxs'
```

The default mode is the atomic mode.
This creates atomic rulesets and attempts to create human readable classnames.
If a classname is longer than 24 characters, a hashed classname will be used instead.

### Lite Mode

```js
import cxs from 'cxs/lite'
```

For super fast performance, use the `cxs/lite` module.
Lite mode creates alphabetic class names in a sequential order and does not support nested selectors.

Since the class names in cxs/lite are *not* created in a functional manner,
when using cxs/lite on both the server and client, the styles will need to be rehydrated.

```js
// Server
const css = cxs.getCss()
cxs.reset()

const html = `<!DOCTYPE html>
<style id='cxs-style'>${css}</style>
${body}
`
```

```js
// Client
import cxs from 'cxs/lite'

const styleTag = document.getElementById('cxs-style')
const serverCss = styleTag.innerHTML

cxs.rehydrate(serverCss)
```

### Monolithic Mode

```js
import cxs from 'cxs/monolithic'
```

To create encapsulated monolithic styles with CXS and use single hashed class names, import the monolithic module.

The monolithic module also accepts custom selectors for styling things like the body element.

```js
cxs('body', {
  fontFamily: '-apple-system, sans-serif',
  margin: 0,
  lineHeight: 1.5
})
```

## API

```js
import cxs from 'cxs'

// Creates styles and returns micro classnames
cxs({ color: 'tomato' })

// Returns a CSS string of attached rules. Useful for server-side rendering
cxs.getCss()

// Clear the cache and flush the glamor stylesheet.
// This is useful for cleaning up in server-side contexts.
cxs.reset()
```

Additional exports

```
import {
  // The threepointone/glamor StyleSheet instance
  // See https://github.com/threepointone/glamor
  sheet,
  // Same as cxs.getCss
  getCss,
  // Same as cxs.reset
  reset
} from 'cxs'
```

### Vendor prefixes

CXS **does not** handle vendor prefixing to keep the module size at a minimum.
To add vendor prefixes, use a prefixing module like [`inline-style-prefixer`](https://github.com/rofrischmann/inline-style-prefixer)

```js
import cxs from 'cxs'
import prefixer from 'inline-style-prefixer/static'

const prefixed = prefixer({
  display: 'flex'
})
const cx = cxs(prefixed)
```

### Browser support

IE9+, due to the following:
- `Array.filter`
- `Array.map`
- `Array.forEach`

## Related

- [cxs-components](https://github.com/jxnblk/cxs/tree/master/packages/cxs-components)
- [react-cxs](https://github.com/jxnblk/cxs/tree/master/packages/react-cxs)
- [react-cxs-hoc](https://github.com/jxnblk/cxs/tree/master/packages/react-cxs-hoc)

[MIT License](LICENSE.md)

