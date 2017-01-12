'use strict'

import {ValidationFailedError} from 'rheactor-errors'
import {irreducible, String as StringType} from 'tcomb'

export class SlugValue {
  /**
   * @param {String|SlugValue} slug
   * @constructor
   * @throws ValidationFailedException if the creation fails due to invalid data
   */
  constructor (slug) {
    if (SlugValue.is(slug)) {
      slug = slug.slug
    }
    try {
      StringType(slug)
    } catch (e) {
      throw new ValidationFailedError(`Not a slug: "${slug}"`, slug, e)
    }
    slug = slug.toLowerCase()
    if (!/^[a-z0-9]+(?!-+$)[a-z0-9-]*$/.test(slug)) {
      throw new ValidationFailedError('Not a slug: ' + slug)
    }
    this.slug = slug
  }

  /**
   * @returns {String}
   */
  toString () {
    return this.slug
  }

  /**
   * @param {SlugValue} slug
   * @returns {boolean}
   */
  equals (slug) {
    SlugValueType(slug)
    return this.slug === slug.toString()
  }

  /**
   * Returns true if x is of type SlugValue
   *
   * @param {object} x
   * @returns {boolean}
   */
  static is (x) {
    return (x instanceof SlugValue) || (x && x.constructor && x.constructor.name === SlugValue.name && 'slug' in x)
  }
}

export const SlugValueType = irreducible('SlugValueType', x => SlugValue.is(x))
