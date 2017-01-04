'use strict'

const _map = require('lodash/map')
const EmailValue = require('../src/email')
const ValidationFailedError = require('../src/errors/validation-failed')

/* global describe, it */

const expect = require('chai').expect

describe('EmailValue', () => {
  describe('constructur()', function () {
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

  describe('.Type', () => {
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

  describe('.equals()', () => {
    it('should return true for the same emails', () => {
      expect(new EmailValue('markus@resourceful-humans.com').equals(new EmailValue('markus@resourceful-humans.com'))).to.equal(true)
    })
    it('should return false for different emails', () => {
      expect(new EmailValue('markus@resourceful-humans.com').equals(new EmailValue('markus@resourceful-humans.de'))).to.equal(false)
    })
  })
})
