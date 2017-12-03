import {TimeOfDayValue, TimeOfDayValueType, MaybeTimeOfDayValueType} from '../src'
import {ValidationFailedError} from '@rheactorjs/errors'

/* global describe expect, it */
/* eslint no-unused-vars: 0 */

describe('TimeOfDayValue', () => {
  describe('constructor()', function () {
    it('should parse a time', () => {
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
      ].forEach(time => {
        let u = new TimeOfDayValue(time)
        expect(u.toString()).toEqual(time)
      })
    })

    it('should not parse invalid times', () => {
      [
        'bogus',
        17,
        '24:00',
        '12:60',
        '0:0',
        '13:1',
        '101:00'
      ].forEach(time => {
        expect(() => {
          let u = new TimeOfDayValue(time)
        }).toThrow(ValidationFailedError)
      })
    })

    describe('.hour()', () => {
      it('should return the hour as a number', () => {
        [
          ['01:00', 1],
          ['02:00', 2],
          ['13:00', 13],
          ['1:00', 1],
          ['2:00', 2],
          ['00:00', 0],
          ['0:00', 0]
        ].forEach(v => {
          let u = new TimeOfDayValue(v[0])
          expect(u.hour()).toEqual(v[1])
        })
      })
    })

    describe('.minute()', () => {
      it('should return the minute as a number', () => {
        [
          ['01:00', 0],
          ['02:01', 1],
          ['13:59', 59]
        ].forEach(v => {
          let u = new TimeOfDayValue(v[0])
          expect(u.minute()).toEqual(v[1])
        })
      })
    })
  })

  describe('TimeOfDayValueType', () => {
    it('should detect invalid types', () => {
      [
        {foo: 'bar'},
        null,
        undefined
      ].forEach(v => {
        expect(() => {
          TimeOfDayValueType(v)
        }).toThrow(TypeError)
      })
    })
    it('should accept valid types', () => {
      TimeOfDayValueType(new TimeOfDayValue('01:00'))
    })
  })

  describe('MaybeTimeOfDayValueType', () => {
    it('should accept undefined types', () => {
      MaybeTimeOfDayValueType()
      MaybeTimeOfDayValueType(null)
    })
  })

  describe('.equals()', () => {
    it('should return true for the same times of day', () => {
      expect(new TimeOfDayValue('01:00').equals(new TimeOfDayValue('01:00'))).toEqual(true)
    })
    it('should return false for different times of day', () => {
      expect(new TimeOfDayValue('00:00').equals(new TimeOfDayValue('00:01'))).toEqual(false)
    })
  })
})
