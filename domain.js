'use strict'

const Joi = require('joi')
const ValidationFailedException = require('./errors').ValidationFailedException
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
      throw new ValidationFailedException('Not a domain: ' + domain, data, err)
    }
    this.domain = data.email.replace('dummy@', '')
  })
}

DomainValue.prototype.toString = function () {
  return this.domain
}

DomainValue.Type = t.irreducible('DomainValue', (x) => x.constructor.name === DomainValue.name)

module.exports = DomainValue
