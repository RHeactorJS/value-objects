'use strict'

function UnhandledDomainEventError (name) {
  this.name = 'UnhandledDomainEventError'
  this.message = 'Unhandled domain event'
  this.name = name
}
UnhandledDomainEventError.prototype = Object.create(Error.prototype)
UnhandledDomainEventError.prototype.constructor = UnhandledDomainEventError
UnhandledDomainEventError.prototype.toString = function () {
  return this.message + ' (' + this.name + ')'
}

UnhandledDomainEventError.is = err => err instanceof Error && err.name === UnhandledDomainEventError.name

module.exports = UnhandledDomainEventError
