'use strict'

function EntryDeletedError (message, entry) {
  this.name = 'EntryDeletedError'
  this.message = message
  Object.defineProperty(this, 'entry', {value: entry})
}

EntryDeletedError.prototype = Object.create(Error.prototype)
EntryDeletedError.prototype.constructor = EntryDeletedError
EntryDeletedError.prototype.toString = function () {
  return this.message
}

EntryDeletedError.is = err => err instanceof Error && err.name === EntryDeletedError.name

module.exports = EntryDeletedError
