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
    const canvas = byId('mazeCanvas').appendChild(document.createElement('canvas'))
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(mazePreview, 0, 0)
    const thickness = 10 // could be detected from image
    alert(width / 10 + "x" + height / 10)
    for (let mazex = 0; mazex < width; mazex += thickness) {
      for (let mazey = 0; mazeyz < height; mazey += thickness) {
        const imageData = ctx.getImageData(mazex, mazez, 1, 1)
        if (imageData.data[0] === 0) {
          // wall
        } else {
          // air
        }
      }
    }
  })

}())

