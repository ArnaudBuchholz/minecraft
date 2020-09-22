'use strict'

import { declare } from '../../builders.js'
import { types, facing } from './constants.js'

declare('\ud83e\ude94 Pillar', build => {
  build.fill(0, -1, 0, 0, 4, 0, types.stone)
  build.setblock(0, 5, 0, types.soul.campfire)
  const lanterns = [{ x: +1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: +1 }, { x: 0, z: -1 }]
  lanterns.forEach(({ x, z }) => {
    build.setblock(x, 4, z, types.support)
    build.setblock(x, 3, z, types.soul.hangingLantern)
  })
})

declare('\ud83e\uddf3 Teleport temple', build => {
  // cavity (ensure no blocking blocks)
  build.fill(-1, 0, -1, 1, 3, 11, types.air)
  build.fill(-1, -1, 8, 1, -2, 11, types.air)
  // floor
  build.fill(-2, -1, -2, 2, -1, 7, types.block)
  build.fill(-2, -2, 7, 2, -2, 7, types.block)
  build.fill(-2, -3, 8, 2, -3, 12, types.block)
  // right wall (below types.stone)
  build.fill(-2, 0, -1, -2, 0, 12, types.bricks)
  build.fill(-2, -1, 8, -2, -2, 12, types.bricks)
  // left wall (below types.stone)
  build.fill(2, 0, -1, 2, 0, 12, types.bricks)
  build.fill(2, -1, 8, 2, -2, 12, types.bricks)
  // back wall (below types.stone)
  build.fill(-1, 0, 12, 1, -2, 12, types.bricks)
  // types.stone belt
  build.fill(-2, 1, -1, -2, 1, 12, types.stone)
  build.fill(2, 1, -1, 2, 1, 12, types.stone)
  build.fill(-1, 1, 12, 1, 1, 12, types.stone)
  // right wall (above types.stone)
  build.fill(-2, 2, -1, -2, 3, 12, types.bricks)
  // left wall (above types.stone)
  build.fill(2, 2, -1, 2, 3, 12, types.bricks)
  // back wall (above types.stone)
  build.fill(-1, 2, 12, 1, 3, 12, types.bricks)
  // ceiling
  build.fill(-1, 3, 0, 1, 3, 11, types.bricks)
  build.setblock(0, 3, -1, types.topSlab)
  build.setblock(0, 3, -2, types.topSlab)
  // decorations
  build.setblock(0, -1, 0, types.stone)
  build.setblock(-2, 0, -2, types.stairs.front)
  build.setblock(2, 0, -2, types.stairs.front)
  build.fill(-1, 2, 7, 1, 2, 11, types.bricks)
  // right ceiling decorations
  build.setblock(-2, 3, -2, types.invertedStairs.front)
  build.setblock(-1, 3, -2, types.invertedStairs.front)
  build.setblock(-1, 3, -1, types.invertedStairs.right)
  build.fill(-1, 2, 1, -1, 2, 2, types.invertedStairs.right)
  build.fill(-1, 2, 3, -1, 2, 6, types.bricks)
  // left ceiling decorations
  build.setblock(2, 3, -2, types.invertedStairs.front)
  build.setblock(1, 3, -2, types.invertedStairs.front)
  build.setblock(1, 3, -1, types.invertedStairs.left)
  build.fill(1, 2, 1, 1, 2, 2, types.invertedStairs.left)
  build.fill(1, 2, 3, 1, 2, 6, types.bricks)
  // stair down to the teleporter
  build.fill(-1, -1, 7, 1, -1, 7, types.stairs.back)
  build.fill(-1, -2, 8, 1, -2, 8, types.stairs.back)
  // teleporter
  build.setblock(0, -3, 9, { ...types.terracota.magenta, ...facing.back })
  build.setblock(0, -3, 11, { ...types.terracota.magenta, ...facing.front })
  build.setblock(1, -3, 10, { ...types.terracota.magenta, ...facing.left })
  build.setblock(-1, -3, 10, { ...types.terracota.magenta, ...facing.right })
  build.setblock(0, -3, 10, types.command)
  build.setblock(0, -2, 10, types.pressurePlate)
  // Lighting
  build.setblock(0, 2, 0, types.soul.hangingLantern)
  build.setblock(-2, 2, -2, { ...types.soul.torch, ...facing.back })
  build.setblock(-1, 0, 10, types.support)
  build.setblock(-1, -1, 10, types.soul.hangingLantern)
  build.setblock(2, 2, -2, { ...types.soul.torch, ...facing.back })
  build.setblock(1, 0, 10, types.support)
  build.setblock(1, -1, 10, types.soul.hangingLantern)
})

declare('\ud83e\uddea Test', build => {
  build.setblock(0, 0, 2, { $type: 'purpur_stairs', ...facing.front })
  build.setblock(1, 0, 2, { $type: 'barrel', ...facing.back })
  build.setblock(-1, 0, 2, { $type: 'dark_oak_leaves', persistent: true })
  build.setblock(0, 1, 2, types.block)
  build.setblock(0, 1, 1, types.vine.front)
  build.setblock(0, 2, 2, types.block)
  build.setblock(0, 2, 3, types.vine.back)
  build.setblock(0, 3, 2, types.block)
  build.setblock(1, 3, 2, types.vine.left)
  build.setblock(0, 4, 2, types.block)
  build.setblock(-1, 4, 2, types.vine.right)
})
