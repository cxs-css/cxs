
import StyletronServer from 'styletron-server'
import StyletronClient from 'styletron-client'
import { injectStyle } from 'styletron-utils'
import addPx from 'add-px-to-style'

const options = {
  // prefix: 'x-'
}

export let styletron = new StyletronServer(options)

if (typeof document !== 'undefined') {
  // Rehydrate client side instance
  // To do: write tests for this
  const styletronStylesheets = document.getElementsByClassName('_styletron_hydrate_')

  const getEmptyStylesheet = () => {
    const sheet = document.createElement('style')
    sheet.className = '_cxs-init'
    document.head.appendChild(sheet)
    return document.getElementsByClassName('_cxs-init')
  }

  const stylesheets = styletronStylesheets.length
    ? styletronStylesheets
    : getEmptyStylesheet()

  styletron = new StyletronClient(stylesheets, options)
}

export const cxs = (styles) => {
  const sx = convertStyles(styles)
  return injectStyle(styletron, sx)
}

// Utils

const convertStyles = (styles) => {
  return toArr(styles)
    .map(parse)
    .reduce(objectReducer, {})
}

const toArr = (obj) => {
  const arr = []
  for (let key in obj) {
    arr.push({
      key,
      value: obj[key]
    })
  }
  return arr
}

const objectReducer = (a, b) => {
  if (b.value !== null) {
    a[b.key] = b.value
  }
  return a
}

const parse = ({ key, value }) => ({
  key,
  value: addPx(key, value)
})

export const css = () => {
  return styletron.getCss()
}

export const reset = () => {
  styletron = new StyletronServer(options)
}

export default cxs

