'use strict'

const t = require('tcomb')
const Scalar = t.union([t.String, t.Number])
const ValidationFailedError = require('./errors/validation-failed')

/**
 * @param {string|number} percentage
 * @constructor
 * @throws ValidationFailedException if the creation fails due to invalid percentage
 */
function PercentageValue (percentage) {
  if (PercentageValue.is(percentage)) {
    percentage = percentage.percentage
  }
  try {
    Scalar(percentage)
  } catch (e) {
    throw new ValidationFailedError('Not a percentage: ' + percentage, percentage, e)
  }
  percentage = parseFloat(percentage)
  if (isNaN(percentage)) throw new ValidationFailedError('Not a percentage: ' + percentage, percentage)
  if (percentage < 0) throw new ValidationFailedError('Negative values are not allowed: ' + percentage, percentage)
  if (percentage > 100) throw new ValidationFailedError('Not a percentage: ' + percentage, percentage)
  this.percentage = percentage
}

/**
 * @returns {string}
 */
PercentageValue.prototype.toString = function () {
  return Math.round(this.percentage) + '%'
}

/**
 * @returns {number}
 */
PercentageValue.prototype.valueOf = function () {
  return this.percentage
}

PercentageValue.Type = t.irreducible('PercentageValue', (x) => x.constructor.name === PercentageValue.name)

PercentageValue.is = o => o.constructor.name === PercentageValue.name

module.exports = PercentageValue
