export class EntryNotFoundError {
  constructor (message) {
    this.name = EntryNotFoundError.name
    this.message = message
    this.stack = (new Error(this.message)).stack
  }
  static is (err) {
    return err instanceof Error && err.name === EntryNotFoundError.name
  }
}

EntryNotFoundError.prototype = Object.create(Error.prototype)
