const stone = 'chiseled_polished_blackstone'
const support = 'polished_blackstone_brick_wall'
const lantern = {
  $type: 'soul_lantern',
  hanging: true
}
const fire = {
  $type: 'soul_campfire',
  lit: true
}

builder('pillar', build => {
  for (let y = -1; y < 5; ++y) {
    build.block(0, y, 0, stone)
  }
  build.block(0, 5, 0, fire)
  const lanterns = [{ x: +1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: +1 }, { x: 0, z: -1 }]
  lanterns.forEach(({ x, z }) => {
    build.block(x, 4, z, support)
    build.block(x, 3, z, lantern)
  })
})

builder('teleport temple', build => {
  
})

builder('test', build => {
  build.block(0, 0, 2, {
    $type: 'purpur_stairs',
    facing: {
      S: 'south',
      W: 'west',
      N: 'north',
      E: 'east'
    }
  })
  build.block(1, 0, 2, {
    $type: 'barrel',
    facing: {
      S: 'north',
      W: 'east',
      N: 'south',
      E: 'west'
    }
  })
  build.block(-1, 0, 2, {
    $type: 'dark_oak_leaves',
    persistent: true
  })
})
