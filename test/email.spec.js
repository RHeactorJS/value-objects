import {EmailValue, EmailValueType, MaybeEmailValueType} from '../src'
import {ValidationFailedError} from '@resourcefulhumans/rheactor-errors'
import {expect} from 'chai'

/* global describe, it */
/* eslint no-unused-vars: 0 */

describe('EmailValue', () => {
  describe('constructur()', function () {
    it('should parse a email', () => {
      [
        'markus@resourceful-humans.com',
        'markus+example@resourceful-humans.com',
        'Markus@Resourceful-Humans.com',
        'm@cto.hiv'
      ].map(email => {
        let d = new EmailValue(email)
        expect(d.toString()).to.equal(email.toLowerCase())
      })
    })

    it('should not parse invalid emails', () => {
      [
        'not a email',
        'm@localhost' // not a second level domain
      ].map(email => {
        expect(() => {
          let e = new EmailValue(email)
        }).to.throw(ValidationFailedError)
      })
    })
  })

  describe('EmailValueType', () => {
    it('should detect invalid types', () => {
      [
        {foo: 'bar'},
        null,
        undefined
      ].map(v => {
        expect(() => {
          EmailValueType(v)
        }).to.throw(TypeError)
      })
    })
    it('should accept valid types', () => {
      EmailValueType(new EmailValue('john@example.com'))
    })
  })

  describe('MaybeEmailValueType', () => {
    it('should accept undefined types', () => {
      MaybeEmailValueType()
      MaybeEmailValueType(null)
    })
  })

  describe('.equals()', () => {
    it('should return true for the same emails', () => {
      expect(new EmailValue('markus@resourceful-humans.com').equals(new EmailValue('markus@resourceful-humans.com'))).to.equal(true)
    })
    it('should return true for the same emails (case insensitive)', () => {
      expect(new EmailValue('Markus@Resourceful-Humans.com').equals(new EmailValue('markus@resourceful-humans.com'))).to.equal(true)
    })
    it('should return false for different emails', () => {
      expect(new EmailValue('markus@resourceful-humans.com').equals(new EmailValue('markus@resourceful-humans.de'))).to.equal(false)
    })
  })
})
