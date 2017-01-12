import {ValidationFailedError} from 'rheactor-errors'
import {String as StringType, irreducible, maybe} from 'tcomb'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export class EmailValue {
  /**
   * @param {String|EmailValue} email
   * @throws ValidationFailedException if the creation fails due to invalid data
   */
  constructor (email) {
    if (EmailValue.is(email)) {
      email = email.email
    }
    try {
      StringType(email)
    } catch (e) {
      throw new ValidationFailedError(`Not an email: "${email}"`, email, e)
    }
    email = email.toLowerCase()
    // http://emailregex.com/
    if (!emailRegex.test(email)) {
      throw new ValidationFailedError('Not an email: ' + email)
    }
    this.email = email
  }

  /**
   * @returns {String}
   */
  toString () {
    return this.email
  }

  /**
   * @param {EmailValue} email
   * @returns {boolean}
   */
  equals (email) {
    EmailValueType(email)
    return this.email === email.toString()
  }

  /**
   * Returns true if x is of type EmailValue
   *
   * @param {object} x
   * @returns {boolean}
   */
  static is (x) {
    return (x instanceof EmailValue) || (x && x.constructor && x.constructor.name === EmailValue.name && 'email' in x)
  }
}

export const EmailValueType = irreducible('EmailValueType', x => EmailValue.is(x))
export const MaybeEmailValueType = maybe(EmailValueType)
