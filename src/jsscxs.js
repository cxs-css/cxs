
import sheet from './jss-sheet'

const cxs = (...args) => {
  const classNames = []

  args.forEach(arg => {
    if (typeof arg === 'string') {
      classNames.push(arg)
    } else {
      const rule = sheet.addRule('cxs', arg)
      classNames.push(rule.className)
    }
  })

  // sheet.attach()
  return classNames.join(' ')
}

export default cxs

