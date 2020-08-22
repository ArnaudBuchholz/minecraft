'use strict'

class Builder { // eslint-disable-line no-unused-vars
  block (rx, ry, rz, type) {
    rcon(`setblock ${this._x + rx} ${this._y + ry} ${this._z + rz} minecraft:${type}`)
  }

  constructor ({ x, y, z }, orientation) {
    this._x = x
    this._y = y
    this._z = z
    this._orientaton = orientation
  }
}
