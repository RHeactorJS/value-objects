'use strict'

const ValidationFailedError = require('./errors/validation-failed')
const t = require('tcomb')

/**
 * @param {String} email
 * @constructor
 * @throws ValidationFailedException if the creation fails due to invalid data
 */
function EmailValue (email) {
  email = email.toLowerCase()
  // http://emailregex.com/
  if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    throw new ValidationFailedError('Not an email: ' + email)
  }
  this.email = email
}

EmailValue.prototype.toString = function () {
  return this.email
}

/**
 * @param {EmailValue} email
 * @returns {boolean}
 */
EmailValue.prototype.equals = function (email) {
  EmailValue.Type(email)
  return this.email === email.toString()
}

EmailValue.Type = t.irreducible('EmailValue', (x) => x.constructor.name === EmailValue.name)

module.exports = EmailValue
