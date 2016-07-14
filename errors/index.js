'use strict'

const AccessDeniedError = require('./access-denied')
const ApplicationError = require('./application')
const ConflictError = require('./conflict')
const EntryAlreadyExistsError = require('./entry-already-exists')
const EntryDeletedError = require('./entry-deleted')
const EntryNotFoundError = require('./entry-not-found')
const PaymentRequiredError = require('./payment-required')
const TokenExpiredError = require('./token-expired')
const UnhandledDomainEventError = require('./unhandled-domain-event')
const ValidationFailedError = require('./validation-failed')

module.exports = {
  ValidationFailedError,
  EntryNotFoundError,
  EntryAlreadyExistsError,
  AccessDeniedError,
  ConflictError,
  UnhandledDomainEventError,
  ApplicationError,
  TokenExpiredError,
  EntryDeletedError,
  PaymentRequiredError
}
