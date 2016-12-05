
export default (...args) => args
  .filter(arg => !!arg)
  .join(' ')

