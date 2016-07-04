'use strict'

const ValidationFailedException = require('./validation-failed')
const EntityNotFoundError = require('./entity-not-found')
const EntryAlreadyExistsError = require('./entry-already-exists')
const AccessDeniedError = require('./access-denied')
const ConflictError = require('./conflict')
const UnhandledDomainEvent = require('./unhandled-domainevent')
const UnauthorizedError = require('./unauthorized')
const ApplicationError = require('./application')
const TokenExpiredError = require('./token-expired')
const EntityDeletedError = require('./entity-deleted')
const PermissionDeniedError = require('./permission-denied')

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
