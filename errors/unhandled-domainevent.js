'use strict'

function UnhandledDomainEvent (name) {
  this.name = 'UnhandledDomainEvent'
  this.message = 'Unhandled domain event'
  this.name = name
}
UnhandledDomainEvent.prototype = Object.create(Error.prototype)
UnhandledDomainEvent.prototype.constructor = UnhandledDomainEvent
UnhandledDomainEvent.prototype.toString = function () {
  return this.message + ' (' + this.name + ')'
}

module.exports = UnhandledDomainEvent
