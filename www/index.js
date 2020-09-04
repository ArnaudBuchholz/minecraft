'use strict'

let user
const protectedAreas = []
const byId = document.getElementById.bind(document)

async function data (path) {
  const response = await fetch(`/data/${path}`, {
    method: 'GET'
  })
  if (!response.ok) {
    throw response.statusText
  }
  return response.json()
}

function xyz ({ from = byId('xyz').value, asNumber = false, saveAsLast = true }) {
  if (from.length) {
    if (saveAsLast) {
      byId('last-position').value = from
      document.cookie = `last-position=${xyz}; expires=Fri, 31 Dec 9999 23:59:59 GMT`
    }
    const coords = from.split(' ')
    function getCoord (index) {
      const coord = coords[index]
      if (asNumber) {
        return parseInt(coord, 10)
      }
      return coord
    }
    return {
      x: getCoord(0),
      y: getCoord(1),
      z: getCoord(2)
    }
  }
}
const lastSavedPosition = (document.cookie
  .split('; ')
  .find(row => row.startsWith('last-position')) || '=')
  .split('=')[1]
byId('last-position').value = lastSavedPosition
byId('xyz').value = lastSavedPosition

function facing () {
  const select = byId('facing')
  return select.options[select.selectedIndex].value
}

const actions = {
  position: async () => {
    const output = await rcon(`execute at ${user} run teleport ${user} ~ ~ ~`)
    if (!output) {
      byId('xyz').value = ''
      return
    }
    const coords = /(-?\d+)\.\d+, (-?\d+)\.\d+, (-?\d+)\.\d+/.exec(output)
    byId('xyz').value = `${coords[1]} ${coords[2]} ${coords[3]}`
  },

  teleport: () => {
    const { x, y, z } = xyz()
    const rotation = { N: -180, S: 0, W: 90, E: -90 }[facing()]
    if (x !== undefined) {
      rcon(`teleport ${user} ${x} ${y} ${z} ${rotation} 0`)
    }
  },

  building: async () => {
    let { x, y, z } = xyz({ asNumber: true })
    if (isNaN(x) || isNaN(y) || isNaN(z)) {
      console.error('Check x y z', x, y, z)
      return
    }
    const build = new Builder({ x, y, z }, facing())
    const buildings = byId('buildings')
    builder[buildings.options[buildings.selectedIndex].value](build)
    byId('area-to-erase').value = build.area
  },

  erase: () => {
    const area = byId('area-to-erase').value
    if (area) {
      rcon(`fill ${area} air`)
    }
  }
}

document.addEventListener('click', event => {
  const { target } = event
  if (target.tagName === 'BUTTON') {
    if (target.dataset.action) {
      actions[target.dataset.action]()
    } else if (target.dataset.cmd) {
      rcon(target.dataset.cmd.replace(/\$\{user\}/g, user)).then(console.log)
    }
  }
})

const option = (value, label = value) => {
  const element = document.createElement('option')
  element.value = value
  element.appendChild(document.createTextNode(label))
  return element
}

window.addEventListener('load', async () => {
  user = await data('user.json')
  const shortcuts = await data('shortcuts.json')
  shortcuts.forEach(shortcut => {
    if (shortcut.protect) {
      protectedAreas.push({
        ...xyz({ from: shortcut.xyz, asNumber: true, saveAsLast: false }),
        distance: shortcut.protect
      })
      shortcut.label = '\u26a0\ufe0f ' + shortcut.label
    }
    byId('shortcuts').appendChild(option(shortcut.xyz, shortcut.label))
  })
  byId('shortcuts').addEventListener('change', function () {
    const option = this.options[this.selectedIndex]
    byId('xyz').value = option.value
  })
  const buildings = await data('buildings/.')
  buildings.forEach(fileName => {
    const script = document.createElement('script')
    script.src = `data/buildings/${fileName}`
    document.body.appendChild(script)
  })
})

function builder (label, factory) {
  builder[label] = factory
  byId('buildings').appendChild(option(label))
}

function setCompass (edges, vertical, horizontal) {
  const ids = ['up', 'left', 'down', 'right']
  ids.forEach((id, index) => {
    byId(`compass-${id}`).innerHTML = edges.charAt(index)
  })
  byId('compass-vertical').innerHTML = vertical
  byId('compass-horizontal').innerHTML = horizontal
}

const compass = {
  S: () => setCompass('SWNE', '+Z', '+X'),
  W: () => setCompass('WNES', '+X', '-Z'),
  N: () => setCompass('NESW', '-Z', '-X'),
  E: () => setCompass('ESWN', '-X', '+Z')
}

byId('facing').addEventListener('change', () => {
  compass[facing()]()
})

const alphabet = '\u311A\u3105\u3118\u3109\u311C\u3108\u310D\u310F\u3127\u3110\u310E\u310C\u3107\u310B\u311B\u3106\u3111\u3116\u3119\u310A\u3128\u3125\u3120\u3112\u312D\u3117'

byId('message').addEventListener('change', function () {
  byId('encrypted').value = this.value.toUpperCase().split('').map(char => {
    const index = char.charCodeAt(0) - 65
    if (index >= 0 && index < 27) {
      return alphabet[index]
    }
    return ' '
  }).join('')
})