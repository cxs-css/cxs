
# ϟ CXS

[![Build Status](https://travis-ci.org/jxnblk/cxs.svg?branch=master)](https://travis-ci.org/jxnblk/cxs)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Fast af css-in-js in 1kb


```js
const rule = cxs(`color: tomato`)
```

CXS is a minimal CSS-in-JS solution that uses
an API that closely follows the native CSSStyleSheet API
to maximize performance and reduce bloat.

## Features

- 1 KB
- Zero dependencies
- High performance
- Style encapsulation
- Deduplicates repeated styles
- Dead-code elimination
- Framework independent
- Media queries
- Pseudoclasses
- Nested selectors
- No CSS files
- Use plain CSS strings
- Optional [React component](#react-components) API
- Optional [Atomic mode](#atomic-mode)


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

### Simple Rules

The CXS API works similarly to how native CSS works, by inserting one ruleset at a time.

```js
// Insert a CSS rule and return a CXS rule object
const rule = cxs('color: tomato')

// return the generated classname
rule.toString()
```

### Pseudoclasses

Just as native CSS does *not* have any notion of nesting, to add a rule with a pseudoclass, pass an options object to `cxs`.

```js
const rule = cxs('color: lime', { child: ':hover' })
```

Commonly used pseudoclasses include chainable methods to hook multiple rules to the same classname.

```js
const rule = cxs('color: tomato')
  .hover('color: red')
  .focus('outline: 1px solid blue')
  .active('color: blue')
  .disabled('opacity: .5')
```

### Media Queries

To create a rule scoped by a media query, pass a string to `options.media`.

```js
const rule = cxs('color: tomato', { media: '@media screen and (min-width: 40em)' })
```

The chainable `.media()` method can also be used to reuse a classname.

```js
const rule = cxs('color: tomato')
  .media('@media (min-width: 40em)', 'color: red')
})
```

### Child Selectors

Any valid CSS child selector syntax can be passed to `options.child`, which will be concatenated with the generated classname.

```js
cxs('color: tomato', { child: ' > h1' })
```

### Push Method

The `.push()` method can be used like the other chainable methods for other pseudoclasses and child selectors

```js
const rule = cxs('color: tomato')
  .push('color: black', { child: ':checked' })
  .push('color: blue', { child: ' > h1' })
```

### Global and Other Selectors

To add rules without the generated classname, use `options.selector`. This can be useful for global base styles.

```js
cxs('box-sizing: border-box', { selector: '*' })
cxs('font-family: sans-serif; margin: 0', { selector: 'body' })
```


### Server-Side Rendering

For Node.js environments, use the `css` getter to return the static CSS string *after* rendering a view.

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

Calling the `cxs` function returns a CXS rule object.

```js
import cxs from 'cxs'

const rule = cxs(cssDeclarationBlock, options)
```

The first argument to `cxs` should be a string containing a valid CSS declaration block.

The second argument is an options object, where:

- `options.media` is a CSS media query string
- `options.child` is a pseudoclass or child selector string that follows the class selector
- `options.selector` is any valid CSS selector string, this will replace the generated classname
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

CXS also has an alternative higher order component API for creating styled React components, similar to the [styled-components][0] API.

```js
import cxs from 'cxs/component'

const Heading = cxs('h1')`
  margin: 0;
  font-size: 32px;
  line-height: 1.25;
`
```

CXS components can also handle dynamic styling based on props by passing a function in to the tagged template literal.
To remove non-HTML attribute props used for styling a component, pass an array of keys as the `removeProps` option.

```js
const removeProps = [
  'color'
]

const Heading = cxs('h1', { removeProps })`
  color: ${props => props.color};
`
```

## Atomic Mode

For an alternative JavaScript object-based API that creates atomic CSS rules – similar to those found in [Basscss][2] or [Tachyons][3] , import the atomic module.

```js
import cxs from 'cxs/atomic'

const className = cxs({
  fontSize: 16,
  color: 'tomato',
  ':hover': {
    color: 'black'
  },
  '@media screen and (min-width: 32em)': {
    fontSize: 20
  }
})
```

## Limitations

### Nesting

For performance reasons, and since nesting is not part of native CSS, the default mode in CXS **does not** support nesting like some preprocessors do.

### Vendor prefixes

CXS **does not** handle vendor prefixing to keep the module size at a minimum.
To add vendor prefixes, use a prefixing module like [`inline-style-prefixer`](https://github.com/rofrischmann/inline-style-prefixer)


## Previous Version

For the previous version of CXS, see the [v3 branch][1]

[0]: https://www.styled-components.com (styled-components)
[1]: https://github.com/jxnblk/cxs/tree/v3
[2]: http://basscss.com
[3]: http://tachyons.io

[MIT License](LICENSE.md)
