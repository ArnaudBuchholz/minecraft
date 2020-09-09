'use strict'

import { byId } from './tools.js'
import data from './data.js'
import Builder from './Builder.js'
import xyzHelper from './xyz.js'
import rcon from './rcon.js'

const xyz = xyzHelper(() => byId('xyz').value, (value, isProtected) => {
  const input = byId('xyz')
  input.value = value
  if (isProtected) {
    input.classList.add('protected')
  } else {
    input.classList.remove('protected')
  }
})

function facing () {
  const select = byId('facing')
  return select.options[select.selectedIndex].value
}

const option = (value, label = value) => {
  const element = document.createElement('option')
  element.value = value
  element.appendChild(document.createTextNode(label))
  return element
}

const actions = {
  users: async () => {
    const output = await rcon(`list`)
    const users = byId('users')
    users.innerHTML = ''
    output.split('online:')[1].replace(/\w+/ig, name => {
      users.appendChild(option(name, name))
    })
  },

  position: async () => {
    const output = await rcon(`execute at ${user} run teleport ${user} ~ ~ ~`)
    if (!output) {
      xyz.set()
      return
    }
    const coords = /(-?\d+)\.\d+, (-?\d+)\.\d+, (-?\d+)\.\d+/.exec(output)
    xyz.set(`${coords[1]} ${coords[2]} ${coords[3]}`)
  },

  teleport: () => {
    const { x, y, z } = xyz()
    const rotation = { N: -180, S: 0, W: 90, E: -90 }[facing()]
    if (x !== undefined) {
      rcon(`teleport ${user} ${x} ${y} ${z} ${rotation} 0`)
    }
  },

  building: async () => {
    const { x, y, z } = xyz().toNumbers()
    if (isNaN(x) || isNaN(y) || isNaN(z)) {
      console.error('Check x y z', x, y, z)
      return
    }
    // Check protected areas
    const area = isProtectedArea(x, y, z)
    if (area) {
      const distance = area.distance / 8
      rcon(`particle barrier ${area.x} ${area.y} ${area.z} ${distance} ${distance} ${distance} 0 1000`)
      alert('Protected area')
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

window.addEventListener('load', async () => {
  const shortcuts = await data('shortcuts.json')
  shortcuts.forEach(shortcut => {
    if (shortcut.protect) {
      xyz.addProtectedArea(shortcut.xyz, shortcut.protect)
      shortcut.label = '\u26a0\ufe0f ' + shortcut.label
    }
    byId('shortcuts').appendChild(option(shortcut.xyz, shortcut.label))
  })
  byId('shortcuts').addEventListener('change', function () {
    const option = this.options[this.selectedIndex]
    xyz.set(option.value)
  })
  const buildings = await data('buildings/.')
  buildings
    .filter(fileName => fileName.endsWith('.js'))
    .forEach(fileName => {
      const script = document.createElement('script')
      script.src = `data/buildings/${fileName}`
      script.type = 'module'
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
