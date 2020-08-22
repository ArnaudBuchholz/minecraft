const stone = 'chiseled_polished_blackstone'
const support = 'polished_blackstone_brick_wall'
const lantern = 'soul_lantern[hanging=true]'
const fire = 'soul_campfire[lit=true]'

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
