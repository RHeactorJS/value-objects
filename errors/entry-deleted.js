'use strict'

function EntityDeletedError (message, entity) {
  this.name = 'EntityDeletedError'
  this.message = message
  Object.defineProperty(this, 'entity', {value: entity})
}

EntityDeletedError.prototype = Object.create(Error.prototype)
EntityDeletedError.prototype.constructor = EntityDeletedError
EntityDeletedError.prototype.toString = function () {
  return this.message
}

EntityDeletedError.is = err => err instanceof Error && err.name === EntityDeletedError.name

module.exports = EntityDeletedError
