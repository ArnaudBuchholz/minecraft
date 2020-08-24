const floor = 'netherite_block'
const stone = 'chiseled_polished_blackstone'
const bricks = 'polished_blackstone_bricks'
const support = 'polished_blackstone_brick_wall'
const stairs = 'polished_blackstone_stairs'
const lantern = { $type: 'soul_lantern', hanging: true }
const walltorch = 'soul_wall_torch'
const fire = { $type: 'soul_campfire', lit: true }

const front = { S: 'south', W: 'west', N: 'north', E: 'east' }
const back = { S: 'north', W: 'east', N: 'south', E: 'west' }

builder('pillar', build => {
  build.fill(0, -1, 0, 0, 4, 0, stone)
  build.setblock(0, 5, 0, fire)
  const lanterns = [{ x: +1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: +1 }, { x: 0, z: -1 }]
  lanterns.forEach(({ x, z }) => {
    build.setblock(x, 4, z, support)
    build.setblock(x, 3, z, lantern)
  })
})

builder('teleport temple', build => {
  build.fill(-2, -1, -2, 2, -1, 7, floor)
  build.fill(-2, -2, 7, 2, -2, 7, floor)
  build.fill(-2, -3, 8, 2, -3, 12, floor)

  build.fill(-2, 0, -1, -2, 0, 12, bricks)
  build.fill(-2, -1, 8, -2, -2, 12, bricks)
  build.fill(2, 0, -1, 2, 0, 12, bricks)
  build.fill(2, -1, 8, 2, -2, 12, bricks)
  build.fill(-1, 0, 12, 1, -2, 12, bricks)

  build.fill(-2, 1, -1, -2, 1, 12, stone)
  build.fill(2, 1, -1, 2, 1, 12, stone)
  build.fill(-1, 1, 12, 1, 1, 12, stone)

  build.fill(-2, 2, -1, -2, 3, 12, bricks)
  build.fill(2, 2, -1, 2, 3, 12, bricks)
  build.fill(-1, 2, 12, 1, 3, 12, bricks)

  build.setblock(-2, 2, -2, { $type: walltorch, facing: back })
  build.setblock(2, 2, -2, { $type: walltorch, facing: back })

  build.setblock(0, -1, 0, stone)
  build.setblock(-2, 0, -2, { $type: stairs, facing: front })
  build.setblock(2, 0, -2, { $type: stairs, facing: front })


})

builder('test', build => {
  build.setblock(0, 0, 2, { $type: 'purpur_stairs', facing: front })
  build.setblock(1, 0, 2, { $type: 'barrel', facing: back })
  build.setblock(-1, 0, 2, {
    $type: 'dark_oak_leaves',
    persistent: true
  })
})
