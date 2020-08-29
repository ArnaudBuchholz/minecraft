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
  const mazePreview =  byId('mazePreview')

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
    const mazeHeight = height / thickness
    build.fill(0, -1, 0, 2 * mazeWidth - 1, -1, 2 * mazeHeight - 1, floor)
    for (let mazex = 0; mazex < mazeWidth; ++mazex) {
      for (let mazez = 0; mazez < mazeHeight; ++mazez) {
        const imageData = ctx.getImageData(mazex * thickness, mazez * thickness, 1, 1)
        let type
        if (imageData.data[0] === 0) {
          type = bricks
        } else {
          type = air
        }
        build.fill(mazex * 2, 0, mazez * 2, mazex * 2 + 1, 2, mazez * 2 + 1, type)
      }
    }
    build.fill(0, 3, 0, 2 * mazeWidth - 1, 3, 2 * mazeHeight - 1, shroomlight)
    build.fill(0, 3, 0, 2 * mazeWidth - 1, 3, 1, bricks)
    build.fill(0, 3, 0, 1, 3, 2 * mazeHeight - 1, bricks)
    build.fill(0, 3, 2 * mazeHeight - 2, 2 * mazeWidth - 1, 3, 2 * mazeHeight - 1, bricks)
    build.fill(2 * mazeWidth - 2, 3, 0, 2 * mazeWidth - 1, 3, 2 * mazeHeight - 1, bricks)
  })

}())

