'use strict'

import {ValidationFailedError} from './errors'
import {String as StringType, irreducible} from 'tcomb'

// http://stackoverflow.com/a/30007882
const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/

export class DomainValue {
  /**
   * A second level domain
   *
   * @param {String|DomainValue} domain
   * @throws ValidationFailedException if the creation fails due to invalid data
   */
  constructor (domain) {
    if (DomainValue.is(domain)) {
      domain = domain.domain
    }
    try {
      StringType(domain)
    } catch (e) {
      throw new ValidationFailedError(`Not a domain: "${domain}"`, domain, e)
    }
    if (!domainRegex.test(domain)) {
      throw new ValidationFailedError('Not a domain: ' + domain)
    }
    if (domain.split('.').length !== 2) {
      throw new ValidationFailedError('Only second level domains are allowed')
    }
    this.domain = domain
  }

  /**
   * @returns {String}
   */
  toString () {
    return this.domain
  }

  /**
   * @param {DomainValue} domain
   * @returns {boolean}
   */
  equals (domain) {
    DomainValueType(domain)
    return this.domain === domain.toString()
  }

  /**
   * Returns true if x is of type DomainValue
   *
   * @param {object} x
   * @returns {boolean}
   */
  static is (x) {
    return (x instanceof DomainValue) || (x && x.constructor && x.constructor.name === DomainValue.name && 'domain' in x)
  }
}

export const DomainValueType = irreducible('DomainValueType', x => DomainValue.is(x))
