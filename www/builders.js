'use strict'

const builders = []

export function declare (label, factory) {
  const id = builders.length
  builders.push(factory)
  document.body.dispatchEvent(new CustomEvent("declare-builder", {
    detail: {
      id,
      label
    }
  }))
}

export function execute (id, build) {
  builders[id](build)
}
