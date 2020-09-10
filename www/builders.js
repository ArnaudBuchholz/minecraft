'use strict'

const builders = {}

export function declare (label, factory) {
  builders[label] = factory
  document.body.dispatchEvent(new CustomEvent("builder", {
    detail: {
      label
    }
  }))
}
