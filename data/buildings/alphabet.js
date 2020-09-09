'use strict'

import { declare } from '../../builders.js'
import { byId } from '../../tools.js'

declare('\u311A Alphabet', () => {})

/*
`    <input type="text" id="message"> <input type="text" id="encrypted" readonly>
`
*/

const alphabet = '\u311A\u3105\u3118\u3109\u311C\u3108\u310D\u310F\u3127\u3110\u310E\u310C\u3107\u310B\u311B\u3106\u3111\u3116\u3119\u310A\u3128\u3125\u3120\u3112\u312D\u3117'

byId('message').addEventListener('change', function () {
  byId('encrypted').value = this.value.toUpperCase().split('').map(char => {
    const index = char.charCodeAt(0) - 65
    if (index >= 0 && index < 27) {
      return alphabet[index]
    }
    return ' '
  }).join('')
})
