import cxs from './index'

const atomic = (styles, { media, child = '' } = {}) => {
  const classNames = []

  for (let key in styles) {
    const val = styles[key]

    if (val === null) continue

    if (typeof val === 'object') {
      const isAtRule = /^@/.test(key)
      const m2 = isAtRule ? key : media
      const c2 = isAtRule ? child : child + key
      const nested = atomic(val, {
        media: m2,
        child: c2
      })
      classNames.push(nested)
      continue
    }

    const prop = hyphenate(key)
    const value = addPx(key, val)
    const className = createClassName(prop, value, media, child)
    const css = [ prop, value ].join(':')
    const rule = cxs(css, { className, media, child })
    classNames.push(className)
  }

  return classNames.join(' ')
}

let mediaQueries = []

export const createClassName = (prop, value, media, child) => {
  const prefix = abbrMedia(media)
  const short = abbr(prop)
  return combine('_')(
    prefix,
    short,
    value,
    child
  )
}

export const combine = (s = '') => (...args) => args
  .filter(a => !!a)
  .map(clean)
  .join(s)
  .trim()

const RE = /[^a-zA-Z0-9-_]/g
export const clean = str => str.replace(RE, '-')

export const abbrMedia = media => {
  if (!media) return ''
  let i = mediaQueries.indexOf(media)
  if (i < 0) {
    i = mediaQueries.length
    mediaQueries.push(media)
  }
  return 'm' + i
}

export const abbr = (str) => shorthands.includes(str)
  ? str
    .split('-')
    .map(c => c.charAt(0))
    .join('')
  : str

export const hyphenate = (str) => ('' + str)
  .replace(/[A-Z]|^ms/g, '-$&')
  .toLowerCase()

export const addPx = (prop, value) => {
  if (typeof value !== 'number') return value
  if (unitless.indexOf(prop) > -1) return value
  return value + 'px'
}

const shorthands = [
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'display',
  'float',
  'font-family',
  'font-weight',
  'font-size',
  'line-height',
  'width',
  'height',
  'color',
  'background',
  'background-color',
  'background-image'
]

const unitless = [
  'animationIterationCount',
  'boxFlex',
  'boxFlexGroup',
  'boxOrdinalGroup',
  'columnCount',
  'flex',
  'flexGrow',
  'flexPositive',
  'flexShrink',
  'flexNegative',
  'flexOrder',
  'gridRow',
  'gridColumn',
  'fontWeight',
  'lineClamp',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'tabSize',
  'widows',
  'zIndex',
  'zoom',
  'fillOpacity',
  'stopOpacity',
  'strokeDashoffset',
  'strokeOpacity',
  'strokeWidth'
]

Object.defineProperty(atomic, 'css', {
  get: () => cxs.css
})

atomic.reset = () => {
  mediaQueries = []
  cxs.reset()
}

export default atomic
