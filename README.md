
# ϟ cxs

[![Build Status](https://travis-ci.org/jxnblk/cxs.svg?branch=master)](https://travis-ci.org/jxnblk/cxs)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Functional CSS for functional UI components

```js
const className = cxs({ color: 'tomato' })
```

## Features

- ~5KB
- Avoids collisions with atomic rulesets
- Deduplicates repeated styles
- Dead-code elimination
- Framework independent
- CSS-in-JS
  - Media queries
  - Pseudoclasses
  - Nested selectors
  - Avoid maintaining separate stylesheets
  - Use plain JS objects
  - No template literals

## Install

```sh
npm install cxs
```

## Usage

Cxs works with any framework, but this example uses React for demonstration purposes.

```js
import React from 'react'
import cxs from 'cxs'

const Box = (props) => {
  return (
    <div
      {...props}
      className={className} />
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
  '&:hover': {
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

### Nested Selectors

```js
cxs({
  color: 'tomato',
  '& h1': {
    color: 'red'
  }
})
```

### Server-Side Rendering

To use cxs in server environments, use the `css()` function to get the static CSS string *after* rendering a view.

```js
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import cxs from 'cxs'
import App from './App'

const html = ReactDOMServer.renderToString(<App />)
const css = cxs.css()

// reset the cache for the next render
cxs.reset()

const doc = `<!DOCTYPE html>
<style>${css}</style>
${html}
`
```

## API

```js
// Creates styles and returns micro classnames
cxs({ color: 'tomato' })

// A CSS string of attached rules. Useful for server-side rendering
const css = cxs.css()

// The threepointone/glamor StyleSheet instance
// See https://github.com/threepointone/glamor
cxs.sheet

// Clear the cache and flush the glamor stylesheet.
// This is useful for cleaning up in server-side contexts.
cxs.reset()
```

## How it Works

The cxs function creates a separate rule for each declaration,
adds CSS rules to a style tag in the head of the document,
and returns multiple classnames.

The returned classname is based on the property and value of the declaration.
Some classnames are abbreviated, and ones that would be unhelpfully long are hashed.

```js
cxs({ color: 'tomato' })
// c-tomato
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


<!--
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
-->

### Browser support

IE9+, due to the following:
- `Array.filter`
- `Array.map`
- `Array.reduce`
- `Array.forEach`

MIT License
