'use strict'

const air = 'air'
const block = 'netherite_block'
const stone = 'chiseled_polished_blackstone'
const bricks = 'polished_blackstone_bricks'
const slab = 'polished_blackstone_slab'
const support = 'polished_blackstone_brick_wall'
const stairs = 'polished_blackstone_stairs'
const lantern = { $type: 'soul_lantern', hanging: true }
const walltorch = 'soul_wall_torch'
const fire = { $type: 'soul_campfire', lit: true }
const command = 'command_block'
const pressurePlate = 'polished_blackstone_pressure_plate'
const shroomlight = 'shroomlight'
const glowstone = 'glowstone'
const redstone = {
  lamp: 'redstone_lamp',
  block: 'redstone_block'
}

const vine = {
  front: {
    $type: 'vine',
    south: { S: true, W: false, N: false, E: false },
    west: { S: false, W: true, N: false, E: false },
    north: { S: false, W: false, N: true, E: false },
    east: { S: false, W: false, N: false, E: true }
  },
  left: {
    $type: 'vine',
    south: { S: false, W: false, N: false, E: true },
    west: { S: true, W: false, N: false, E: false },
    north: { S: false, W: true, N: false, E: false },
    east: { S: false, W: false, N: true, E: false }
  },
  right: {
    $type: 'vine',
    south: { S: false, W: true, N: false, E: false },
    west: { S: false, W: false, N: true, E: false },
    north: { S: false, W: false, N: false, E: true },
    east: { S: true, W: false, N: false, E: false }
  },
  back: {
    $type: 'vine',
    south: { S: false, W: false, N: true, E: false },
    west: { S: false, W: false, N: false, E: true },
    north: { S: true, W: false, N: false, E: false },
    east: { S: false, W: true, N: false, E: false }
  },
  weeping: 'weeping_vines',
  twisting: 'twisting_vines'
}

const terracota = {
  magenta: 'magenta_glazed_terracotta',
  black: 'black_glazed_terracotta',
  purple: 'purple_glazed_terracotta'
}

const front = { S: 'south', W: 'west', N: 'north', E: 'east' }
const left = { S: 'east', W: 'south', N: 'west', E: 'north' }
const right = { S: 'west', W: 'north', N: 'east', E: 'south' }
const back = { S: 'north', W: 'east', N: 'south', E: 'west' }