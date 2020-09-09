'use strict'

const builders = {}

export function declare (label, factory) {
  builders[label] = factory
}
