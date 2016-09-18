'use strict'

const _map = require('lodash/map')
const _forIn = require('lodash/forIn')
const TimeOfDayValue = require('../time-of-day')
const ValidationFailedError = require('../errors/validation-failed')

/* global describe, it */
/* eslint no-unused-vars: 0 */

const expect = require('chai').expect

describe('TimeOfDayValue()', function () {
  it('should parse a time', (done) => {
    _map([
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
    ], (time) => {
      let u = new TimeOfDayValue(time)
      expect(u.toString()).to.equal(time)
    })
    done()
  })

  it('should not parse invalid times', (done) => {
    _map([
      'bogus',
      17,
      '24:00',
      '12:60',
      '0:0',
      '13:1',
      '101:00'
    ], (time) => {
      expect(() => {
        let u = new TimeOfDayValue(time)
      }).to.throw(ValidationFailedError)
    })
    done()
  })

  describe('.hour()', () => {
    it('should return the hour as a number', (done) => {
      _forIn(
        {
          '01:00': 1,
          '02:00': 2,
          '13:00': 13,
          '1:00': 1,
          '2:00': 2,
          '00:00': 0,
          '0:00': 0
        },
        (hour, time) => {
          let u = new TimeOfDayValue(time)
          expect(u.hour()).to.equal(hour)
        })
      done()
    })
  })

  describe('.minute()', () => {
    it('should return the minute as a number', (done) => {
      _forIn(
        {
          '01:00': 0,
          '02:01': 1,
          '13:59': 59
        },
        (hour, time) => {
          let u = new TimeOfDayValue(time)
          expect(u.minute()).to.equal(hour)
        })
      done()
    })
  })
})

describe('TimeOfDayValue.Type', () => {
  it('should detect invalid types', (done) => {
    _map([
      {foo: 'bar'},
      null,
      undefined
    ], (v) => {
      expect(() => {
        TimeOfDayValue.Type(v)
      }).to.throw(TypeError)
    })
    done()
  })
  it('should accept valid types', (done) => {
    TimeOfDayValue.Type(new TimeOfDayValue('01:00'))
    done()
  })
})
