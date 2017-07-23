import React from 'react'
import {
  LiveProvider,
  LivePreview,
  LiveError,
  LiveEditor,
} from 'react-live'
import cxs from 'cxs/component'
import media from './media'
import { dark, blue } from './colors'

const scope = {
  cxs
}

const Root = cxs(LiveProvider)`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, .25);
  overflow: hidden;
`.media(media[1])`
  flex-direction: row;
`

const Preview = cxs(LivePreview)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  width: 100%;
`.media(media[1])`
  width: 50%;
`

const Editor = cxs(LiveEditor)`
  font-family: inherit;
  font-size: 14px;
  tab-size: 2;
  width: 100%;
  margin: 0;
  padding: 32px;
  overflow: auto;
  outline: none;
  color: ${blue};
  background-color: ${dark};
`.media(media[1])`
  padding: 48px;
  width: 50%;
`

const Err = cxs(LiveError)`
  position: absolute;
  top: calc(100% + 16px);
  left: 0;
  right: 0;
  font-family: inherit;
  padding: 32px;
  color: white;
  background-color: red;
  border-radius: 3px;
`

const Live = props => {

  return (
    <Root
      {...props}
      scope={scope}
      mountStylesheet={false}>
      <Preview />
      <Editor />
      <Err />
    </Root>
  )
}

export default Live
