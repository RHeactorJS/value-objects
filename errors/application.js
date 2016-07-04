'use strict'

function ApplicationError (message) {
  this.name = 'ApplicationError'
  this.message = message
}

ApplicationError.prototype = Object.create(Error.prototype)
ApplicationError.prototype.constructor = ApplicationError
ApplicationError.prototype.toString = function () {
  return this.message
}

module.exports = ApplicationError
