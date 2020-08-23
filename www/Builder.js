'use strict'

const rotate = {
  S: (rx, rz) => { return { x: rx, z: rz } },
  W: (rx, rz) => { return { x: -rz, z: rx } },
  N: (rx, rz) => { return { x: -rx, z: -rz } },
  E: (rx, rz) => { return { x: rz, z: -rx } }
}

class Builder { // eslint-disable-line no-unused-vars
  coords (rx, ry, rz) {
    const { x, z } = rotate[this._facing](rx, rz)
    return { x: this._x + x, y: this._y + ry, z: this._z + z }
  }

  block (rx, ry, rz, description) {
    const { x, y, z } = this.coords(rx, ry, rz)
    let block
    if (typeof description === 'string') {
      block = description
    } else {
      block = description.$type
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
        block += `[${modifiers.join(',')}]`
      }
    }
    rcon(`setblock ${x} ${y} ${z} minecraft:${block}`)
  }

  constructor ({ x, y, z }, facing) {
    this._x = x
    this._y = y
    this._z = z
    this._facing = facing
  }
}
