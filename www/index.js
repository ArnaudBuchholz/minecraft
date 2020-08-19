'use strict'

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

document.addEventListener('click', event => {
  const { target } = event
  if (target.tagName === 'BUTTON' && target.dataset.cmd) {
    rcon(target.dataset.cmd.toString()).then(console.log)
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
  button.dataset.cmd = `teleport Abubuhh ${shortcuts[label]}`
  button.appendChild(document.createTextNode(label))
  document.getElementById('shortcuts').appendChild(button)
  document.getElementById('shortcuts').appendChild(document.createTextNode('\n'))
})


