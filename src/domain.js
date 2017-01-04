'use strict'

const ValidationFailedError = require('./errors/validation-failed')
const t = require('tcomb')

/**
 * A second level domain
 *
 * @param {String} domain
 * @constructor
 * @throws ValidationFailedException if the creation fails due to invalid data
 */
function DomainValue (domain) {
  // http://stackoverflow.com/a/30007882
  if (!/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/.test(domain)) {
    throw new ValidationFailedError('Not a domain: ' + domain)
  }
  if (domain.split('.').length !== 2) {
    throw new ValidationFailedError('Only second level domains are allowed')
  }
  this.domain = domain
}

DomainValue.prototype.toString = function () {
  return this.domain
}

/**
 * @param {DomainValue} domain
 * @returns {boolean}
 */
DomainValue.prototype.equals = function (domain) {
  DomainValue.Type(domain)
  return this.domain === domain.toString()
}

DomainValue.Type = t.irreducible('DomainValue', (x) => x.constructor.name === DomainValue.name)

module.exports = DomainValue
