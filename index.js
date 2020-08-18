'use script'

require('colors')
require('dotenv').config()
const Rcon = require('modern-rcon')

const host = process.env.MINECRAFT_HOST
const port = parseInt(process.env.MINECRAFT_RCON_PORT, 10)
const password = process.env.MINECRAFT_RCCON_PASSWORD

console.log(`Connecting to ${host}:${port}...`.gray)
const rcon = new Rcon(host, port, password)

rcon.connect()
  .then(() => {
    console.log('Connected'.green)
    return rcon.send('help')
  })
  .then(res => console.log(res.gray))
  .then(() => {
    console.log('Connected'.green)
    return rcon.send('fill 98 200 -56 98 200 -56 air')
  })
  .then(res => console.log(res.gray))
  .then(() => rcon.disconnect())
  .catch(() => console.log('Disconnected'.purple))
