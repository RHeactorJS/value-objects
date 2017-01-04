'use strict'

const ValidationFailedError = require('./errors/validation-failed')
const t = require('tcomb')

/**
 * @param {String} timeOfDay
 * @constructor
 * @throws ValidationFailedException if the creation fails due to invalid data
 */
function TimeOfDayValue (timeOfDay) {
  if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeOfDay)) {
    throw new ValidationFailedError('Not a timeOfDay: ' + timeOfDay)
  }
  this.timeOfDay = timeOfDay
}

TimeOfDayValue.prototype.toString = function () {
  return this.timeOfDay
}

/**
 * Returns the hour of the time as a number
 * @returns {Number}
 */
TimeOfDayValue.prototype.hour = function () {
  return +this.timeOfDay.split(':')[0]
}

/**
 * Returns the minute of the time as a number
 * @returns {Number}
 */
TimeOfDayValue.prototype.minute = function () {
  return +this.timeOfDay.split(':')[1]
}

/**
 * @param {TimeOfDayValue} timeOfDay
 * @returns {boolean}
 */
TimeOfDayValue.prototype.equals = function (timeOfDay) {
  TimeOfDayValue.Type(timeOfDay)
  return this.timeOfDay === timeOfDay.toString()
}

TimeOfDayValue.Type = t.irreducible('TimeOfDayValueValue', (x) => x.constructor.name === TimeOfDayValue.name)

module.exports = TimeOfDayValue
