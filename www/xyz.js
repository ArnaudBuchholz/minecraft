'use strict'

export default function factory (read, write) {
  const int = value => parseInt(value, 10)

  function parse (value, centered = false) {
    if (value.length) {
      const [, tx, ty, tz] = /(-?\d+)(?:\.\d+)?,?\s+(-?\d+)(?:\.\d+)?,?\s+(-?\d+)(?:\.\d+)?/.exec(value)
      let x = int(tx)
      const y = int(ty)
      let z = int(tz)
      if (centered) {
        if (x < 0) {
          --x
        }
        if (z < 0) {
          --z
        }
      }
      const isValid = !(isNaN(x) || isNaN(y) || isNaN(z))
      const isProtected = isValid && xyz.isProtected(x, y, z)
      return { x, y, z, isValid, isProtected }
    }
    return { x: NaN, y: NaN, z: NaN, isValid: false }
  }

  function xyz (value = read()) {
    const result = parse(value)
    const {x, y, z, isValid} = result
    if (isValid) {
      document.cookie = `last-xyz=${x} ${y} ${z}; expires=Fri, 31 Dec 9999 23:59:59 GMT`
    }
    return result
  }
  
  xyz.set = function (value = '') {
    const {x, y, z, isValid, isProtected} = parse(value)
    write(`${x} ${y} ${z}`, isProtected)
  }

  xyz.setCentered = function (value = '') {
    const {x, y, z, isValid, isProtected} = parse(value, true)
    write(`${x} ${y} ${z}`, isProtected)
  }
  
  const protectedAreas = []
  
  xyz.isProtected = (x, y, z) => {
    return protectedAreas.filter(area => {
      const distance = xyz.distance(x, y, z, area.x, area.y, area.z)
      return distance < area.distance
    })[0]
  }

  xyz.addProtectedArea = (value, distance) => {
    const {x, y, z, isValid} = parse(value)
    if (isValid) {
      protectedAreas.push({x, y, z, distance})
    }
  }

  xyz.distance = (x1, y1, z1, x2, y2, z2) => {
    const dx = x1 - x2
    const dy = y1 - y2
    const dz = z1 - z2
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }

  xyz.set((document.cookie
    .split('; ')
    .find(row => row.startsWith('last-xyz')) || '=')
    .split('=')[1]
  )

  return xyz
}
