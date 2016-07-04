'use strict'

function PermissionDeniedError (message) {
  this.name = 'PermissionDeniedError'
  this.message = message
}
PermissionDeniedError.prototype = Object.create(Error.prototype)
PermissionDeniedError.prototype.constructor = PermissionDeniedError
PermissionDeniedError.prototype.toString = function () {
  return this.message
}

module.exports = PermissionDeniedError
