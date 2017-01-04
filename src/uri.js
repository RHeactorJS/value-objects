'use strict'

const ValidationFailedError = require('./errors/validation-failed')
const t = require('tcomb')
const trimEnd = require('lodash/trimEnd')

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

/**
 * @param {URIValue} uri
 * @returns {boolean}
 */
URIValue.prototype.equals = function (uri) {
  URIValue.Type(uri)
  return this.uri.toString() === uri.toString()
}

/**
 * Returns a copy of the instance that has no trailing slash
 * @returns {String|*}
 */
URIValue.prototype.slashless = function () {
  return new URIValue(trimEnd(this.uri, '/'))
}

URIValue.is = (uri) => {
  return /^https?:\/\//.test(uri)
}

URIValue.Type = t.irreducible('URIValue', (x) => x.constructor.name === URIValue.name)

module.exports = URIValue
