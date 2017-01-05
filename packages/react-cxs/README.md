
# ϟ react-cxs

[![Build Status](https://travis-ci.org/jxnblk/cxs.svg?branch=master)](https://travis-ci.org/jxnblk/cxs)

**Experimental**

Alternative `React.createElement` function which allows style objects to be passed to the `css` prop to generate CSS using [cxs](https://github.com/jxnblk/cxs)

```sh
npm i react-cxs
```

## Usage

For seamless integration with existing components,
react-cxs can be set as the default pragma in JSX with babel and webpack.

### `.babelrc`

```json
{
  "presets": [
    "es2015",
    "stage-0"
  ],
  "plugins": [
    [
      "transform-react-jsx",
      { "pragma": "reactCxs" }
    ]
  ]
}
```

### `webpack.config.js`

```js
plugins: [
  new webpack.ProvidePlugin({
    reactCxs: 'react-cxs'
  })
]
```

*Note: the webpack ProvidePlugin exposes the `reactCxs` function globally.
Alternatively, `reactCxs` can be imported at the top of each component.*

Once these are configured, you can pass style objects to the `css` prop in any component to have CSS automatically generated with the cxs module.

```jsx
// Example Button.js component

const Button = (props) => {
  const styles = {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    textDecoration: 'none',
    display: 'inline-block',
    margin: 0,
    padding: 8,
    borderRadius: 2,
    color: 'white',
    backgroundColor: '#07c',
    cursor: 'pointer',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    ':hover': {
      backgroundColors: '#06b'
    }
  }

  return <button {...props} css={styles} />
}

export default Button
```

## Advantages

- Keep the implementation details of CSS-in-JS in a single place in your codebase
- Allows for native CSS pseudoclasses and media queries
- Avoid maintaining CSS files, libraries, frameworks, and additional build processes
- Scoped, collision-free styles

## Usage with other CSS-in-JS solutions

This approach can also be used with other libraries such as
[Glamor](https://github.com/threepointone/glamor) or
[Aphrodite](https://github.com/Khan/aphrodite).
Create your own `createElement` function like the one found in `/src/index.js` and replace the calls to `cxs` with another library.

## Related

- [cxs](https://github.com/jxnblk/cxs)
- [cxs-components](https://github.com/jxnblk/cxs/tree/master/packages/cxs-components)
- [react-cxs-hoc](https://github.com/jxnblk/cxs/tree/master/packages/react-cxs-hoc)

[MIT License](LICENSE.md)

