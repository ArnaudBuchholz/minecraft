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

function xyz () {
  const xyz = byId('xyz').value
  if (xyz.length) {
    byId('last-position').value = xyz
    document.cookie = `last-position=${xyz}; `
    const coords = xyz.split(' ')
    return {
      x: coords[0],
      y: coords[1],
      z: coords[2]
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
    let { x, y, z } = xyz()
    x = parseInt(x, 10)
    y = parseInt(y, 10)
    z = parseInt(z, 10)
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
