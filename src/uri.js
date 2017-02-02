import {ValidationFailedError} from '@resourcefulhumans/rheactor-errors'
import {String as StringType, irreducible, maybe} from 'tcomb'

const uriRegex = /^https?:\/\/(((?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])|((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))(:(6553[0-5]|655[0-2]\d|65[0-4]\d\d|6[0-4]\d{3}|[1-5]\d{4}|[1-9]\d{0,3}|0))?(\/[-a-zA-Z0-9@:%_+.,~?&/=()]*)*(#(?:[^#^[\]{}\\"<>%\s]|%[0-9a-f]{2})*)*$/i

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
    if (!URIValue.stringIs(uri)) {
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
   * Returns true if str is an URI
   * @param {String} str
   * @returns {boolean}
   */
  static stringIs (str) {
    return uriRegex.test(str)
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
export const MaybeURIValueType = maybe(URIValueType)
