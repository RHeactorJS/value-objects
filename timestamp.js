'use strict'

const t = require('tcomb')
const Integer = t.refinement(t.Number, (n) => n % 1 === 0, 'Integer')
const ValidationFailedError = require('./errors/validation-failed')

/**
 * @param {Number} timestamp
 * @constructor
 * @throws ValidationFailedException if the creation fails due to invalid data
 */
function TimestampValue (timestamp) {
  if (timestamp instanceof Date) {
    timestamp = timestamp.getTime()
  }
  try {
    Integer(timestamp)
  } catch (e) {
    throw new ValidationFailedError('Not a timestamp: ' + timestamp, timestamp, e)
  }
  this.timestamp = timestamp
}

/**
 * @returns {string}
 */
TimestampValue.prototype.toString = function () {
  return '' + this.timestamp
}

/**
 * @returns {number}
 */
TimestampValue.prototype.valueOf = function () {
  return this.timestamp
}

/**
 * @param {TimestampValue} timestamp
 * @returns {boolean}
 */
TimestampValue.prototype.equals = function (timestamp) {
  TimestampValue.Type(timestamp)
  return this.timestamp === timestamp.valueOf()
}

TimestampValue.Type = t.irreducible('TimestampValue', (x) => x.constructor.name === TimestampValue.name)

module.exports = TimestampValue
