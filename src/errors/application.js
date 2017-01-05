export class ApplicationError {
  constructor (message) {
    this.name = ApplicationError.name
    this.message = message
  }

  static is (err) {
    return err instanceof Error && err.name === ApplicationError.name
  }
}

ApplicationError.prototype = Object.create(Error.prototype)
