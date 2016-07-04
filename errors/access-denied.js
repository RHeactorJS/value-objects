'use strict'

function AccessDeniedError (resource, message) {
  this.name = 'AccessDeniedError'
  this.resource = resource
  this.message = message
}
AccessDeniedError.prototype = Object.create(Error.prototype)
AccessDeniedError.prototype.constructor = AccessDeniedError
AccessDeniedError.prototype.toString = function () {
  let msg = 'Access denied: ' + this.resource
  if (this.message) {
    msg += ' (' + this.message + ')'
  }
  return msg
}

module.exports = AccessDeniedError
