
import yo from 'yo-yo'
import cxs, { options } from '../src'
import { createElement } from 'bel'
import hyperx from 'hyperx'

const cxsCreateElement = (tag, props, children) => {
  if (props.className && typeof props.className === 'object') {
    props.className = cxs(props.className)
  }
  return createElement(tag, props, children)
}

const h = hyperx(cxsCreateElement)

const colors = [
  '#000',
  '#222',
  '#444',
  '#666',
  '#888',
  'cyan',
  '#07f',
  '#70f',
  '#f07',
  'magenta',
  'yellow',
]

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

const Button = ({
  text,
  className,
  onclick = () => {}
}) => {
  return h`
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

// For perf testing
const Box = ({
  color
}) => {
  const cx = {
    height: 32,
    backgroundColor: color
  }

  return h`
    <div className=${cx}>
    </div>
  `
}

const Video = () => {
  const cx = {
    root: {
      position: 'relative',
      height: 0,
      padding: 0,
      paddingBottom: '56.25%'
    },
    iframe: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 0
    }
  }
  return h`
    <div className=${cx.root}>
      <iframe className=${cx.iframe}
        width='420' height='315'
        src='https://www.youtube.com/embed/PrZZfaDp02o?rel=0&amp;controls=0&amp;showinfo=0'
        frameborder='0' allowfullscreen></iframe>
    </div>
  `
}

const View = (store) => {
  const { setState, state } = store
  const { title, count } = state

  const cx = {
    root: {
      fontFamily: 'SF Mono, Roboto Mono, monospace',
      // fontFamily: '-apple-system, sans-serif',
      // padding: 32,
      // '@media screen and (min-width:40em)': {
      //   padding: 64
      // }
    },
    heading: {
      color: 'green',
      '@media (min-width:40em)': {
        padding: 16,
        ':hover': {
          color: 'tomato'
        }
      }
    },
    buttons: {
      display: 'flex',
      marginLeft: -8,
      marginRight: -8,
    },
    button: {
      flex: '1 1 auto',
      margin: 8,
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

  const boxes = Array.from({ length: count })
    .map((n, i) => i)
    .map((n) => {
      return Box({ color: colors[n % colors.length] })
    })

  return h`
    <div className=${cx.root}>
      ${Video()}
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
        ${Button({
          text: '++',
          className: cx.button,
          onclick: (e) => setState({ count: state.count + 8 })
        })}
      </div>
      <div>
        ${boxes}
      </div>
    </div>
  `
}

const update = (store) => {
  const newTree = View(store)
  yo.update(tree, newTree)
}

const tree = View(store)

store.subscribe(update)

document.body.appendChild(tree)

