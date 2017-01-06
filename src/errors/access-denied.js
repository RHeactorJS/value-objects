export class AccessDeniedError {
  constructor (resource, message) {
    this.name = AccessDeniedError.name
    this.message = message
    this.resource = resource
    this.stack = (new Error(this.message)).stack
  }

  toString () {
    let msg = 'Access denied: ' + this.resource
    if (this.message) {
      msg += ' (' + this.message + ')'
    }
    return msg
  }

  static is (err) {
    return err instanceof Error && err.constructor.name === AccessDeniedError.name
  }
}

AccessDeniedError.prototype = Object.create(Error.prototype)
