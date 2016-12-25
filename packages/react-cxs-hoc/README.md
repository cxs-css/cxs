
# react-cxs-hoc

React higher order component for applying CSS style objects to components with [cxs](https://github.com/jxnblk/cxs)

```sh
npm i react-cxs-hoc
```

## Higher order component

```jsx
// Example HOC usage
import React from 'react'
import Cxs from 'react-cxs-hoc'

const Box = props => <div {...props} />

export default Cxs(Box)
```

```jsx
// Example Grid component
import React from 'react'
import Box from './Box'

const Grid = ({
width = 1 / 2,
...props
}) => {
  const cx = {
    boxSizing: 'border-box',
    display: 'inline-block',
    verticalAlign: 'top',
    paddingLeft: 32,
    paddingRight: 32,
    width: `${width * 100}%`
  }

  return <Box {...props} className={cx} />
}

export default Grid
```

## Base component

```js
import React from 'react'
import { Base } from 'cxs'

const Button = ({ className = {}, ...props }) => {
  const cx = {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    display: 'inline-block',
    margin: 0,
    padding: 8,
    color: '#fff',
    backgroundColor: '#07c',
    borderRadius: 2,
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    ':hover': {
      backgroundColor: '#06b'
    },
    ...className
  }

  return <Base {...props} tag='button' className={cx} />
}
```

### Related:

- [cxs](https://github.com/jxnblk/cxs)
- [react-cxs](https://github.com/jxnblk/react-cxs)
- [Aphrodite](https://github.com/Khan/aphrodite)
- [JSS](https://github.com/cssinjs/jss)

MIT License
