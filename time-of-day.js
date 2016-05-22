'use strict'

const Joi = require('joi')
const ValidationFailedException = require('./errors').ValidationFailedException

const schema = Joi.object().keys({
  timeOfDay: Joi.string().required().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).lowercase()
})

/**
 * @param {String} timeOfDay
 * @constructor
 * @throws ValidationFailedException if the creation fails due to invalid data
 */
function TimeOfDayValue (timeOfDay) {
  Joi.validate({timeOfDay}, schema, (err, data) => {
    if (err) {
      throw new ValidationFailedException('Not a timeOfDay: ' + timeOfDay, data, err)
    }
  })
  this.timeOfDay = timeOfDay
}

TimeOfDayValue.prototype.toString = function () {
  return this.timeOfDay
}

module.exports = TimeOfDayValue
