'use strict'

const _map = require('lodash/map')

function ValidationFailedError (message, data, error) {
  this.name = 'ValidationFailedError'
  this.message = message
  this.data = data
  this.error = error
}

ValidationFailedError.prototype = Object.create(Error.prototype)
ValidationFailedError.prototype.constructor = ValidationFailedError
ValidationFailedError.prototype.toString = function () {
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

ValidationFailedError.is = err => err instanceof Error && err.name === ValidationFailedError.name

module.exports = ValidationFailedError
