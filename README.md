
# ϟ cxs

[![Build Status](https://travis-ci.org/jxnblk/cxs.svg?branch=master)](https://travis-ci.org/jxnblk/cxs)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

**WIP**

Functional CSS for functional UI components

cxs is a css-in-js solution to dynamically create stylesheets with a functional approach

## Features
- Avoids collisions with hashed classnames
- Supports pseudo-classes without JS
- Supports media queries without using `window.matchMedia`
- Dedupes repeated styles
- Automatically extracts common CSS declarations like `display: block` and `float: left`
- Avoid maintaining and using custom syntax or classname DSLs from CSS frameworks and manually written CSS
- Scoped styles with a component-based architecture
- No separate CSS files to process or maintain


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
  // Numbers are converted to px values.
  // Pseudo classes and @media queries work as well.
  // cxs attaches a stylesheet to the head and updates
  // rules with each call.
  const className = cxs({
    fontSize: 14,
    color: 'white',
    backgroundColor: '#07c',
    ':hover': {
      backgroundColor: '#06b'
    },
    '@media screen and (min-width:40em)': {
      fontSize: 18
    }
  })

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

```js
// For server-side rendering,
// get the CSS string after rendering a component tree
const body = view(state).toString()
const css = cxs.css

const html `<!DOCTYPE html>
<html>
  <head>
    <style>${css}</style>
  </head>
  <body>${body}</body>
</html>
`
```

## API

```js
// Returns a hashed className string and creates CSS rules for style objects
const className = cxs({ color: 'tomato' })

// Attach a style tag and CSSStyleSheet to the document
// This is useful for manually controlling style insertion
// when `options.autoAttach` is set to false.
cxs.attach()

// An array of cached CSS rules
const rules = cxs.rules

// A CSS string of cached rules. Useful for server-side rendering
const css = cxs.css

// Clears the rule cache. This can be used after building a DOM tree and attaching styles
cxs.clearCache()

// Options

// Disable automatic style insertion by setting `autoAttach` to false.
cxs.options.autoAttach = true

// Change the debounce time
cxs.options.debounce = 0
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

### Other CSS-in-JS options

Compared to other, similar modules, cxs is an attempt to create a smaller and simpler API and a smaller overall module.
For more customizable and robust solutions, see the following:

- [Aphrodite](https://github.com/Khan/aphrodite)
- [jss](https://github.com/jsstyles/jss)

### Browser support

- IE9 +
  - Due to the following:
  - `CSSStyleSheet.insertRule()`
  - `Array.filter`
  - `Array.map`
  - `Array.reduce`
  - `Array.forEach`

MIT License
