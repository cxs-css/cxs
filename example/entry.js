
import yo from 'yo-yo'
import ccx, { getRules } from '../src/ccx'

const colors = [
  'cyan',
  'magenta',
  'yellow'
]


const store = {
  _state: {
    title: 'Hello ccx',
    count: 0
  },
  get state () {
    return store._state
  },
  set state (obj) {
    store._state = { ...state, ...obj }
    store.listeners.forEach(l => l(store))
  },
  setState (obj) {
    store._state = { ...store.state, ...obj }
    store.listeners.forEach(l => l(store))
  },
  listeners: [],
  subscribe (listener) {
    if (typeof listener === 'function') {
      store.listeners.push(listener)
    }
  }
}

const view = (store) => {
  const { setState, state } = store
  const { title, count } = state

  const cx = {
    root: {
      fontFamily: '-apple-system, sans-serif'
    },
    heading: {
      display: 'flex',
      alignItems: 'center',
      color: 'magenta'
    },
    block: {
      textAlign: 'center',
      fontSize: 48,
      height: 64,
      padding: 32,
      backgroundColor: colors[count % colors.length]
    }
  }

  return yo`
    <div className=${ccx(cx.root)}>
      <h1 className=${ccx(cx.heading)}>
        ${title} ${count}
      </h1>
      <button
        onclick=${(e) => {
          const count = state.count + 1
          setState({ count })
        }}>
        +
      </button>
      <div className=${ccx(cx.block)}>
        ${count}
      </div>
    </div>
  `
}

console.log('hello')

const style = document.createElement('style')
style.id = 'ccx'
document.head.appendChild(style)
const addStyles = () => {
  const cssRules = getRules()
  cssRules.forEach((r, i) => style.sheet.insertRule(r, i))
  console.log(cssRules.length)
  console.log(style.sheet)
}

const update = (store) => {
  const newTree = view(store)
  yo.update(tree, newTree)
  addStyles()
}

const tree = view(store)
addStyles()

store.subscribe(update)

document.body.appendChild(tree)

