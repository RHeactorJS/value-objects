'use strict'

import {ValidationFailedError} from './errors'
import {irreducible, Integer as IntegerType} from 'tcomb'

export class TimestampValue {

  /**
   * @param {Number|Date|TimestampValue} timestamp
   * @constructor
   * @throws ValidationFailedException if the creation fails due to invalid data
   */
  constructor (timestamp) {
    if (timestamp instanceof Date) {
      timestamp = timestamp.getTime()
    }
    if (TimestampValue.is(timestamp)) {
      timestamp = timestamp.timestamp
    }
    try {
      IntegerType(timestamp)
    } catch (e) {
      throw new ValidationFailedError('Not a timestamp: ' + timestamp, timestamp, e)
    }
    this.timestamp = timestamp
  }

  /**
   * @returns {String}
   */
  toString () {
    return '' + this.timestamp
  }

  /**
   * @returns {Number}
   */
  valueOf () {
    return this.timestamp
  }

  /**
   * @param {TimestampValue} timestamp
   * @returns {boolean}
   */
  equals (timestamp) {
    TimestampValueType(timestamp)
    return this.timestamp === timestamp.valueOf()
  }

  /**
   * Returns true if x is of type TimestampValue
   *
   * @param {object} x
   * @returns {boolean}
   */
  static is (x) {
    return (x instanceof TimestampValue) || (x && x.constructor && x.constructor.name === TimestampValue.name && 'timestamp' in x)
  }
}

export const TimestampValueType = irreducible('TimestampValueType', x => TimestampValue.is(x))

