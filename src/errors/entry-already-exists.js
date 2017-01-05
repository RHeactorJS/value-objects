export class EntryAlreadyExistsError {
  constructor (message) {
    this.name = EntryAlreadyExistsError.name
    this.message = message
  }

  static is (err) {
    return err instanceof Error && err.name === EntryAlreadyExistsError.name
  }
}

EntryAlreadyExistsError.prototype = Object.create(Error.prototype)
