'use strict'

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
  // cavity (ensure no blocking blocks)
  build.fill(-1, 0, -1, 1, 3, 11, air)
  build.fill(-1, -1, 8, 1, -2, 11, air)
  // floor
  build.fill(-2, -1, -2, 2, -1, 7, floor)
  build.fill(-2, -2, 7, 2, -2, 7, floor)
  build.fill(-2, -3, 8, 2, -3, 12, floor)
  // right wall (below stone)
  build.fill(-2, 0, -1, -2, 0, 12, bricks)
  build.fill(-2, -1, 8, -2, -2, 12, bricks)
  // left wall (below stone)
  build.fill(2, 0, -1, 2, 0, 12, bricks)
  build.fill(2, -1, 8, 2, -2, 12, bricks)
  // back wall (below stone)
  build.fill(-1, 0, 12, 1, -2, 12, bricks)
  // stone belt
  build.fill(-2, 1, -1, -2, 1, 12, stone)
  build.fill(2, 1, -1, 2, 1, 12, stone)
  build.fill(-1, 1, 12, 1, 1, 12, stone)
  // right wall (above stone)
  build.fill(-2, 2, -1, -2, 3, 12, bricks)
  // left wall (above stone)
  build.fill(2, 2, -1, 2, 3, 12, bricks)
  // back wall (above stone)
  build.fill(-1, 2, 12, 1, 3, 12, bricks)
  // ceiling
  build.fill(-1, 3, 0, 1, 3, 11, bricks)
  build.setblock(0, 3, -1, { $type: slab, type: 'top' })
  build.setblock(0, 3, -2, { $type: slab, type: 'top' })
  // decorations
  build.setblock(0, -1, 0, stone)
  build.setblock(-2, 0, -2, { $type: stairs, facing: front })
  build.setblock(2, 0, -2, { $type: stairs, facing: front })
  build.fill(-1, 2, 7, 1, 2, 11, bricks)
  // right ceiling decorations
  build.setblock(-2, 3, -2, { $type: stairs, facing: front, half: 'top' })
  build.setblock(-1, 3, -2, { $type: stairs, facing: front, half: 'top'/*, shape: 'outer_left' */ })
  build.setblock(-1, 3, -1, { $type: stairs, facing: right, half: 'top' })
  build.fill(-1, 2, 1, -1, 2, 2, { $type: stairs, facing: right, half: 'top' })
  build.fill(-1, 2, 3, -1, 2, 6, bricks)
  // left ceiling decorations
  build.setblock(2, 3, -2, { $type: stairs, facing: front, half: 'top' })
  build.setblock(1, 3, -2, { $type: stairs, facing: front, half: 'top'/*, shape: 'outer_left' */ })
  build.setblock(1, 3, -1, { $type: stairs, facing: left, half: 'top' })
  build.fill(1, 2, 1, 1, 2, 2, { $type: stairs, facing: left, half: 'top' })
  build.fill(1, 2, 3, 1, 2, 6, bricks)
  // stair down to the teleporter
  build.fill(-1, -1, 7, 1, -1, 7, { $type: stairs, facing: back })
  build.fill(-1, -2, 8, 1, -2, 8, { $type: stairs, facing: back })
  // teleporter
  build.setblock(0, -3, 9, { $type: arrow, facing: back })
  build.setblock(0, -3, 11, { $type: arrow, facing: front })
  build.setblock(1, -3, 10, { $type: arrow, facing: left })
  build.setblock(-1, -3, 10, { $type: arrow, facing: right })
  build.setblock(0, -3, 10, command)
  build.setblock(0, -2, 10, pressurePlate)
  // Lighting
  build.setblock(0, 2, 0, lantern)
  build.setblock(-2, 2, -2, { $type: walltorch, facing: back })
  build.setblock(-1, 0, 10, support)
  build.setblock(-1, -1, 10, lantern)
  build.setblock(2, 2, -2, { $type: walltorch, facing: back })
  build.setblock(1, 0, 10, support)
  build.setblock(1, -1, 10, lantern)
})

builder('test', build => {
  build.setblock(0, 0, 2, { $type: 'purpur_stairs', facing: front })
  build.setblock(1, 0, 2, { $type: 'barrel', facing: back })
  build.setblock(-1, 0, 2, {
    $type: 'dark_oak_leaves',
    persistent: true
  })
})
