module.exports = theme => Object.assign(function (keys) {
  return keys.split('.')
    .reduce((a, b) => (a && a[b]) ? a[b] : null, theme)
}, theme)
