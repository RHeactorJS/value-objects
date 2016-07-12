'use strict'

const Joi = require('joi')
const ValidationFailedException = require('./errors').ValidationFailedException
const t = require('tcomb')

const schema = Joi.object().keys({
  email: Joi.string().email({minDomainAtoms: 2}).lowercase().required()
})

/**
 * @param {String} email
 * @constructor
 * @throws ValidationFailedException if the creation fails due to invalid data
 */
function EmailValue (email) {
  Joi.validate({email}, schema, (err, data) => {
    if (err) {
      throw new ValidationFailedException('Not an email: ' + email, data, err)
    }
    this.email = data.email
  })
}

EmailValue.prototype.toString = function () {
  return this.email
}

EmailValue.Type = t.irreducible('EmailValue', (x) => x.constructor.name === EmailValue.name)

module.exports = EmailValue
