'use strict'

const builders = []

export function declare (label, factory) {
  const id = builders.length.toString()
  builders.push(factory)
  document.body.dispatchEvent(new CustomEvent('declare-builder', {
    detail: {
      id,
      label
    }
  }))
  return id
}

export function execute (id, build) {
  builders[id](build)
}
