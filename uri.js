'use strict'

const Joi = require('joi')
const ValidationFailedError = require('./errors/validation-failed')
const t = require('tcomb')

/**
 * @param {String} uri
 * @constructor
 * @throws ValidationFailedException if the creation fails due to invalid data
 */
function URIValue (uri) {
  if (!URIValue.is(uri)) {
    throw new ValidationFailedError('Not an URI: ' + uri, {uri})
  }
  this.uri = uri
}

URIValue.prototype.toString = function () {
  return this.uri
}

URIValue.is = (uri) => {
  let r = Joi.validate(uri, Joi.string().uri({scheme: ['https', 'http']}).lowercase().required())
  return !r.error
}

URIValue.Type = t.irreducible('URIValue', (x) => x.constructor.name === URIValue.name)

module.exports = URIValue
