const floor = 'netherite_block'
const stone = 'chiseled_polished_blackstone'
const support = 'polished_blackstone_brick_wall'
const stairs = 'polished_blackstone_stairs'
const lantern = { $type: 'soul_lantern', hanging: true }
const fire = { $type: 'soul_campfire', lit: true }

const front = { S: 'south', W: 'west', N: 'north', E: 'east' }
const back = { S: 'north', W: 'east', N: 'south', E: 'west' }

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
  // current position is the teleport target
  // platform
  let x, y, z
  for (z = -2; z < 7; ++z) {
    for (x = -2; x < 3; ++x) {
      build.block(x, -1, z, floor)
    }
  }
  build.block(0, -1, 0, stone)
  build.block(-2, 0, -2, { $type: stairs, facing: back })
  build.block(2, 0, -2, { $type: stairs, facing: back })
})

builder('test', build => {
  build.block(0, 0, 2, { $type: 'purpur_stairs', facing: front })
  build.block(1, 0, 2, { $type: 'barrel', facing: back })
  build.block(-1, 0, 2, {
    $type: 'dark_oak_leaves',
    persistent: true
  })
})
