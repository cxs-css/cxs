
# cxs

[![Build Status](https://travis-ci.org/jxnblk/cxs.svg?branch=master)](https://travis-ci.org/jxnblk/cxs)

**WIP**

Functional CSS for functional UI components

cxs is a css-in-js solution to dynamically create stylesheets with a functional approach

## Features
- Avoids collisions with hashed classnames
- Supports pseudo-classes
- Supports media queries
- Dedupes repeated styles
- Automatically extracts common CSS declarations like `display: block` and `float: left`


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
// attach the stylesheet to the document after rendering
const tree = view(state)
document.body.appendChild(tree)
cxs.attach()
```

```js
// Or return a CSS string for server-side rendering
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
cxs.attach()

// An array of cached CSS rules
const rules = cxs.rules

// A CSS string of cached rules. Useful for server-side rendering
const css = cxs.css

// Clears the rule cache. This can be used after building a DOM tree and attaching styles
cxs.clearCache()
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
