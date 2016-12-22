
const rehydrate = (cache, css) => {
  let dec

  while (dec = RULE_REG.exec(css)) {
    const media = dec[2] || ''
    const className = dec[3]
    const pseudo = dec[4] || ''
    const key = camel(dec[5])
    const val = removePx(dec[6])
    const id = key + val + media + pseudo

    cache[id] = className
  }

  return cache
}

const RULE_REG = /((@media[^{]+){)?.([^:{]+)(:[^{]+)?{([^:]+):([^}]+)}}?/g

const camel = (str) => str.replace(/-[a-z]/g, (g) => g[1].toUpperCase())

const removePx = (str) => str.replace(/px$/, '')

export default rehydrate

