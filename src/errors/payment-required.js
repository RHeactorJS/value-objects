export class PaymentRequiredError {
  constructor (message) {
    this.name = PaymentRequiredError.name
    this.message = message
  }

  static is (err) {
    return err instanceof Error && err.name === PaymentRequiredError.name
  }
}

PaymentRequiredError.prototype = Object.create(Error.prototype)
