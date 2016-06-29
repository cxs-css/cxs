
const cache = {
  _rules: {},
  get rules () {
    return cache._rules
  },
  set rules (obj) {
    cache._rules = {
      ...obj
    }
  },
  add: (key, value) => {
    cache._rules = {
      ...cache._rules,
      [key]: value
    }
    cache.update()
  },
  listeners: [],
  subscribe: (listener) => {
    if (typeof listener === 'function') {
      cache.listeners.push(listener)
    }
  },
  update: () => {
    cache.listeners.forEach(l => l(cache.rules))
  }
}

export default cache

