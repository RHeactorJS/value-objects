'use strict'

function EntityNotFoundError (message) {
  this.name = 'EntityNotFoundError'
  this.message = message
}

EntityNotFoundError.prototype = Object.create(Error.prototype)
EntityNotFoundError.prototype.constructor = EntityNotFoundError
EntityNotFoundError.prototype.toString = function () {
  return this.message
}

EntityNotFoundError.is = err => err instanceof Error && err.name === EntityNotFoundError.name

module.exports = EntityNotFoundError
