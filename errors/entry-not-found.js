'use strict'

function EntryNotFoundError (message) {
  this.name = 'EntryNotFoundError'
  this.message = message
}

EntryNotFoundError.prototype = Object.create(Error.prototype)
EntryNotFoundError.prototype.constructor = EntryNotFoundError
EntryNotFoundError.prototype.toString = function () {
  return this.message
}

EntryNotFoundError.is = err => err instanceof Error && err.name === EntryNotFoundError.name

module.exports = EntryNotFoundError
