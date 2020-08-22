'use strict'

const { readdir } = require('fs')
const readdirAsync = require('util').promisify(readdir)
const { join } = require('path')

module.exports = async (request, response) => {
  const names = await readdirAsync(join(__dirname, 'data/buildings'))
  response.writeHead(200, {
    'content-type': 'application/json'
  })
  response.end(JSON.stringify(names))
}
