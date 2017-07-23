import React from 'react'
import objss from 'objss'
import { cxs } from './index'

const component = (Comp, opts = {}) => (strings, ...args) => {
  const Component = props => {
    const decs = createDeclarations(strings, args)(props)

    if (typeof Comp === 'function') Comp(props)

    const rule = cxs(decs, opts)
    const className = [
      rule.toString(),
      props.className || ''
    ].join(' ').trim()

    return (
      <Comp
        {...props}
        className={className}
      />
    )
  }

  Component.push = opts => component(Component, opts)
  Component.media = media => component(Component, { media })
  Component.hover = component(Component, { descendant: ':hover' })
  Component.focus = component(Component, { descendant: ':focus' })
  Component.active = component(Component, { descendant: ':active' })
  Component.disabled = component(Component, { descendant: ':disabled' })

  return Component
}

export const createDeclarations = (strings, args) => props => {
  return strings.map((string, i) => {
    const val = args[i] || ''
    const token = typeof val === 'function' ? val(props) : val
    const parsed = typeof token === 'object'
      ? objss(token)
      : token
    return string + parsed
  }).join('')
}

export default component