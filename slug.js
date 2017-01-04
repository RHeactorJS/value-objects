'use strict'

const ValidationFailedError = require('./errors/validation-failed')
const t = require('tcomb')

/**
 * @param {String} slug
 * @constructor
 * @throws ValidationFailedException if the creation fails due to invalid data
 */
function SlugValue (slug) {
  slug = slug.toLowerCase()
  if (!/^[a-z0-9]+(?!-+$)[a-z0-9-]*$/.test(slug)) {
    throw new ValidationFailedError('Not a slug: ' + slug)
  }
  this.slug = slug
}

SlugValue.prototype.toString = function () {
  return this.slug
}

/**
 * @param {SlugValue} slug
 * @returns {boolean}
 */
SlugValue.prototype.equals = function (slug) {
  SlugValue.Type(slug)
  return this.slug === slug.toString()
}

SlugValue.Type = t.irreducible('SlugValue', (x) => x.constructor.name === SlugValue.name)

module.exports = SlugValue
