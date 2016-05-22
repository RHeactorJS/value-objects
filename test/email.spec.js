'use strict'

const _map = require('lodash/map')
const EmailValue = require('..//email')
const Errors = require('../errors')

/* global describe, it */

const expect = require('chai').expect

describe('EmailValue()', function () {
  it('should parse a email', (done) => {
    _map([
      'markus@resourceful-humans.com',
      'markus+example@resourceful-humans.com',
      'm@cto.hiv'
    ], (email) => {
      let d = new EmailValue(email)
      expect(d.toString()).to.equal(email)
    })
    done()
  })

  it('should not parse invalid emails', (done) => {
    _map([
      'not a email',
      'm@localhost' // not a second level domain
    ], (email) => {
      expect(() => {
        EmailValue(email)
      }).to.throw(Errors.ValidationFailedException)
    })
    done()
  })
})
