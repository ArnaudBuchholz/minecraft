'use strict'

export const facing = {
  front: { facing: { S: 'south', W: 'west', N: 'north', E: 'east' } },
  left: { facing: { S: 'east', W: 'south', N: 'west', E: 'north' } },
  right: { facing: { S: 'west', W: 'north', N: 'east', E: 'south' } },
  back: { facing: { S: 'north', W: 'east', N: 'south', E: 'west' } }
}

export const types = {
  air: 'air',

  block: 'netherite_block',
  stone: 'chiseled_polished_blackstone',
  bricks: 'polished_blackstone_bricks',
  topSlab: { $type: 'polished_blackstone_slab', type: 'top' },
  support: 'polished_blackstone_brick_wall',
  stairs: {
    front: { $type: 'polished_blackstone_stairs', ...facing.front },
    left: { $type: 'polished_blackstone_stairs', ...facing.left },
    right: { $type: 'polished_blackstone_stairs', ...facing.right },
    back: { $type: 'polished_blackstone_stairs', ...facing.back }
  },
  invertedStairs: {
    front: { $type: 'polished_blackstone_stairs', ...facing.front, half: 'top' },
    left: { $type: 'polished_blackstone_stairs', ...facing.left, half: 'top' },
    right: { $type: 'polished_blackstone_stairs', ...facing.right, half: 'top' },
    back: { $type: 'polished_blackstone_stairs', ...facing.back, half: 'top' }
  },
  pressurePlate: 'polished_blackstone_pressure_plate',

  soul: {
    hangingLantern: { $type: 'soul_lantern', hanging: true },
    torch: { $type: 'soul_wall_torch' },
    campfire: { $type: 'soul_campfire', lit: true }
  },

  command: 'command_block',

  light: {
    shroom: 'shroomlight',
    glowstone: 'glowstone',
    hangingLantern: { $type: 'lantern', hanging: true }
  },

  redstone: {
    lamp: 'redstone_lamp',
    block: 'redstone_block'
  },
  vine: {
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
  },
  terracota: {
    magenta: { $type: 'magenta_glazed_terracotta' },
    black: { $type: 'black_glazed_terracotta' },
    purple: { $type: 'purple_glazed_terracotta' }
  }
}
