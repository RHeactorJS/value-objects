import {ValidationFailedError} from 'rheactor-errors'
import {irreducible, String as StringType, maybe} from 'tcomb'

export class TimeOfDayValue {
  /**
   * @param {String|TimeOfDayValue} timeOfDay
   * @constructor
   * @throws ValidationFailedException if the creation fails due to invalid data
   */
  constructor (timeOfDay) {
    if (TimeOfDayValue.is(timeOfDay)) {
      timeOfDay = timeOfDay.timeOfDay
    }
    try {
      StringType(timeOfDay)
    } catch (e) {
      throw new ValidationFailedError(`Not a timeOfDay: "${timeOfDay}"`, timeOfDay, e)
    }
    if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeOfDay)) {
      throw new ValidationFailedError('Not a timeOfDay: ' + timeOfDay)
    }
    this.timeOfDay = timeOfDay
  }

  /**
   * @returns {String}
   */
  toString () {
    return this.timeOfDay
  }

  /**
   * Returns the hour of the time as a number
   * @returns {Number}
   */
  hour () {
    return +this.timeOfDay.split(':')[0]
  }

  /**
   * Returns the minute of the time as a number
   * @returns {Number}
   */
  minute () {
    return +this.timeOfDay.split(':')[1]
  }

  /**
   * @param {TimeOfDayValue} timeOfDay
   * @returns {boolean}
   */
  equals (timeOfDay) {
    TimeOfDayValueType(timeOfDay)
    return this.timeOfDay === timeOfDay.toString()
  }

  /**
   * Returns true if x is of type TimeOfDayValue
   *
   * @param {object} x
   * @returns {boolean}
   */
  static is (x) {
    return (x instanceof TimeOfDayValue) || (x && x.constructor && x.constructor.name === TimeOfDayValue.name && 'timeOfDay' in x)
  }
}

export const TimeOfDayValueType = irreducible('TimeOfDayValueValueType', x => TimeOfDayValue.is(x))
export const MaybeTimeOfDayValueType = maybe(TimeOfDayValueType)
