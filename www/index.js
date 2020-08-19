'use strict'

const user = 'Abubuhh' // Could be loaded from env variable

async function rcon (cmd) {
  const response = await fetch('/rcon', {
    method: 'post',
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

function setBlock(x, y, z, type) {
  return rcon(`setblock ${x} ${y} ${z} minecraft:${type}`)
}

const buildings = {
  'pillar': async function (x, y, z) {
    for (let h = -1; h < 5; ++h) {
      await setBlock(x, y + h, z, 'chiseled_polished_blackstone')
    }
    await setBlock(x, y + 5, z, 'soul_campfire[lit=true]')
    await setBlock(x + 1, y + 4, z, 'polished_blackstone_brick_wall')
    await setBlock(x + 1, y + 3, z, 'soul_lantern[hanging=true]')
    await setBlock(x - 1, y + 4, z, 'polished_blackstone_brick_wall')
    await setBlock(x - 1, y + 3, z, 'soul_lantern[hanging=true]')
    await setBlock(x, y + 4, z + 1, 'polished_blackstone_brick_wall')
    await setBlock(x, y + 3, z + 1, 'soul_lantern[hanging=true]')
    await setBlock(x, y + 4, z - 1, 'polished_blackstone_brick_wall')
    await setBlock(x, y + 3, z - 1, 'soul_lantern[hanging=true]')
  }
}


document.addEventListener('click', event => {
  const { target } = event
  if (target.tagName === 'BUTTON') {
    if (target.dataset.cmd) {
      rcon(target.dataset.cmd.replace(/\$\{user\}/g, user)).then(console.log)
    } else if (target.dataset.building) {
      rcon(`execute at ${user} run teleport ${user} ~ ~ ~`)
        .then(output => {
          const coords = /(-?\d+)\.\d+, (-?\d+)\.\d+, (-?\d+)\.\d+/.exec(output)
          const x = parseInt(coords[1], 10)
          const y = parseInt(coords[2], 10)
          const z = parseInt(coords[3], 10)
          buildings[target.dataset.building](x, y, z)
        })
    }
  }
})

const shortcuts = {
  Home: '79 200 -56',
  Maxime: '-22 68 -210',

  'Portal to Nether fortress': '6267 71 -1489',

  'Shelter 1': '-159 73 -238',
  'Temple 1': '42 70 -180',
  'Temple 2': '-35 64 49',

  'Village 2': '136 90 349',
  'Village 3': '-165 88 227',
  'Mansion': '-14016 63 -4882',
  'Ocean ruins': '480 ~ -576',
  'Ocean monument': '-303 57 -859',
  'Stronghold': '182 27 -1440',
  'Hidden treasure': '233 58 -408',
  'Desert pyramid': '170 74 154',
  'Jungle pyramid': '-4760 71 -4953'
}

Object.keys(shortcuts).forEach(label => {
  const button = document.createElement('button')
  button.dataset.cmd = `teleport ${user} ${shortcuts[label]}`
  button.appendChild(document.createTextNode(label))
  document.getElementById('shortcuts').appendChild(button)
  document.getElementById('shortcuts').appendChild(document.createTextNode('\n'))
})
