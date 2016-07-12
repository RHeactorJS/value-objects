'use strict'

const Joi = require('joi')
const ValidationFailedException = require('./errors').ValidationFailedException
const t = require('tcomb')

const schema = Joi.object().keys({
  slug: Joi.string().required().regex(/^[a-z0-9]+(?!-+$)[a-z0-9-]*$/).lowercase()
})

/**
 * @param {String} slug
 * @constructor
 * @throws ValidationFailedException if the creation fails due to invalid data
 */
function SlugValue (slug) {
  Joi.validate({slug}, schema, (err, data) => {
    if (err) {
      throw new ValidationFailedException('Not a slug: ' + slug, data, err)
    }
  })
  this.slug = slug
}

SlugValue.prototype.toString = function () {
  return this.slug
}

SlugValue.Type = t.irreducible('SlugValue', (x) => x instanceof SlugValue)

module.exports = SlugValue
