

import { create } from 'jss'
import jssNested from 'jss-nested'
import jssCamelCase from 'jss-camel-case'
import jssDefaultUnit from 'jss-default-unit'

export const jss = create()
jss.use(jssNested())
jss.use(jssCamelCase())
jss.use(jssDefaultUnit())

const sheet = jss.createStyleSheet().attach()

export default sheet

