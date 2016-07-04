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

module.exports = EntityDeletedError
