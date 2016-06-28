
# cxs

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
const css = cxs.getCss()

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

// Returns an array of cached CSS rules
const rules = cxs.getRules()

// Returns a CSS string of cached rules. Useful for server-side rendering
const css = cxs.getCss()

// Clears the rule cache. This can be used after building a DOM tree and attaching styles
cxs.clearCache()
```

### Browser support

- IE9 +
  - Currently uses CSSStyleSheet.insertRule()

MIT License
