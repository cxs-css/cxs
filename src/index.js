let _id = 0
export const uuid = () => _id++
export const createClassName = () => '_' + uuid().toString(36)

export const Sheet = () => {
  const browser = typeof window !== 'undefined'

  if (!browser) {
    const serverSheet = {
      rules: [],
      insert: rule => serverSheet.rules.push(rule),
      reset: () => serverSheet.rules = [],
      get css () {
        return serverSheet.rules.join('')
      }
    }
    return serverSheet
  }

  const tag = document.createElement('style')
  tag.id = '__cxs__'

  document.head.appendChild(tag)

  const sheet = tag.sheet

  sheet.insert = (rule) => {
    const i = sheet.cssRules.length
    sheet.insertRule(rule, i)
  }

  sheet.reset = () => {
    while (sheet.cssRules.length) {
      sheet.deleteRule(0)
    }
  }

  Object.defineProperty(sheet, 'css', {
    get: () => [ ...sheet.cssRules ]
      .map(rule => rule.cssText)
      .join('')
  })

  return sheet
}

export let cache = {}
export const sheet = Sheet()

export const cxs = (...args) => {
  const [ rule, descendant, media, className ] = args
  const key = args.join('_')
  if (cache[key]) return cache[key]

  const cn = className || createClassName()

  const css = createCSS(cn, rule, descendant, media)
  sheet.insert(css)

  const style = {
    toString: () => '' + cn,
    push: (...args) => cxs(args[0], args[1], args[2], cn),
    hover: (rule) => cxs(rule, ':hover', null, cn),
    focus: (rule) => cxs(rule, ':focus', null, cn),
    active: (rule) => cxs(rule, ':active', null, cn),
    disabled: (rule) => cxs(rule, ':disabled', null, cn),
    media: (media, rule) => cxs(rule, null, media, cn),
  }

  cache[key] = Object.assign({}, style)

  return style
}

export const createCSS = (className, declarations, descendant = '', media) => {
  const rule = [
    '.',
    className,
    descendant,
    '{',
    declarations,
    '}'
  ].join('')

  if (!media) return rule

  return [
    media,
    '{',
    rule,
    '}'
  ].join('')
}

Object.defineProperty(cxs, 'css', {
  get: () => sheet.css
})

export const reset = () => {
  sheet.reset()
  cache = {}
  _id = 0
}

cxs.reset = reset

export default cxs
