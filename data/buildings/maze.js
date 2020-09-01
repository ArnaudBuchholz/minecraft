(function () {
  'use strict'

  const mazeArea = document.body.appendChild(document.createElement('div'))
  mazeArea.innerHTML = `<hr />
Use <a href="https://keesiemeijer.github.io/maze-generator/#generate" target="blank" rel="noreferrer noopener">https://keesiemeijer.github.io/maze-generator/</a>
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

  document.getElementById('buildings').addEventListener('change', function () {
    const building = this.options[this.selectedIndex].value
    show(building === 'maze')
  })

  show(false)

  const mazeSelector = byId('mazeSelector')
  const mazePreview = byId('mazePreview')

  const mazeSelected = (function () {
    const fileName = this.options[this.selectedIndex].value
    mazePreview.setAttribute('src', `/data/mazes/${fileName}`)
  }).bind(mazeSelector)

  mazeSelector.addEventListener('change', mazeSelected)

  data('mazes').then(mazes => {
    mazes.forEach(fileName => mazeSelector.appendChild(option(fileName)))
    mazeSelected()
  })

  builder('maze', build => {
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
    build.fill(-mazexoffset, -1, 0, 2 * mazeWidth - 1 - mazexoffset, -1, 2 * mazeDepth - 1, block)
    for (let mazex = 0; mazex < mazeWidth; ++mazex) {
      for (let mazez = 0; mazez < mazeDepth; ++mazez) {
        const imageData = ctx.getImageData(mazex * thickness, mazez * thickness, 1, 1)
        let type
        if (imageData.data[0] === 0) {
          type = block
        } else {
          type = air
        }
        const rx = mazex * 2 - mazexoffset
        const rz = mazez * 2
        build.fill(rx, 0, rz, rx + 1, mazeHeight - 1, rz + 1, type)
        if (type === air) {
          const offset = (mazex + mazez) % 2
          build.setblock(rx + offset, mazeHeight - 1, rz + offset, { $type: 'lantern', hanging: true })
        }
      }
    }
    build.fill(-mazexoffset, mazeHeight, 0, 2 * mazeWidth - 1 - mazexoffset, mazeHeight, 2 * mazeDepth - 1, bricks)
  })
}())
