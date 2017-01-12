import {TimestampValue, TimestampValueType, MaybeTimestampValueType} from '../src'
import {ValidationFailedError} from 'rheactor-errors'
import {expect} from 'chai'

/* global describe, it */
/* eslint no-unused-vars: 0 */

describe('TimestampValue', () => {
  describe('constructor()', () => {
    it('should accept a timestamp', () => {
      [
        1,
        Date.now(),
        new Date('1900-01-01T00:00:00').getTime()
      ].map(timestamp => {
        let u = new TimestampValue(timestamp)
        expect(u.toString()).to.equal('' + timestamp)
      })
    })

    it('should not parse invalid timestamps', () => {
      expect(() => {
        let u = new TimestampValue('bogus')
      }).to.throw(ValidationFailedError)
    })

    it('should convert date objects', () => {
      const d = new Date()
      const t = new TimestampValue(d)
      expect(t.toString()).to.equal('' + d.getTime())
    })
  })

  describe('.toString()', () => {
    it('should return the timestamp as string', () => {
      const d = Date.now()
      const t = new TimestampValue(d)
      expect(t.toString()).to.equal('' + d)
    })
  })

  describe('.valueOf()', () => {
    it('should return the timestamp as number', () => {
      const d = Date.now()
      const t = new TimestampValue(d)
      expect(t.valueOf()).to.equal(d)
    })
  })

  describe('TimestampValueType', () => {
    it('should detect invalid types', () => {
      [
        {foo: 'bar'},
        null,
        undefined
      ].map(v => {
        expect(() => {
          TimestampValueType(v)
        }).to.throw(TypeError)
      })
    })
    it('should accept valid types', () => {
      TimestampValueType(new TimestampValue(Date.now()))
    })
  })

  describe('MaybeTimestampValueType', () => {
    it('should accept undefined types', () => {
      MaybeTimestampValueType()
      MaybeTimestampValueType(null)
    })
  })

  describe('.equals()', () => {
    it('should return true for the same Times', () => {
      expect(new TimestampValue(new Date('1900-01-01T00:00:00').getTime()).equals(new TimestampValue(new Date('1900-01-01T00:00:00').getTime()))).to.equal(true)
    })
    it('should return false for different Times', () => {
      expect(new TimestampValue(Date.now()).equals(new TimestampValue(Date.now() + 1))).to.equal(false)
    })
  })
})
