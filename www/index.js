'use strict'

import { byId, option } from './tools.js'
import data from './data.js'
import Builder from './Builder.js'
import xyzHelper from './xyz.js'
import rcon from './rcon.js'

const facing = () => option(byId('facing')).value
const user = () => option(byId('users')).value
const xyz = xyzHelper(() => byId('xyz').value, (value, isProtected) => {
  const input = byId('xyz')
  input.value = value
  if (isProtected) {
    input.classList.add('protected')
  } else {
    input.classList.remove('protected')
  }
})

const actions = {
  users: async () => {
    const output = await rcon(`list`)
    const users = byId('users')
    users.innerHTML = ''
    output.split('online:')[1].replace(/\w+/ig, name => users.appendChild(option(name)))
  },

  position: async () => {
    const output = await rcon(`execute at ${user()} run teleport ${user()} ~ ~ ~`)
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
      rcon(`teleport ${user()} ${x} ${y} ${z} ${rotation} 0`)
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
/*
    const buildings = byId('buildings')
    builder[option(buildings).value](build)
*/
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
      rcon(target.dataset.cmd.replace(/\$\{user\(\)\}/g, user())).then(console.log)
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
    xyz.set(option(this).value)
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

/*
function builder (label, factory) {
  builder[label] = factory
  byId('buildings').appendChild(option(label))
}
*/
