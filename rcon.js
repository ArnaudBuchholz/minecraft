'use strict'

require('dotenv').config()
const Rcon = require('modern-rcon')

const host = process.env.MINECRAFT_HOST
const port = parseInt(process.env.MINECRAFT_RCON_PORT, 10)
const password = process.env.MINECRAFT_RCCON_PASSWORD

const body = require('reserve/body')

module.exports = async (request, response) => {
  const cmd = await body(request)
console.log(cmd)
  const rcon = new Rcon(host, port, password)
  return rcon.connect()
    .then(() => rcon.send(cmd))
    .then(res => {
        response.writeHead(200, {
        'content-type': 'text/plain'
      })
      response.end(res)
      return rcon.disconnect()
    })
    .catch(reason => {
      response.writeHead(400, {
          'content-type': 'text/plain'
      })
      response.end(reason.toString())
    })
    .then(() => undefined)
}