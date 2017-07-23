import cxs from './index'

export const kebab = (str) => str.replace(/([A-Z])/g, g => '-' + g.toLowerCase())
export const px = prop => val => typeof val === 'number' ? addPx(prop, val) : val
export const addPx = (prop, val) => unitless[prop] ? val : val + 'px'

export const objectToRules = (style, child = '', media) => {
  const rules = []
  const declarations = []

  for (let key in style) {
    const val = style[key]

    if (val !== null && typeof val === 'object') {
      const isAtRule = /^@/.test(key)
      const media2 = isAtRule ? key : media
      const child2 = isAtRule ? child : child + key
      const nested = objectToRules(val, child2, media2)
      nested.forEach(rule => rules.push(rule))
      continue
    }
    const dec = kebab(key) + ':' + px(key)(val)
    declarations.push(dec)
  }

  rules.unshift({
    media,
    child,
    declarations: declarations.join(';')
  })

  return rules
}

const obj = (style = {}, opts) => {
  const [ first, ...rest ] = objectToRules(style)

  const base = cxs(first.declarations,
    Object.assign({}, opts, first)
  )

  rest.forEach(({ declarations, media, child }) => {
    base.push(declarations, { media, child })
  })

  return base
}

Object.defineProperty(obj, 'css', {
  get: () => cxs.css
})

obj.reset = cxs.reset

const unitless = {
  animationIterationCount: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridColumn: 1,
  fontWeight: 1,
  lineClamp: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  fillOpacity: 1,
  stopOpacity: 1,
  strokeDashoffset: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}

export default obj
