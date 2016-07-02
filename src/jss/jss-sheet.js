

import { create } from 'jss'
import jssNested from 'jss-nested'
import jssCamelCase from 'jss-camel-case'
import jssDefaultUnit from 'jss-default-unit'
import jssVendorPrefixer from 'jss-vendor-prefixer'

export const jss = create()
jss.use(jssNested())
jss.use(jssCamelCase())
jss.use(jssDefaultUnit())
jss.use(jssVendorPrefixer())

const sheet = jss.createStyleSheet().attach()

export default sheet

