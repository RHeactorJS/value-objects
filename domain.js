'use strict'

const Joi = require('joi')
const ValidationFailedError = require('./errors/validation-failed')
const t = require('tcomb')

const schema = {
  email: Joi.string().required().email({minDomainAtoms: 2}).lowercase()
}

/**
 * A second level domain
 *
 * @param {String} domain
 * @constructor
 * @throws ValidationFailedException if the creation fails due to invalid data
 */
function DomainValue (domain) {
  let email = 'dummy@' + domain
  Joi.validate({email}, schema, (err, data) => {
    if (err || domain.split('.').length !== 2) {
      throw new ValidationFailedError('Not a domain: ' + domain, data, err)
    }
    this.domain = data.email.replace('dummy@', '')
  })
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
