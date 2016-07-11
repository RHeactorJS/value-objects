'use strict'

function PaymentRequiredException (message) {
  this.name = 'PaymentRequiredException'
  this.message = message
}

PaymentRequiredException.prototype = Object.create(Error.prototype)
PaymentRequiredException.prototype.constructor = PaymentRequiredException
PaymentRequiredException.prototype.toString = function () {
  return this.message
}

module.exports = PaymentRequiredException
