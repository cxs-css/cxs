let _id = 0
export const uuid = () => _id++
export const createClassName = () => 'x' + uuid().toString(36)

export const Sheet = (id) => {
  const browser = typeof window !== 'undefined'

  if (!browser) {
    const serverSheet = {
      rules: [],
      insert: rule => serverSheet.rules.push(rule),
      reset: () => { serverSheet.rules = [] },
      get css () {
        return serverSheet.rules.join('')
      }
    }
    return serverSheet
  }

  const tag = document.createElement('style')
  tag.id = id || '__cxs__'

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
    get: () => [].slice.call(sheet.cssRules)
      .map(rule => rule.cssText)
      .join('')
  })

  return sheet
}

export let cache = {}
export const sheet = Sheet('__cxs__')
export const mediaSheet = Sheet('__cxs-media__')

export const cxs = (style, opts = {}) => {
  const {
    child,
    media
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
  if (media) {
    mediaSheet.insert(css)
  } else {
    sheet.insert(css)
  }

  const rule = {
    toString: () => '' + className,
    _push: (child, media) => style => cxs(style, { child, media, className }),
    push: (style, opts) => cxs(style, Object.assign(opts, { className })),
    child: (child, style) => rule._push(child)(style),
    media: (media, style) => rule._push(null, media)(style)
  }

  rule.hover = rule._push(':hover')
  rule.focus = rule._push(':focus')
  rule.active = rule._push(':active')
  rule.disabled = rule._push(':disabled')

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
  get: () => sheet.css + mediaSheet.css
})

export const reset = () => {
  sheet.reset()
  mediaSheet.reset()
  cache = {}
  _id = 0
}

cxs.reset = reset

export default cxs
