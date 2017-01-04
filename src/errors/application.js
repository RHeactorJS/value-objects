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

ApplicationError.is = err => err instanceof Error && err.name === ApplicationError.name

module.exports = ApplicationError
