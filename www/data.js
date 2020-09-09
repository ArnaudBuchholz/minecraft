'use strict'

export default async function (path) {
  const response = await fetch(`/data/${path}`, {
    method: 'GET'
  })
  if (!response.ok) {
    throw response.statusText
  }
  return response.json()
}
