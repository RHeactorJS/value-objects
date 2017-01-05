'use strict'

import {TimeOfDayValue, TimeOfDayValueType} from '../src'
import {ValidationFailedError} from '../src/errors'

/* global describe, it */
/* eslint no-unused-vars: 0 */

const expect = require('chai').expect

describe('TimeOfDayValue', () => {
  describe('constructor()', function () {
    it('should parse a time', (done) => {
      [
        '01:00',
        '02:00',
        '13:00',
        '1:00',
        '2:00',
        '13:01',
        '23:59',
        '15:00',
        '00:00',
        '0:00'
      ].map(time => {
        let u = new TimeOfDayValue(time)
        expect(u.toString()).to.equal(time)
      })
      done()
    })

    it('should not parse invalid times', (done) => {
      [
        'bogus',
        17,
        '24:00',
        '12:60',
        '0:0',
        '13:1',
        '101:00'
      ].map(time => {
        expect(() => {
          let u = new TimeOfDayValue(time)
        }).to.throw(ValidationFailedError)
      })
      done()
    })

    describe('.hour()', () => {
      it('should return the hour as a number', (done) => {
        [
          ['01:00', 1],
          ['02:00', 2],
          ['13:00', 13],
          ['1:00', 1],
          ['2:00', 2],
          ['00:00', 0],
          ['0:00', 0]
        ].map(v => {
          let u = new TimeOfDayValue(v[0])
          expect(u.hour()).to.equal(v[1])
        })
        done()
      })
    })

    describe('.minute()', () => {
      it('should return the minute as a number', (done) => {
        [
          ['01:00', 0],
          ['02:01', 1],
          ['13:59', 59]
        ].map(v => {
          let u = new TimeOfDayValue(v[0])
          expect(u.minute()).to.equal(v[1])
        })
        done()
      })
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
          TimeOfDayValueType(v)
        }).to.throw(TypeError)
      })
      done()
    })
    it('should accept valid types', (done) => {
      TimeOfDayValueType(new TimeOfDayValue('01:00'))
      done()
    })
  })

  describe('.equals()', () => {
    it('should return true for the same times of day', () => {
      expect(new TimeOfDayValue('01:00').equals(new TimeOfDayValue('01:00'))).to.equal(true)
    })
    it('should return false for different times of day', () => {
      expect(new TimeOfDayValue('00:00').equals(new TimeOfDayValue('00:01'))).to.equal(false)
    })
  })
})
