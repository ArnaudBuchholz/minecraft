'use strict'

const { readdir, stat } = require('fs')
const { promisify } = require('util')
const readdirAsync = promisify(readdir)
const statAsync = promisify(stat)
const { join } = require('path')

module.exports = async (request, response, subdir) => {
  const dataPath = join(__dirname, 'data', subdir)
  try {
    const dataStat = await statAsync(dataPath)
    if (dataStat && dataStat.isDirectory()) {
      const names = await readdirAsync(dataPath)
      response.writeHead(200, {
        'content-type': 'application/json'
      })
      response.end(JSON.stringify(names))
    }
  } catch (e) {
    // ignored
    return
  }
}
