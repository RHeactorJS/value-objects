export class ValidationFailedError {
  constructor (message, data, error) {
    this.name = ValidationFailedError.name
    this.message = message
    this.data = data
    this.error = error
  }

  toString () {
    let message = this.message
    if (this.error && this.error.isJoi) {
      const details = this.error.details.map(detail => detail.message).join(', ')
      message += ` (${details}) `
    }
    if (this.data) {
      message += ' ' + JSON.Stringify(this.data)
    }
    return message
  }

  static is (err) {
    return err instanceof Error && err.constructor.name === ValidationFailedError.name
  }
}

ValidationFailedError.prototype = Object.create(Error.prototype)
