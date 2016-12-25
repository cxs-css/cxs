
# react-cxs

[![Build Status](https://travis-ci.org/jxnblk/react-cxs.svg?branch=master)](https://travis-ci.org/jxnblk/react-cxs)

**Experimental**

ϟ Alternative `React.createElement` function which allows style objects to be passed to the className prop to generate CSS using [cxs](https://github.com/jxnblk/cxs)

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

Once these are configured, you can pass style objects to the className prop in any component to have CSS automatically generated with the cxs module.

```js
// Example Button.js component

const Button = (props) => {
  const className = {
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

  return <button {...props} className={className} />
}

export default Button
```

To use external CSS, pass a string to the className prop instead:

```js
<button className='btn btn-primary'>Button</button>
```

See the `/demo` folder for a rough example.

## Advantages

- Keep the implementation details of CSS-in-JS in a single place in your codebase
- Allows for native CSS pseudoclasses and media queries
- Avoid maintaining CSS files, libraries, frameworks, and additional build processes
- Scoped, collision-free styles

## Usage with other CSS-in-JS solutions

This approach can also be used with other libraries such as [Aphrodite](https://github.com/Khan/aphrodite) or [JSS](https://github.com/jsstyles/jss).
Create your own `createElement` function like the one found in `/src/index.js` and replace the calls to `cxs` with another library.

## Related

- [cxs](https://github.com/jxnblk/cxs)
- [Aphrodite](https://github.com/Khan/aphrodite)
- [JSS](https://github.com/jssstyles/jss)
- [hyp](https://github.com/jxnblk/hyp)

MIT License

