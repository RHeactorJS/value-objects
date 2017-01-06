export class ConflictError {
  constructor (message) {
    this.name = ConflictError.name
    this.message = message
    this.stack = (new Error(this.message)).stack
  }

  static is (err) {
    return err instanceof Error && err.constructor.name === ConflictError.name
  }
}

ConflictError.prototype = Object.create(Error.prototype)
