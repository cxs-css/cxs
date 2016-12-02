
import { StyleSheet } from 'glamor/lib/sheet'

export const sheet = new StyleSheet()
sheet.inject()

export const cache = []

export const insert = (rule) => {
  if (cache.indexOf(rule.id) > -1) return
  cache.push(rule.id)
  sheet.insert(rule.css)
}

export const reset = () => {
  while (cache.length) cache.pop()
  sheet.flush()
}

export const css = () => sheet.rules()
  .map(rule => rule.cssText)
  .join('')

export default sheet

