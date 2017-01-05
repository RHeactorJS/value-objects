export class TokenExpiredError {
  constructor (token) {
    this.name = TokenExpiredError.name
    this.message = 'The token expired'
    this.token = token
  }

  static is (err) {
    return err instanceof Error && err.name === TokenExpiredError.name
  }
}

TokenExpiredError.prototype = Object.create(Error.prototype)
