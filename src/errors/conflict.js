'use strict'

function ConflictError (message) {
  this.name = 'ConflictError'
  this.message = message
}
ConflictError.prototype = Object.create(Error.prototype)
ConflictError.prototype.constructor = ConflictError
ConflictError.prototype.toString = function () {
  return this.message
}

ConflictError.is = err => err instanceof Error && err.name === ConflictError.name

module.exports = ConflictError
