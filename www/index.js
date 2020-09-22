'use strict'

import { byId, option } from './tools.js'
import data from './data.js'
import Builder from './Builder.js'
import xyzHelper from './xyz.js'
import rcon from './rcon.js'
import { execute } from './builders.js'

const facing = () => option(byId('facing')).value
const user = () => option(byId('users')).value
const xyz = xyzHelper(() => byId('xyz').value, (value, isProtected) => {
  const input = byId('xyz')
  input.value = value
  if (isProtected) {
    document.body.classList.add('protected')
  } else {
    document.body.classList.remove('protected')
  }
})

const actions = {
  users: async () => {
    const output = await rcon('list')
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
    xyz.setCentered(output)
  },

  teleport: () => {
    const { x, y, z } = xyz()
    const cx = Math.floor(10 * x + 5) / 10
    const cz = Math.floor(10 * z + 5) / 10
    const rotation = { N: -180, S: 0, W: 90, E: -90 }[facing()]
    if (x !== undefined) {
      rcon(`teleport ${user()} ${cx} ${y} ${cz} ${rotation} 0`)
    }
  },

  build: async () => {
    const { x, y, z, isValid, isProtected } = xyz()
    if (!isValid) {
      console.error('Check x y z', x, y, z)
      return
    }
    // Check protected areas
    if (isProtected) {
      rcon(`particle barrier ${x} ${y} ${z} 1 1 1 0 1000`)
      alert('Protected area')
      return
    }
    const build = new Builder({ x, y, z }, facing())
    execute(option(byId('builders')).value, build)
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
      rcon(target.dataset.cmd.replace(/\$\{user\(\)\}/g, user()))
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
  document.body.addEventListener('declare-builder', event => {
    const { id, label } = event.detail
    const select = byId('builders')
    const labels = [].map.call(select.options, element => element.label).concat(label).sort()
    const index = labels.sort().indexOf(label)
    const newChild = option(id, label)
    if (index === labels.length - 1) {
      select.appendChild(newChild)
    } else {
      select.insertBefore(newChild, select.options[index])
    }
  })
  const buildings = await data('builders/.')
  buildings
    .filter(fileName => fileName.endsWith('.js'))
    .forEach(fileName => {
      const script = document.createElement('script')
      script.src = `data/builders/${fileName}`
      script.type = 'module'
      document.body.appendChild(script)
    })
  actions.users()
})
