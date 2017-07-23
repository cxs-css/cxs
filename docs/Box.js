import cxs from 'cxs/component'
import colors from './colors'

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

const scaleVal = n => {
  if (typeof n !== 'number') return n
  const neg = n < 0 ? -1 : 1
  const i = Math.abs(n)
  return neg * (scale[i] || i)
}

const space = props => {
  const decs = []

  for (let key in props) {
    if (!reg.test(key)) continue
    const [ a, b ] = key
    const prop = [ properties[a], directions[b] ]
      .filter(n => !!n)
      .join('')
    const val = scaleVal(props[key])
    decs.push({ [prop]: val })
  }

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

const per = n => typeof n !== 'number' || n > 1 ? n : (n * 100) + '%'

const width = props => props.w
  ? { width: per(props.w) }
  : null

const color = props => props.color
  ? { color: colors[props.color] || props.color }
  : null

const bg = props => props.bg
  ? { backgroundColor: colors[props.bg] || props.bg }
  : null

const Box = cxs('div')`
  ${space}
  ${width}
  ${color}
  ${bg}
`

export default Box
