
import yo from 'yo-yo'
import cxs from '../src'
import { createElement } from 'bel'
import hyperx from 'hyperx'


const cxsCreateElement = (tag, props, children) => {
  if (props.className && typeof props.className === 'object') {
    props.className = cxs(props.className)
  }
  return createElement(tag, props, children)
}

const jx = hyperx(cxsCreateElement)

const colors = [
  '#000',
  '#222',
  '#444',
  '#666',
  '#888',
]

const Button = ({
  text,
  className,
  onclick = () => {}
}) => {
  return jx`
    <button className=${{
        boxSizing: 'border-box',
        border: 'none',
        borderRadius: 3,
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'bold',
        display: 'inline-block',
        padding: 8,
        margin: 0,
        color: 'white',
        appearance: 'none',
        backgroundColor: 'black',
        ...className
      }}
      onclick=${onclick}>
      ${text}
    </button>
  `
}

const store = {
  _state: {
    title: 'Hello cxs',
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
      fontFamily: '-apple-system, sans-serif',
      padding: 32,
      '@media screen and (min-width:40em)': {
        padding: 64
      }
    },
    heading: {
    },
    buttons: {
      display: 'flex',
      marginLeft: -8,
      marginRight: -8,
    },
    button: {
      flex: '1 1 auto',
      margin: 8
    },
    block: {
      textAlign: 'center',
      fontSize: 48,
      height: 64,
      padding: 32,
      color: 'white',
      backgroundColor: colors[count % colors.length]
    }
  }

  return jx`
    <div className=${cx.root}>
      <h1 className=${cx.heading}>
        ${title} ${count}
      </h1>
      <div className=${cx.block}>
        ${count}
      </div>
      <div className=${cx.buttons}>
        ${Button({
          text: '-',
          className: cx.button,
          onclick: (e) => setState({ count: state.count - 1 })
        })}
        ${Button({
          text: '+',
          className: cx.button,
          onclick: (e) => setState({ count: state.count + 1 })
        })}
      </div>
    </div>
  `
}

console.log('hello')

const update = (store) => {
  const newTree = view(store)
  yo.update(tree, newTree)
  // cxs.attach()
  console.log(cxs.getRules().length)
  console.log(cxs.getRules())
}

const tree = view(store)
// cxs.attach()

store.subscribe(update)

document.body.appendChild(tree)

