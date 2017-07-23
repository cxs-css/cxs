import React from 'react'
import objss from 'objss'
import tag from 'tag-hoc'
import { cxs } from './index'

const component = (Comp, opts = {}) => (strings, ...args) => {
  const { removeProps = [] } = opts
  const isTag = typeof Comp === 'string'
  const isClassComponent = Comp.prototype && Comp.prototype.render
  const Tag = tag(removeProps)
  const Base = isTag ? Tag(Comp) : Comp

  const Component = props => {
    if (typeof Base.createCXSRule === 'function') Base(props)

    const rule = Component.createCXSRule(props)
    const className = [
      rule.toString(),
      props.className || ''
    ].join(' ').trim()

    return (
      <Base
        {...props}
        className={className}
      />
    )
  }

  Component.createCXSRule = props => {
    const decs = createDeclarations(strings, args)(props)
    return cxs(decs, opts)
  }

  Component.push = opts => component(Component, opts)
  Component.media = media => component(Component, { media })
  Component.hover = component(Component, { child: ':hover' })
  Component.focus = component(Component, { child: ':focus' })
  Component.active = component(Component, { child: ':active' })
  Component.disabled = component(Component, { child: ':disabled' })

  return Component
}

export const createDeclarations = (strings, args) => props => {
  return strings.map((string, i) => {
    const val = args[i] || ''
    const token = typeof val === 'function' ? val(props) : val
    const parsed = token !== null && typeof token === 'object'
      ? objss(token)
      : token || ''
    return string + parsed
  }).join('')
}

export default component
