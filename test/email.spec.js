'use strict'

import {EmailValue, EmailValueType} from '../src'
import {ValidationFailedError} from 'rheactor-errors'
import {expect} from 'chai'

/* global describe, it */
/* eslint no-unused-vars: 0 */

describe('EmailValue', () => {
  describe('constructur()', function () {
    it('should parse a email', (done) => {
      [
        'markus@resourceful-humans.com',
        'markus+example@resourceful-humans.com',
        'm@cto.hiv'
      ].map(email => {
        let d = new EmailValue(email)
        expect(d.toString()).to.equal(email)
      })
      done()
    })

    it('should not parse invalid emails', (done) => {
      [
        'not a email',
        'm@localhost' // not a second level domain
      ].map(email => {
        expect(() => {
          let e = new EmailValue(email)
        }).to.throw(ValidationFailedError)
      })
      done()
    })
  })

  describe('Type', () => {
    it('should detect invalid types', (done) => {
      [
        {foo: 'bar'},
        null,
        undefined
      ].map(v => {
        expect(() => {
          EmailValueType(v)
        }).to.throw(TypeError)
      })
      done()
    })
    it('should accept valid types', (done) => {
      EmailValueType(new EmailValue('john@example.com'))
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
