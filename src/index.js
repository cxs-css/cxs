
import hash from 'murmurhash-js/murmurhash3_gc'
import createRules from './create-rules'
import sheet from './sheet'

export const cache = []

const cxs = (style) => {
  const classNames = []
  const hashname = 'cxs-' + hash(JSON.stringify(style), 128)
  const rules = createRules(hashname, style)

  rules.filter(r => !(/:/.test(r.selector)))
    .filter(r => !(/\s/.test(r.selector)))
    .forEach(r => {
      classNames.push(r.selector.replace(/^\./, ''))
    })

  rules
    .filter(r => cache.indexOf(r.id) < 0)
    .forEach(r => {
      cache.push(r.id)
      sheet.insert(r.css)
    })

  return classNames.reduce((a, b) => {
    if (a.indexOf(b) > -1) return a
    return [ ...a, b ]
  }, []).join(' ')
}

cxs.sheet = sheet

cxs.clear = () => {
  while (cache.length) {
    cache.pop()
  }
}

Object.defineProperty(cxs, 'rules', {
  get () {
    return sheet.rules()
  }
})

Object.defineProperty(cxs, 'css', {
  get () {
    return sheet.rules().map(r => r.cssText).join('')
  }
})

export default cxs

