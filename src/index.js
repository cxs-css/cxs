
import hash from 'node-murmurhash'
import createRules from './create-rules'

export let styleTag = null
export let cache = {}

const cxs = (style) => {
  const classNames = []
  const hashname = 'cxs-' + hash(JSON.stringify(style), 128)
  const rules = createRules(hashname, style)

  rules.forEach(rule => {
    if (!/\:/.test(rule.selector)) {
      classNames.push(rule.selector.replace(/^\./, ''))
    }
    if (!cache[rule.id]) {
      cache[rule.id] = rule
    }
  })

  cxs.attach()
  return classNames.join(' ')
}

cxs.attach = () => {
  if (typeof document === 'undefined') {
    console.warn('Cannot attach stylesheet without a document')
    return
  }

  const rules = cxs.rules
  styleTag = styleTag || document.getElementById('cxs')

  if (styleTag === null) {
    styleTag = document.createElement('style')
    styleTag.id = 'cxs'
    document.head.appendChild(styleTag)
    cxs.sheet = styleTag.sheet
  }

  for (var i = 0; i < rules.length; i++) {
    const rule = rules[i]
    try {
      cxs.sheet.insertRule(rule.css, cxs.sheet.cssRules.length)
    } catch (e) {}
  }
}

Object.defineProperty(cxs, 'rules', {
  get () {
    return Object.keys(cache || {})
      .map(k => cache[k] || false)
      .filter(r => r.css.length)
      .sort((a, b) => a.order - b.order)
  }
})

Object.defineProperty(cxs, 'css', {
  get () {
    return cxs.rules
      .map(r => r.css)
      .join('')
  }
})

export default cxs

