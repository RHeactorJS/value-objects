'use strict'

const _map = require('lodash/map')
const EmailValue = require('../email')
const ValidationFailedError = require('../errors/validation-failed')

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
      }).to.throw(ValidationFailedError)
    })
    done()
  })
})

describe('EmailValue.Type', () => {
  it('should detect invalid types', (done) => {
    _map([
      {foo: 'bar'},
      null,
      undefined
    ], (v) => {
      expect(() => {
        EmailValue.Type(v)
      }).to.throw(TypeError)
    })
    done()
  })
  it('should accept valid types', (done) => {
    EmailValue.Type(new EmailValue('john@example.com'))
    done()
  })
})
