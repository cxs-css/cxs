
import hash from 'murmurhash-js/murmurhash3_gc'
import debounce from 'lodash.debounce'
import sortBy from 'lodash.sortby'
import createRules from './create-rules'

export let styleTag = null
export let cache = {}

export let options = {
  autoAttach: true,
  debounce: 0
}

const randomHex = () => Math.floor(Math.random() * 16777215).toString(16)
export const styleId = 'cxs-' + hash(randomHex(), 128)

const cxs = (style) => {
  const classNames = []
  const hashname = 'cxs-' + hash(JSON.stringify(style), 128)
  const rules = createRules(hashname, style)

  rules.forEach(r => { cache[r.id] = r })

  rules.filter(r => !(/:/.test(r.selector)))
    .filter(r => !(/\s/.test(r.selector)))
    .forEach(r => classNames.push(r.selector.replace(/^\./, '')))

  if (options.autoAttach) {
    cxs.attach()
  }
  return classNames.reduce((a, b) => {
    if (a.indexOf(b) > -1) return a
    return [ ...a, b ]
  }, []).join(' ')
}

const attach = () => {
  if (typeof document === 'undefined') {
    // console.warn('Cannot attach stylesheet without a document')
    return
  }

  const rules = cxs.rules
  styleTag = styleTag || document.getElementById(styleId)

  if (styleTag === null) {
    styleTag = document.createElement('style')
    styleTag.id = styleId
    document.head.appendChild(styleTag)
    cxs.sheet = styleTag.sheet
  }

  // Insert all rules
  // note: filtering for new rules does not seem to have a huge performance impact
  // .filter(rule => [].slice.call(cxs.sheet.cssRules).map(r => r.selectorText).indexOf(rule.selector) < 0)
  rules
    .forEach(rule => {
      try {
        cxs.sheet.insertRule(rule.css, cxs.sheet.cssRules.length)
      } catch (e) {}
    })
}

cxs.attach = debounce(attach, options.debounce)

cxs.options = options
cxs.clearCache = () => {
  cache = {}
}

Object.defineProperty(cxs, 'rules', {
  get () {
    const unorderedRules = Object
      .keys(cache || {})
      .map(k => cache[k] || false)
      .filter(r => r.css.length);

    return sortBy(unorderedRules, 'order');
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
