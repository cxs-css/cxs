
import hash from 'murmurhash-js/murmurhash3_gc'
import createRules from './create-rules'

export let styleTag = null
export let cache = {}

export let options = {
  autoAttach: false
}

const cxs = (style) => {
  const classNames = []
  const hashname = 'cxs-' + hash(JSON.stringify(style), 128)
  const rules = createRules(hashname, style)

  rules.forEach(r => cache[r.id] = r)

  rules.filter(r => !/\:/.test(r.selector))
    .forEach(r => classNames.push(r.selector.replace(/^\./, '')))

  if (options.autoAttach) {
    cxs.attach()
  }
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

  // Insert all rules
  // note: filtering for new rules does not seem to have a huge performance impact
  rules.forEach(rule => {
      try {
        cxs.sheet.insertRule(rule.css, cxs.sheet.cssRules.length)
      } catch (e) {}
    })
}

cxs.options = options
cxs.clearCache = () => cache = {}

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

