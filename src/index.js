
import hash from 'node-murmurhash'
import find from 'lodash/find'
import createRules from './create-rules'

export let styleTag = null
export let cache = {}

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
        if (!cache[rule.id]) {
          cache[rule.id] = rule
        }
      })
    }
  })

  cxs.attach()
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

  let matches = []
  rules.forEach((rule, i) => {
    const match = find(cxs.sheet.cssRules, sheetRule => {
      const reg = new RegExp('^' + sheetRule.selectorText)
      return reg.test(rule)
    })

    if (match) {
      matches.push(match)
      // console.log('match', match, rule)
    }

    if (!match) {
      try {
        cxs.sheet.insertRule(rule, cxs.sheet.cssRules.length)
      } catch (e) {
        // console.warn('Could not insert rule', rule, e)
      }
    }
  })
}

cxs.getRules = () => {
  const cssRules = Object.keys(cache || {})
    .map(k => cache[k].css || false)
    .filter(r => r.length)
    .sort(sortRules)

  return cssRules
}

cxs.getCss = () => {
  return cxs.getRules().join('')
}

cxs.clearCache = () => {
  cache = {}
}

export default cxs

