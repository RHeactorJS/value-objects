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

module.exports = UnauthorizedError
