'use strict'

let user
const byId = document.getElementById.bind(document)

async function data (path) {
  const response = await fetch(`/data/${path}`, {
    method: 'GET'
  })
  if (!response.ok) {
    throw response.statusText
  }
  if (path.endsWith('.json')) {
    return response.json()
  }
  return response.text()
}

async function rcon (cmd) {
  const response = await fetch('/rcon', {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: cmd
  })
  if (!response.ok) {
    throw response.statusText
  }
  return response.text()
}

function xyz () {
  const coords = byId('xyz').value.split(' ')
  if (coords.length) {
    return {
      x: parseInt(coords[0], 10),
      y: parseInt(coords[1], 10),
      z: parseInt(coords[2], 10)
    }
  }
}

function setBlock(x, y, z, type) {
  return rcon(`setblock ${x} ${y} ${z} minecraft:${type}`)
}

const actions = {
  position: async () => {
    const output = await rcon(`execute at ${user} run teleport ${user} ~ ~ ~`)
    if (!output) {
      byId('xyz').value = ''
      return
    }
    const coords = /(-?\d+)\.\d+, (-?\d+)\.\d+, (-?\d+)\.\d+/.exec(output)
    const x = parseInt(coords[1], 10)
    const y = parseInt(coords[2], 10)
    const z = parseInt(coords[3], 10)
    byId('xyz').value = `${x} ${y} ${z}`
  },

  teleport: () => {
    const {x, y, z} = xyz()
    if (x !== undefined) {
      rcon(`teleport ${user} ${x} ${y} ${z}`)
    }
  },

  building: async () => {
    const { x, y, z } = xyz()
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
  user = await data('user.txt')
  const shortcuts = await data('shortcuts.json')
  shortcuts.forEach(shortcut => byId('shortcuts').appendChild(option(shortcut.xyz, shortcut.label)))
  byId('shortcuts').addEventListener('change', function () {
    const option = this.options[this.selectedIndex]
    byId('xyz').value = option.value
  })
  const buildings = await data('buildings.json')
  buildings.forEach(fileName => {
    const script = document.createElement('script')
    script.src = `data/buildings/${fileName}`
    document.body.appendChild(script)
  })
})

function builder (label, factory) {
  builder.label = factory
  byId('buildings').appendChild(option(label))
}
