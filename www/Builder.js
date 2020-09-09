'use strict'

import rcon from './rcon.js'

const rotate = {
  S: (rx, rz) => { return { x: rx, z: rz } },
  W: (rx, rz) => { return { x: -rz, z: rx } },
  N: (rx, rz) => { return { x: -rx, z: -rz } },
  E: (rx, rz) => { return { x: rz, z: -rx } }
}

const minmax = (value1, value2) => {
  if (value1 < value2) {
    return { min: value1, max: value2 }
  }
  return { min: value2, max: value1 }
}

export default class Builder { // eslint-disable-line no-unused-vars
  pos (rx, ry, rz) {
    const { x: tx, z: tz } = rotate[this._facing](rx, rz)
    const x = this._x + tx
    const y = this._y + ry
    const z = this._z + tz
    this._minx = Math.min(this._minx, x)
    this._maxx = Math.max(this._maxx, x)
    this._miny = Math.min(this._miny, y)
    this._maxy = Math.max(this._maxy, y)
    this._minz = Math.min(this._minz, z)
    this._maxz = Math.max(this._maxz, z)
    return { x, y, z }
  }

  block (description) {
    if (typeof description === 'string') {
      return `minecraft:${description}`
    }
    let literal = description.$type
    const modifiers = Object.keys(description)
      .filter(key => !key.startsWith('$'))
      .map(key => {
        let modifier = description[key]
        if (typeof modifier === 'object') {
          modifier = modifier[this._facing] // assuming variation based on facing
        }
        return `${key}=${modifier}`
      })
    if (modifiers) {
      literal += `[${modifiers.join(',')}]`
    }
    return `minecraft:${literal}`
  }

  setblock (rx, ry, rz, description) {
    const { x, y, z } = this.pos(rx, ry, rz)
    rcon(`setblock ${x} ${y} ${z} ${this.block(description)}`)
  }

  fill (rx1, ry1, rz1, rx2, ry2, rz2, description) {
    const { x: x1, y: y1, z: z1 } = this.pos(rx1, ry1, rz1)
    const { x: x2, y: y2, z: z2 } = this.pos(rx2, ry2, rz2)
    const { min: minx, max: maxx } = minmax(x1, x2)
    const { min: miny, max: maxy } = minmax(y1, y2)
    const { min: minz, max: maxz } = minmax(z1, z2)
    rcon(`fill ${minx} ${miny} ${minz} ${maxx} ${maxy} ${maxz} ${this.block(description)}`)
  }

  get area () {
    return `${this._minx} ${this._miny} ${this._minz} ${this._maxx} ${this._maxy} ${this._maxz}`
  }

  constructor ({ x, y, z }, facing) {
    this._x = x
    this._y = y
    this._z = z
    this._facing = facing
    this._minx = Number.POSITIVE_INFINITY
    this._miny = Number.POSITIVE_INFINITY
    this._minz = Number.POSITIVE_INFINITY
    this._maxx = Number.NEGATIVE_INFINITY
    this._maxy = Number.NEGATIVE_INFINITY
    this._maxz = Number.NEGATIVE_INFINITY
  }
}
