export class EntryDeletedError {
  constructor (message, entry) {
    this.name = EntryDeletedError.namae
    this.message = message
    this.entry = entry
    this.stack = (new Error(this.message)).stack
  }

  static is (err) {
    return err instanceof Error && err.constructor.name === EntryDeletedError.name
  }
}

EntryDeletedError.prototype = Object.create(Error.prototype)
