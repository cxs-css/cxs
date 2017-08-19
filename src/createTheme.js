const idx = (obj, keys) => keys
  .reduce((a, b) => (a && a[b]) ? a[b] : null, obj)

module.exports = (theme, scope) => Object.assign(function (arg) {
  const args = arg.split('.')
  const keys = scope ? [ scope, ...args ] : args
  return idx(theme, keys)
}, theme)
