import cxs from 'cxs/component'

const reg = /^[mp][trblxy]?$/

const scale = [
  0,
  4,
  8,
  16,
  32,
  64,
  128
]

const px = n => typeof n === 'number' ? n + 'px' : n
const space = props => {
  const decs = []

  for (let key in props) {
    if (!reg.test(key)) continue
    const [ a, b ] = key
    const prop = [ properties[a], directions[b] ]
      .filter(n => !!n)
      .join('')
    const val = props[key]
    console.log(key, a, b, px(scale[val]))
    decs.push({ [prop]: scale[val] || val })
    // decs.push(prop + ':' + px(scale[val] || val))
  }
  console.log(decs)

  return decs.reduce((a, b) => Object.assign(a, b), {})
  return decs.join(';')
}

const properties = {
  m: 'margin',
  p: 'padding'
}

const directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
}

const Box = cxs('div')`
  ${space}
`

export default Box
