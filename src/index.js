
import hash from 'node-murmurhash'
import cache from './cache'
import createRules from './create-rules'

let styleTag = null

const cxs = (...args) => {
  const classNames = []

  args.forEach(arg => {
    if (typeof arg === 'string') {
      classNames.push(arg)
    } else if (typeof arg === 'object') {
      const hashname = 'cxs-' + hash(JSON.stringify(arg), 128)
      const rules = createRules(hashname, arg)

      rules.forEach(rule => {
        if (!/\:/.test(rule.selector)) {
          classNames.push(rule.selector.replace(/^\./, ''))
        }
        if (cache.rules[rule.id]) {
          // console.warn('Rule already exists', cache[rule.id], rule)
        } else {
          cache.add([rule.id], rule)
        }
      })
    }
  })

  return classNames.join(' ')
}

const sortRules = (a, b) => {
  return a.order - b.order
}

cxs.attach = () => {
  if (typeof document === 'undefined') {
    console.warn('Cannot attach stylesheet without a document')
    return
  }

  const rules = cxs.getRules()
  styleTag = styleTag || document.getElementById('cxs')

  if (styleTag === null) {
    styleTag = document.createElement('style')
    styleTag.id = 'cxs'
    document.head.appendChild(styleTag)
    cxs.sheet = styleTag.sheet
  }

  rules.forEach((rule, i) => {
    try {
      cxs.sheet.insertRule(rule, cxs.sheet.cssRules.length)
    } catch (e) {
      // console.warn('Could not insert rule', rule, e)
    }
  })
}

cxs.getRules = () => {
  const cssRules = Object.keys(cache.rules || {})
    .map(k => cache.rules[k].css || false)
    .filter(r => r.length)
    .sort(sortRules)

  return cssRules
}

cxs.getCss = () => {
  return cxs.getRules().join('')
}

cxs.clearCache = () => {
  cache.rules = {}
}

export default cxs

