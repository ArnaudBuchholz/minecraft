'use strict'

import { declare } from '../../builders.js'
import { byId, option } from '../../tools.js'
import data from '../../data.js'
import { types, facing } from './constants.js'

const myId = declare('\ud83e\uddf1 Maze', build => {
  const { height, width } = mazePreview
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(mazePreview, 0, 0)
  const thickness = 10 // could be detected from image
  const mazeWidth = width / thickness
  const mazeDepth = height / thickness
  const mazeHeight = 4
  const mazexoffset = 2 * Math.floor(mazeWidth / 2)
  build.fill(-mazexoffset, -1, 0, 2 * mazeWidth - 1 - mazexoffset, -1, 2 * mazeDepth - 1, types.block)
  for (let mazez = 0; mazez < mazeDepth; ++mazez) {
    for (let mazex = 0; mazex < mazeWidth; ++mazex) {
      const imageData = ctx.getImageData(width - (mazex + 1) * thickness, height - (mazez + 1) * thickness, 1, 1)
      let type
      if (imageData.data[0] === 0) {
        type = types.block
      } else {
        type = types.air
      }
      const rx = mazex * 2 - mazexoffset
      const rz = mazez * 2
      build.fill(rx, 0, rz, rx + 1, mazeHeight - 1, rz + 1, type)
      if (type === types.air) {
        const offset = (mazex + mazez) % 2
        build.setblock(rx + offset, mazeHeight - 1, rz + offset, types.light.hangingLantern)
        const plant = (offset + 1) % 2
        if (mazez === mazeDepth - 1) {
          // exit
          build.setblock(rx + 1, -1, 2 * mazeDepth - 1, { ...types.terracota.purple, ...facing.front })
          build.setblock(rx, -1, 2 * mazeDepth - 1, { ...types.terracota.purple, ...facing.right })
          build.setblock(rx + 1, -1, 2 * mazeDepth - 2, { ...types.terracota.purple, ...facing.left })
          build.setblock(rx, -1, 2 * mazeDepth - 2, { ...types.terracota.purple, ...facing.back })
        } else if (mazez === 0) {
          // entrance
          build.setblock(rx + 1, -1, 1, { ...types.terracota.black, ...facing.back })
          build.setblock(rx, -1, 1, { ...types.terracota.black, ...facing.left })
          build.setblock(rx + 1, -1, 0, { ...types.terracota.black, ...facing.right })
          build.setblock(rx, -1, 0, { ...types.terracota.black, ...facing.front })
        } else if (Math.random() < 0.3) {
          build.setblock(rx + plant, mazeHeight, rz + plant, types.block)
          build.setblock(rx + plant, mazeHeight - 1, rz + plant, types.vine.weeping)
        } else if (Math.random() < 0.3) {
          build.setblock(rx + plant, 0, rz + plant, types.vine.twisting)
        }
      }
    }
  }
  build.fill(-mazexoffset, mazeHeight, 0, 2 * mazeWidth - 1 - mazexoffset, mazeHeight, 2 * mazeDepth - 1, types.block)
})

const mazeArea = document.body.appendChild(document.createElement('div'))
mazeArea.setAttribute('style', 'display: none')
mazeArea.innerHTML = `<hr />
Use <a href="https://keesiemeijer.github.io/maze-generator/#generate" target="blank" rel="noreferrer noopener">https://keesiemeijer.github.io/maze-generator/</a><br />
<select id="mazeSelector"></select><br /><br />
<img id="mazePreview">
<div id="mazeCanvas"></div>`

function show (visible) {
  let display
  if (visible) {
    display = 'block'
  } else {
    display = 'none'
  }
  mazeArea.setAttribute('style', `display: ${display};`)
}
show(false)

const mazePreview = byId('mazePreview')

const mazeSelected = () => {
  const fileName = option(byId('mazeSelector')).value
  mazePreview.setAttribute('src', `/data/builders/mazes/${fileName}`)
}

document.addEventListener('change', event => {
  if (event.target.id === 'builders') {
    show(option(event.target).value === myId)
  } else if (event.target.id === 'mazeSelector') {
    mazeSelected()
  }
})

data('builders/mazes').then(mazes => {
  mazes.forEach(fileName => byId('mazeSelector').appendChild(option(fileName)))
  mazeSelected()
})
