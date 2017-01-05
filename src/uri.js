'use strict'

import {ValidationFailedError} from './errors'
import {String as StringType, irreducible} from 'tcomb'

// http://stackoverflow.com/a/3809435
const URIRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/

export class URIValue {
  /**
   * A second level URI
   *
   * @param {String|URIValue} uri
   * @throws ValidationFailedException if the creation fails due to invalid data
   */
  constructor (uri) {
    if (URIValue.is(uri)) {
      uri = uri.uri
    }
    try {
      StringType(uri)
    } catch (e) {
      throw new ValidationFailedError(`Not a URI: "${uri}"`, uri, e)
    }
    if (!URIRegex.test(uri)) {
      throw new ValidationFailedError('Not a URI: ' + uri)
    }
    this.uri = uri
  }

  /**
   * @returns {String}
   */
  toString () {
    return this.uri
  }

  /**
   * @param {URIValue} uri
   * @returns {boolean}
   */
  equals (uri) {
    URIValueType(uri)
    return this.uri === uri.toString()
  }

  /**
   * Returns a copy of the instance that has no trailing slash
   * @returns {URIValue}
   */
  slashless () {
    return new URIValue(this.uri.replace(/\/+$/, ''))
  }

  /**
   * Returns true if x is of type URIValue
   *
   * @param {object} x
   * @returns {boolean}
   */
  static is (x) {
    return (x instanceof URIValue) || (x && x.constructor && x.constructor.name === URIValue.name && 'uri' in x)
  }
}

export const URIValueType = irreducible('URIValueType', x => URIValue.is(x))