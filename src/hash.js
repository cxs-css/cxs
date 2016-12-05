
export default (str) => {
  let val = 5381
  let i = str.length

  while (i) {
    val = (val * 33) ^ str.charCodeAt(--i)
  }

  return '_' + (val >>> 0).toString(36)
}

