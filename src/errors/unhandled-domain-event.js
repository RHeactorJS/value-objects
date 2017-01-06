export class UnhandledDomainEventError {
  constructor (event) {
    this.name = UnhandledDomainEventError.name
    this.message = 'Unhandled domain event'
    this.event = event
    this.stack = (new Error(this.message)).stack
  }

  toString () {
    return `${this.message}: "${this.event}"`
  }

  static is (err) {
    return err instanceof Error && err.name === UnhandledDomainEventError.name
  }
}

UnhandledDomainEventError.prototype = Object.create(Error.prototype)
