'use strict'

export default function rcon (cmd) {
  let promise
  const { queue, execute, done } = rcon
  const { length } = queue
  if (!length) {
    promise = rcon.execute(cmd)
  } else {
    const last = queue[length - 1]
    promise = last.then(() => execute(cmd))
  }
  queue.push(promise.then(done, done))
  return promise
}

rcon.queue = []

rcon.done = () => {
  rcon.queue.shift()
}

rcon.execute = async cmd => {
  const response = await fetch('/rcon', {
    method: 'POST',
    headers: {
      'content-type': 'text/plain'
    },
    body: cmd
  })
  if (!response.ok) {
    throw response.statusText
  }
  return response.text()
}
