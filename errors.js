'use strict'

const _map = require('lodash/map')

function ValidationFailedException (message, data, error) {
  this.name = 'ValidationFailedException'
  this.message = message
  this.data = data
  this.error = error
}

ValidationFailedException.prototype = Object.create(Error.prototype)
ValidationFailedException.prototype.constructor = ValidationFailedException
ValidationFailedException.prototype.toString = function () {
  let message = this.message
  if (this.error && this.error.isJoi) {
    message += ' (' +
      _map(this.error.details, (detail) => {
        return detail.message
      }).join(', ') + ') '
  }
  if (this.data) {
    message += ' ' + JSON.stringify(this.data)
  }
  return message
}

function EntityNotFoundError (message) {
  this.name = 'EntityNotFoundError'
  this.message = message
}

EntityNotFoundError.prototype = Object.create(Error.prototype)
EntityNotFoundError.prototype.constructor = EntityNotFoundError
EntityNotFoundError.prototype.toString = function () {
  return this.message
}

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

function EntryAlreadyExistsError (message) {
  this.name = 'EntryAlreadyExistsError'
  this.message = message
}

EntryAlreadyExistsError.prototype = Object.create(Error.prototype)
EntryAlreadyExistsError.prototype.constructor = EntryAlreadyExistsError
EntryAlreadyExistsError.prototype.toString = function () {
  return this.message
}

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

function PermissionDeniedError (message) {
  this.name = 'PermissionDeniedError'
  this.message = message
}
PermissionDeniedError.prototype = Object.create(Error.prototype)
PermissionDeniedError.prototype.constructor = PermissionDeniedError
PermissionDeniedError.prototype.toString = function () {
  return this.message
}

function ConflictError (message) {
  this.name = 'ConflictError'
  this.message = message
}
ConflictError.prototype = Object.create(Error.prototype)
ConflictError.prototype.constructor = ConflictError
ConflictError.prototype.toString = function () {
  return this.message
}

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

function UnauthorizedError (message) {
  this.name = 'UnauthorizedError'
  this.message = message
}

UnauthorizedError.prototype = Object.create(Error.prototype)
UnauthorizedError.prototype.constructor = UnauthorizedError
UnauthorizedError.prototype.toString = function () {
  return this.message
}

function ApplicationError (message) {
  this.name = 'ApplicationError'
  this.message = message
}

ApplicationError.prototype = Object.create(Error.prototype)
ApplicationError.prototype.constructor = ApplicationError
ApplicationError.prototype.toString = function () {
  return this.message
}

function TokenExpiredError (token) {
  this.name = 'TokenExpiredError'
  this.message = 'The token expired'
  this.token = token
}

TokenExpiredError.prototype = Object.create(Error.prototype)
TokenExpiredError.prototype.constructor = TokenExpiredError
TokenExpiredError.prototype.toString = function () {
  return this.message
}

module.exports = {
  ValidationFailedException,
  EntityNotFoundError,
  EntryAlreadyExistsError,
  AccessDeniedError,
  ConflictError,
  UnhandledDomainEvent,
  UnauthorizedError,
  ApplicationError,
  TokenExpiredError,
  EntityDeletedError,
  PermissionDeniedError
}
