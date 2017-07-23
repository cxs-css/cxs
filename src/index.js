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

export const cxs = (style, opts = {}) => {
  const {
    child,
    media,
  } = opts
  const key = [
    style,
    child,
    media,
    opts.className,
    opts.selector
  ].join('_')

  if (cache[key]) return cache[key]

  const className = opts.className || createClassName()
  const selector = opts.selector || '.' + className

  const css = createCSS(selector, style, child, media)
  sheet.insert(css)

  const rule = {
    toString: () => '' + className,
    push: (style, opts) => cxs(style, Object.assign(opts, { className })),
    hover: (style) => cxs(style, { child: ':hover', className }),
    focus: (style) => cxs(style, { child: ':focus', className }),
    active: (style) => cxs(style, { child: ':active', className }),
    disabled: (style) => cxs(style, { child: ':disabled', className }),
    media: (media, style) => cxs(style, { media, className }),
  }

  cache[key] = Object.assign({}, rule)

  return rule
}

export const createCSS = (selector, declarations, child = '', media) => {
  const rule = [
    selector,
    child,
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
