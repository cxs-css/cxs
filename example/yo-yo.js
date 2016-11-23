
// yo-yo example

import yo from 'yo-yo'
import cxs from '../src'
import { createElement } from 'bel'
import hyperx from 'hyperx'
import pkg from '../package.json'
import readme from '../README.md'

const cxsCreateElement = (tag, props, children) => {
  if (props.className && typeof props.className === 'object') {
    props.className = cxs(props.className)
  }
  return createElement(tag, props, children)
}

const h = hyperx(cxsCreateElement)

const store = {
  _state: {
    count: 0
  },
  get state () {
    return store._state
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
  inverse,
  ...props
}) => {
  const cx = {
    boxSizing: 'border-box',
    border: 'none',
    borderRadius: 3,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'bold',
    display: 'inline-block',
    padding: 16,
    margin: 0,
    appearance: 'none',
    textDecoration: 'none',
    color: inverse ? 'black' : 'white',
    backgroundColor: inverse ? 'cyan' : 'black',
    ...className,
    ':hover': {
      boxShadow: 'inset 0 0 0 999px rgba(0, 0, 0, .125)'
    }
  }

  if (props.href) {
    return h`
      <a className=${cx} ${props}>
        ${text}
      </a>
    `
  } else {
    return h`
      <button className=${cx} ${props}>
        ${text}
      </button>
    `
  }
}

const Video = ({
  children
} = {}) => {
  const cx = {
    root: {
      position: 'relative',
      backgroundColor: 'black'
    },
    container: {
      maxWidth: 1024,
      margin: 'auto'
    },
    inner: {
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
    },
    children: {
      position: 'relative',
      zIndex: 1
    }
  }
  return h`
    <div className=${cx.root}>
      <div className=${cx.container}>
        <div className=${cx.inner}>
          <iframe className=${cx.iframe}
            width='420' height='315'
            src='http://www.youtube.com/embed/PrZZfaDp02o?rel=0&amp;controls=0&amp;showinfo=0'
            frameborder='0' allowfullscreen></iframe>
        </div>
      </div>
      ${children}
      <div className=${cx.children}>
      </div>
    </div>
  `
}

const Header = () => {
  const cx = {
    inner: {
      display: 'inline-block',
      maxWidth: 384,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      padding: 48,
      color: 'white'
    },
    title: {
      display: 'inline-block',
      fontSize: 64,
      margin: 0,
      fontWeight: 500,
      lineHeight: 1,
      backgroundColor: 'black',
      '@media (min-width: 40em)': {
        fontSize: 96
      }
    },
    description: {
      display: 'inline',
      backgroundColor: 'black'
    },
    button: {
      marginTop: 32
    }
  }

  return h`
    <header>
      ${Video({
        children: h`
          <div className=${cx.inner}>
            <h1 className=${cx.title}>cxs</h1>
            <br />
            <p className=${cx.description}>${pkg.description}</p>
            <br />
            ${Button({
              className: cx.button,
              inverse: 'true',
              href: 'https://github.com/jxnblk/cxs',
              text: 'GitHub'
            })}
          </div>
        `
      })}
    </header>
  `
}

const mono = 'Menlo, monospace'
const Readme = () => {
  const cx = {
    fontSize: 16,
    lineHeight: 1.5,
    padding: 32,
    maxWidth: 640,
    margin: 'auto',
    h1: {
      fontSize: 32,
      fontWeight: 500,
      lineHeight: 1,
      marginBottom: 32
    },
    h2: {
      marginTop: 48
    },
    h3: {
      marginTop: 32
    },
    a: {
      color: '#07c'
    },
    code: {
      fontFamily: mono,
      fontSize: '.875rem'
    },
    pre: {
      fontFamily: mono,
      fontSize: '.875rem',
      padding: 16,
      overflowX: 'scroll',
      backgroundColor: '#f3f3f3'
    }
  }

  const root = h`
    <div className=${cx}></div>
  `

  root.innerHTML = readme

  return root
}

const Css = () => {
  const cx = {
    root: {
      padding: 32,
      maxWidth: 640,
      margin: 'auto'
    },
    pre: {
      fontFamily: mono,
      fontSize: 14,
      lineHeight: 1.25,
      padding: 16,
      overflowX: 'scroll',
      backgroundColor: '#f3f3f3'
    }
  }

  const css = cxs.css()
    .replace(/;/g, ';\n  ')
    .replace(/{/g, ' {\n  ')
    .replace(/}/g, '}\n')

  return h`
    <div className=${cx.root}>
      <h4>Generated CSS for this page</h4>
      <pre className=${cx.pre}>${css.length}\n${css}</pre>
    </div>
  `
}

const View = (store) => {
  const cx = {
    root: {
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }
  }

  return h`
    <div className=${cx.root}>
      ${Header()}
      ${Readme()}
      ${Css()}
    </div>
  `
}

const update = (store) => {
  const newTree = View(store)
  yo.update(tree, newTree)
}

const tree = View(store)

store.subscribe(update)

yoApp.appendChild(tree)
