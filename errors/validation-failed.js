'use strict'

const _map = require('lodash/map')

function ValidationFailedException (message, data, error) {
  this.name = 'ValidationFailedException'
  this.message = message
  this.data = data
  this.error = error
}

ValidationFailedException.prototype = Object.create(Error.prototype)
ValidationFailedException.prototype.constructor = ValidationFailedException
ValidationFailedException.prototype.toString = function () {
  let message = this.message
  if (this.error && this.error.isJoi) {
    message += ' (' +
      _map(this.error.details, (detail) => {
        return detail.message
      }).join(', ') + ') '
  }
  if (this.data) {
    message += ' ' + JSON.stringify(this.data)
  }
  return message
}

ValidationFailedException.is = err => err instanceof Error && err.name === ValidationFailedException.name

module.exports = ValidationFailedException
