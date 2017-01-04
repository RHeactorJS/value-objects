'use strict'

function PaymentRequiredError (message) {
  this.name = 'PaymentRequiredError'
  this.message = message
}

PaymentRequiredError.prototype = Object.create(Error.prototype)
PaymentRequiredError.prototype.constructor = PaymentRequiredError
PaymentRequiredError.prototype.toString = function () {
  return this.message
}

PaymentRequiredError.is = err => err instanceof Error && err.name === PaymentRequiredError.name

module.exports = PaymentRequiredError
