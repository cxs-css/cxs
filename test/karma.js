
import yo from 'yo-yo'
import cxs from '../src'


const orange = '#f80'
const yellow = '#cf0'
const green = '#0fa'
const blue = '#0cf'

const colors = [
  orange,
  yellow,
  green,
  blue
]

const Box = (n) => {
  const cx = cxs({
    display: 'inline-block',
    padding: 64,
    backgroundColor: colors[n % colors.length]
  })

  return yo`<div className=${cx}>${n}</div>`
}

const App = ({ count, duration, ratio }) => {
  const cx = {
    root: cxs({
      padding: 48,
      fontFamily: 'SF Mono, Roboto Mono, Monaco, monospace'
    }),
    boxes: cxs({
      textAlign: 'center'
    }),
    results: cxs({
      fontSize: 32,
      fontWeight: 'bold'
    })
  }
  const boxes = Array.from({ length: count })
    .map((n, i) => i)
    .map(Box)

  return yo`
    <div className=${cx.root}>
      <h1>cxs perf test</h1>
      <pre>${count}</pre>
      ${ratio && (
        yo`
          <pre className=${cx.results}>${duration}ms, ratio: ${ratio}</pre>
        `
      )}
      <div className=${boxes}>
        ${boxes}
      </div>
    </div>
  `
}

const state = {
  count: 0
}

const tree = App(state)

const update = (state) => {
  const next = App(state)
  yo.update(tree, next)
}

document.body.appendChild(tree)

const interval = setInterval(() => {
  state.count++
  update(state)
}, 50)

describe('perf', () => {
  const start = Date.now()
  it('should render', function (done) {
    this.timeout(10000)
    console.log(tree.outerHTML)
    setTimeout(() => {
      const end = Date.now()
      state.duration = end - start
      state.ratio = state.duration / state.count
      console.log(state)
      clearInterval(interval)
      update(state)
      done()
    }, 3000)
  })
})

