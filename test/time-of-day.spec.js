'use strict'

const _map = require('lodash/map')
const TimeOfDayValue = require('..//time-of-day')
const Errors = require('..//errors')

/* global describe, it */
/*eslint no-unused-vars: 0*/

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
      }).to.throw(Errors.ValidationFailedException)
    })
    done()
  })
})
