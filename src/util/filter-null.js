export default obj => {
  const newObj = {}
  for (let key in obj) {
    if (obj[key] !== null) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
