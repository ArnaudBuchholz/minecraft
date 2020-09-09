'use strict'

export const byId = document.getElementById.bind(document)

export const option = (value, label = value) => {
  if (value.selectedIndex !== undefined) {
    return value.options[value.selectedIndex]
  }
  const element = document.createElement('option')
  element.value = value
  element.appendChild(document.createTextNode(label))
  return element
}
