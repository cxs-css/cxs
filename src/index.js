let cache = {}
let prefix = 'x'
const rules = []
let insert = rule => rules.push(rule)
const hyph = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()
const mx = (rule, media) => media ? `${media}{${rule}}` : rule
const rx = (cn, prop, val) => `.${cn}{${hyph(prop)}:${val}}`
const noAnd = s => s.replace(/&/g, '')
const isDev = (process.env.NODE_ENV === 'development') || (!process.env.NODE_ENV)

const parse = (obj, child = '', media) =>
  Object.keys(obj).map(key => {
    const val = obj[key]
    if (val === null) return ''
    if (typeof val === 'object') {
      const m2 = /^@/.test(key) ? key : null
      const c2 = m2 ? child : child + key
      return parse(val, c2, m2 || media)
    }
    const _key = key + val + child + media
    if (cache[_key]) return cache[_key]
    const className = prefix + (rules.length).toString(36)
    insert(mx(rx(className + noAnd(child), key, val), media))
    cache[_key] = className
    return className
  })
    .join(' ')

function cxs (...styles) {
  return styles
    .map(style => parse(style))
    .join(' ')
    .trim()
}

cxs.css = () => rules.sort().join('')

cxs.reset = () => {
  cache = {}
  while (rules.length) rules.pop()
}

cxs.prefix = val => (prefix = val)

if (typeof document !== 'undefined') {
  const sheet = document.head.appendChild(
    document.createElement('style')
  ).sheet
  insert = rule => {
    rules.push(rule)
    try{
      sheet.insertRule(rule, rule.includes('@import') ? 0 : sheet.cssRules.length)
    }catch(e){
      if (isDev) console.warn('whoops, illegal rule inserted', rule)
    }
  }
}

export default cxs
