'use strict'

function UnauthorizedError (message) {
  this.name = 'UnauthorizedError'
  this.message = message
}

UnauthorizedError.prototype = Object.create(Error.prototype)
UnauthorizedError.prototype.constructor = UnauthorizedError
UnauthorizedError.prototype.toString = function () {
  return this.message
}

UnauthorizedError.is = err => err instanceof Error && err.name === UnauthorizedError.name

module.exports = UnauthorizedError
