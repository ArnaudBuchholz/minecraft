'use strict'

class Builder { // eslint-disable-line no-unused-vars
  block (rx, ry, rz, description) {
    let block
    if (typeof description === 'string') {
      block = description
    } else {
      block = description.$type
      const modifiers = Object.keys(description)
        .map(key => !key.startsWith('$'))
        .map(key => {
          const modifier = description[key]
          if (typeof modifier === 'string') {
            return modifier
          }
          // assuming variation based on facing
          return modifier[this._facing]
        })
      if (modifiers) {
        block += `[${modifiers.join(',')}]`
      }
    }
    rcon(`setblock ${this._x + rx} ${this._y + ry} ${this._z + rz} minecraft:${block}`)
  }

  constructor ({ x, y, z }, facing) {
    this._x = x
    this._y = y
    this._z = z
    this._facing = facing
  }
}
