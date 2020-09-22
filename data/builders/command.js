'use strict'

import { declare } from '../../builders.js'
import { types } from './constants.js'

declare('\ud83e\uddf0 Command block', build => {
  build.setblock(0, 0, 0, types.command)
})
