let cache = {}
let prefix = '_cxs'
const cssRules = []
let insert = rule => cssRules.push(rule)
const hyph = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()
const mx = (rule, media) => media ? `${media}{${rule}}` : rule
const rx = (cn, prop, val) => `.${cn}{${hyph(prop)}:${val}}`
const noAnd = s => s.replace(/&/g, '')

const isMedia = key => /^@/.test(key)
const createDeclaration = (key, value) => hyph(key) + ':' + value
const createRule = ({
  className,
  child,
  media,
  declarations
}) => mx(`.${className + child}{${declarations.join(';')}}`, media)

const parseRules = (obj, child = '', media) => {
  const rules = []
  const declarations = []

  for (let key in obj) {
    const value = obj[key]

    if (value === null) continue

    if (typeof value === 'object') {
      const _media = isMedia(key) ? key : null
      const _child = _media ? child : child + noAnd(key)
      parseRules(value, _child, _media)
        .forEach(r => rules.push(r))
      continue
    }

    const dec = createDeclaration(key, value)
    declarations.push(dec)
  }

  rules.unshift({
    media,
    child,
    declarations
  })

  return rules
}

const parse = obj => {
  const rules = parseRules(obj)
  const classNames = []

  rules.forEach(rule => {
    const cacheKey = JSON.stringify(rule)
    if (cache[cacheKey]) {
      classNames.push(cache[cacheKey])
      return
    }
    const className = prefix + cssRules.length.toString(36)
    classNames.push(className)
    const ruleset = createRule(Object.assign(rule, { className }))
    insert(ruleset)
    cache[cacheKey] = className
  })

  return classNames.join(' ')
}

module.exports = (...styles) =>
  styles.map(style => parse(style))
  .join(' ').trim()

module.exports.css = () => cssRules.sort().join('')

module.exports.reset = () => {
  cache = {}
  while (cssRules.length) cssRules.pop()
}

module.exports.prefix = val => prefix = val

if (typeof document !== 'undefined') {
  const sheet = document.head.appendChild(
    document.createElement('style')
  ).sheet
  insert = rule => {
    cssRules.push(rule)
    sheet.insertRule(rule, sheet.cssRules.length)
  }
}
