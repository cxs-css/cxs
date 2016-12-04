
# ϟ cxs

[![Build Status](https://travis-ci.org/jxnblk/cxs.svg?branch=master)](https://travis-ci.org/jxnblk/cxs)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Functional CSS for functional UI components

The simplest, smallest CSS-in-JS solution.

```js
const className = cxs({ color: 'tomato' })
```

Cxs is a functional CSS-in-JS solution that uses atomic styles
to maximize deduplication and help with dead code elimination.

## Features

- ~6KB
- Avoids collisions with atomic rulesets
- Deduplicates repeated styles
- Dead-code elimination
- Framework independent
- CSS-in-JS
  - Media queries
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

To use cxs in server environments, use the `css()` function to get the static CSS string *after* rendering a view.

```js
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import cxs, { css, reset } from 'cxs'
import App from './App'

const html = ReactDOMServer.renderToString(<App />)

const doc = `<!DOCTYPE html>
<style>${css()}</style>
${html}
`

// reset the cache for the next render
reset()

```

## Monolithic Mode

To create encapsulated monolithic styles with cxs and use single hashed class names, import the monolithic module.

```js
import cxs from 'cxs/monolithic'
```

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
import cxs, {
  css,
  sheet,
  reset
} from 'cxs'
// Creates styles and returns micro classnames
cxs({ color: 'tomato' })

// Returns a CSS string of attached rules. Useful for server-side rendering
css()

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
Some classnames are abbreviated, and long classnames are hashed.

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

### Browser support

IE9+, due to the following:
- `Array.filter`
- `Array.map`
- `Array.reduce`
- `Array.forEach`

MIT License
