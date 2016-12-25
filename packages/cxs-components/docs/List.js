
import React from 'react'
import comp from '../src'
import { typescale, scale } from './styles'

const Base = props => {
  const ch = React.Children.map(props.children, (child, i) => {
    return <li key={i}>{child}</li>
  })

  return <ul {...props} children={ch} />
}

const List = comp(Base)(props => ({
  fontSize: typescale[props.size] || null,
  fontWeight: props.bold ? 'bold' : null,
  listStylePosition: 'outside',
  padding: 0
}), {
  removeProps: [ 'bold', 'size' ]
})

export const InlineList = comp(List)({
  li: {
    display: 'inline-block',
    marginRight: scale[1]
  }
})

export default List

