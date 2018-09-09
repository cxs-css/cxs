function createTheme (theme) {
  return Object.assign(function (keys) {
    return keys.split('.')
    .reduce((a, b) => (a && a[b]) ? a[b] : null, theme)
  }, theme)
}

export default createTheme
