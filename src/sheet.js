
import { StyleSheet } from 'glamor/lib/sheet'

export const sheet = new StyleSheet()

sheet.inject()

export const css = () => sheet.rules()
  .map(rule => rule.cssText)
  .join('')

export default sheet

