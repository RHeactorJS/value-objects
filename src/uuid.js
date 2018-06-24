import {ValidationFailedError} from '@rheactorjs/errors'
import {String as StringType, irreducible, maybe} from 'tcomb'

const uuidRegex = /^[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}$/

export class UUIDValue {
  /**
   * A UUID v4
   *
   * @param {String|UUIDValue} uuid
   * @throws ValidationFailedException if the creation fails due to invalid data
   */
  constructor (uuid) {
    if (UUIDValue.is(uuid)) {
      uuid = uuid.uuid
    }
    try {
      StringType(uuid)
    } catch (e) {
      throw new ValidationFailedError(`Not a UUID: "${uuid}"`, uuid, e)
    }
    if (!UUIDValue.stringIs(uuid)) {
      throw new ValidationFailedError('Not a UUID: ' + uuid)
    }
    this.uuid = uuid
  }

  /**
   * @returns {String}
   */
  toString () {
    return this.uuid
  }

  /**
   * @param {UUIDValue} uuid
   * @returns {boolean}
   */
  equals (uuid) {
    UUIDValueType(uuid)
    return this.uuid === uuid.toString()
  }

  /**
   * Returns true if str is an UUID
   * @param {String} str
   * @returns {boolean}
   */
  static stringIs (str) {
    return uuidRegex.test(str)
  }

  /**
   * Returns true if x is of type UUIDValue
   *
   * @param {object} x
   * @returns {boolean}
   */
  static is (x) {
    return (x instanceof UUIDValue) || (x && x.constructor && x.constructor.name === UUIDValue.name && 'uuid' in x)
  }
}

export const UUIDValueType = irreducible('UUIDValueType', x => UUIDValue.is(x))
export const MaybeUUIDValueType = maybe(UUIDValueType)
