import {ValidationFailedError} from '@rheactorjs/errors'
import {irreducible, union, String as StringType, Number as NumberType, maybe} from 'tcomb'

const ScalarType = union([StringType, NumberType])
const percentageRegex = /^-?[0-9]+%$/

export class PercentageValue {
  /**
   * @param {String|number|PercentageValue} percentage
   * @constructor
   * @throws ValidationFailedException if the creation fails due to invalid percentage
   */
  constructor (percentage) {
    if (PercentageValue.is(percentage)) {
      percentage = percentage.percentage
    }
    try {
      ScalarType(percentage)
    } catch (e) {
      throw new ValidationFailedError(`Not a percentage: "${percentage}"`, percentage, e)
    }
    percentage = parseFloat(percentage)
    if (isNaN(percentage)) throw new ValidationFailedError('Not a percentage: ' + percentage, percentage)
    this.percentage = percentage
  }

  /**
   * @returns {String}
   */
  toString () {
    return Math.round(this.percentage) + '%'
  }

  /**
   * @returns {number}
   */
  valueOf () {
    return this.percentage
  }

  /**
   * @param {PercentageValue} percentage
   * @returns {boolean}
   */
  equals (percentage) {
    PercentageValueType(percentage)
    return this.percentage === percentage.valueOf()
  }

  /**
   * Returns true if str is a percentage value
   * @param {String} str
   * @returns {boolean}
   */
  static stringIs (str) {
    return percentageRegex.test(str)
  }

  /**
   * Returns true if x is of type PercentageValue
   *
   * @param {object} x
   * @returns {boolean}
   */
  static is (x) {
    return (x instanceof PercentageValue) || (x && x.constructor && x.constructor.name === PercentageValue.name && 'percentage' in x)
  }
}

export const PercentageValueType = irreducible('PercentageValueType', x => PercentageValue.is(x))
export const MaybePercentageValueType = maybe(PercentageValueType)
