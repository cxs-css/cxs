let cache = {}
const rules = []
let insert = rule => rules.push(rule)
const hyph = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()
const px = n => typeof n === 'number' ? n + 'px' : n
const mx = (rule, media) => media ? `${media}{${rule}}` : rule
const rx = (cn, prop, val) => `.${cn}{${hyph(prop)}:${px(val)}}`

const parse = (obj, child = '', media) =>
  Object.keys(obj).map(key => {
    const val = obj[key]
    if (val === null) return ''
    if (typeof val === 'object') {
      const m2 = /^@/.test(key) ? key : null
      const c2 = m2 ? child : child + key
      return parse(val, c2, m2 || media)
    }
    const _key = key + val + media
    if (cache[_key]) return cache[_key]
    const className = 'x' + (rules.length).toString(36)
    insert(mx(rx(className + child, key, val) , media))
    cache[_key] = className
    return className
  })
    .join(' ')

module.exports = (...styles) =>
  styles.map(style => parse(style))
  .join(' ').trim()

module.exports.css = () => rules.join('')

module.exports.reset = () => {
  cache = {}
  while (rules.length) rules.pop()
}

if (typeof document !== 'undefined') {
  const sheet = document.head.appendChild(
    document.createElement('style')
  ).sheet
  insert = rule => {
    rules.push(rule)
    sheet.insertRule(rule, sheet.cssRules.length)
  }
}
