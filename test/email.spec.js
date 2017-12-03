import {EmailValue, EmailValueType, MaybeEmailValueType} from '../src'
import {ValidationFailedError} from '@rheactorjs/errors'

/* global describe expect, it */
/* eslint no-unused-vars: 0 */

describe('EmailValue', () => {
  describe('constructur()', function () {
    it('should parse a email', () => {
      [
        'markus@resourceful-humans.com',
        'markus+example@resourceful-humans.com',
        'Markus@Resourceful-Humans.com',
        'm@cto.hiv',
        'm@example.co.uk'
      ].forEach(email => {
        let d = new EmailValue(email)
        expect(d.toString()).toEqual(email.toLowerCase())
      })
    })

    it('should not parse invalid emails', () => {
      [
        'not a email',
        'm@localhost' // not a second level domain
      ].forEach(email => {
        expect(() => {
          let e = new EmailValue(email)
        }).toThrow(ValidationFailedError)
      })
    })
  })

  describe('EmailValueType', () => {
    it('should detect invalid types', () => {
      [
        {foo: 'bar'},
        null,
        undefined
      ].forEach(v => {
        expect(() => {
          EmailValueType(v)
        }).toThrow(TypeError)
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
      expect(new EmailValue('markus@resourceful-humans.com').equals(new EmailValue('markus@resourceful-humans.com'))).toEqual(true)
    })
    it('should return true for the same emails (case insensitive)', () => {
      expect(new EmailValue('Markus@Resourceful-Humans.com').equals(new EmailValue('markus@resourceful-humans.com'))).toEqual(true)
    })
    it('should return false for different emails', () => {
      expect(new EmailValue('markus@resourceful-humans.com').equals(new EmailValue('markus@resourceful-humans.de'))).toEqual(false)
    })
  })
})
