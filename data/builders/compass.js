'use strict'

import { declare } from '../../builders.js'
import { byId, option } from '../../tools.js'

declare('\ud83e\udded Compass', () => {})

/*
`
<div id="compass" style="position: relative; background-color: gray; width: 100px; height: 100px;">
  <div id="compass-up" style="position: absolute; left: 45px;">S</div>
  <div id="compass-left" style="position: absolute; top: 43px;">W</div>
  <div id="compass-down" style="position: absolute; left: 45px; top: 85px;">N</div>
  <div id="compass-right" style="position: absolute; left: 85px; top: 43px;">E</div>
  <div style="position: absolute; top: 50px; width: 100px; height: 2px; border-top: 1px solid black;"></div>
  <div style="position: absolute; left: 50px; width: 2px; height: 100px; border-left: 1px solid black;"></div>
  <div style="position: absolute; left: 25px; top: 50px; width: 25px; height: 2px; border-top: 3px solid purple;"></div>
  <div id="compass-horizontal" style="position: absolute; left: 25px; top: 52px; color: purple;">+X</div>
  <div style="position: absolute; left: 50px; top: 25px; width: 2px; height: 25px; border-left: 3px solid blue;"></div>
  <div id="compass-vertical"style="position: absolute; left: 54px; top: 25px; color: blue;">+Z</div>
</div>
`
*/

function setCompass (edges, vertical, horizontal) {
  const ids = ['up', 'left', 'down', 'right']
  ids.forEach((id, index) => {
    byId(`compass-${id}`).innerHTML = edges.charAt(index)
  })
  byId('compass-vertical').innerHTML = vertical
  byId('compass-horizontal').innerHTML = horizontal
}

const compass = {
  S: () => setCompass('SWNE', '+Z', '+X'),
  W: () => setCompass('WNES', '+X', '-Z'),
  N: () => setCompass('NESW', '-Z', '-X'),
  E: () => setCompass('ESWN', '-X', '+Z')
}

document.addEventListener('change', event => {
  if (event.target.id === 'facing') {
    compass[option(event.target).value]()
  }
})
