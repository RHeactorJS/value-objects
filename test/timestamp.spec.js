'use strict'

const _map = require('lodash/map')
const TimestampValue = require('../timestamp')
const ValidationFailedError = require('../errors/validation-failed')

/* global describe, it */
/* eslint no-unused-vars: 0 */

const expect = require('chai').expect

describe('TimestampValue', () => {
  describe('constructor()', () => {
    it('should accept a timestamp', (done) => {
      _map([
        1,
        Date.now(),
        new Date('1900-01-01T00:00:00').getTime()
      ], (timestamp) => {
        let u = new TimestampValue(timestamp)
        expect(u.toString()).to.equal('' + timestamp)
      })
      done()
    })

    it('should not parse invalid timestamps', (done) => {
      expect(() => {
        let u = new TimestampValue('bogus')
      }).to.throw(ValidationFailedError)
      done()
    })

    it('should convert date objects', (done) => {
      const d = new Date()
      const t = new TimestampValue(d)
      expect(t.toString()).to.equal('' + d.getTime())
      done()
    })
  })

  describe('.toString()', () => {
    it('should return the timestamp as string', (done) => {
      const d = Date.now()
      const t = new TimestampValue(d)
      expect(t.toString()).to.equal('' + d)
      done()
    })
  })

  describe('.valueOf()', () => {
    it('should return the timestamp as number', (done) => {
      const d = Date.now()
      const t = new TimestampValue(d)
      expect(t.valueOf()).to.equal(d)
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
          TimestampValue.Type(v)
        }).to.throw(TypeError)
      })
      done()
    })
    it('should accept valid types', (done) => {
      TimestampValue.Type(new TimestampValue(Date.now()))
      done()
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
