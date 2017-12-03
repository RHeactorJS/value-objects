import {PercentageValue, PercentageValueType, MaybePercentageValueType} from '../src'
import {ValidationFailedError} from '@rheactorjs/errors'

/* global describe expect, it */
/* eslint no-unused-vars: 0 */

const goodPercentages = [
  [0, '0%'],
  [50, '50%'],
  [33.3, '33%'],
  [100, '100%'],
  ['0', '0%', 0],
  ['100', '100%', 100],
  [-1, '-1%'],
  [101, '101%'],
  [-100, '-100%']
]

const badPercentages = [
  'bogus',
  ''
]

describe('PercentageValue', () => {
  describe('constructor()', () => {
    it('should accept a percentage', () => {
      goodPercentages.forEach(data => {
        let u = new PercentageValue(data[0])
        expect(u.toString()).toEqual(data[1])
        expect(u.valueOf()).toEqual(typeof data[2] !== 'undefined' ? data[2] : data[0])
      })
    })

    describe('should not parse invalid percentages', () => {
      badPercentages.forEach(v => {
        it(JSON.stringify(v) + ' should not be accepted as a valid value', () => {
          expect(() => {
            let u = new PercentageValue(v)
          }).toThrow(ValidationFailedError)
        })
      })
    })

    it('should parse itself', () => {
      expect(new PercentageValue(new PercentageValue(33.33)).toString()).toEqual('33%')
    })
  })

  describe('PercentageValueType', () => {
    it('should detect invalid types', () => {
      [
        {foo: 'bar'},
        null,
        undefined
      ].forEach(v => {
        expect(() => {
          PercentageValueType(v)
        }).toThrow(TypeError)
      })
    })
    it('should accept valid types', () => {
      PercentageValueType(new PercentageValue(75))
    })
  })

  describe('MaybePercentageValueType', () => {
    it('should accept undefined types', () => {
      MaybePercentageValueType()
      MaybePercentageValueType(null)
    })
  })

  describe('.equals()', () => {
    it('should return true for the same percentages', () => {
      expect(new PercentageValue(33).equals(new PercentageValue(33))).toEqual(true)
    })
    it('should return false for different percentages', () => {
      expect(new PercentageValue(33).equals(new PercentageValue(33.1))).toEqual(false)
    })
  })

  describe('stringIs()', () => {
    it('should accept good percentages as strings', () => {
      goodPercentages.forEach(percentage => expect(PercentageValue.stringIs(percentage[1], `${percentage[1]} should be accepted`)).toEqual(true))
    })
    it('should not accept bad percentages as strings', () => {
      badPercentages.forEach(percentage => expect(PercentageValue.stringIs(percentage, `${percentage[1]} should not be accepted`)).toEqual(false))
    })
  })
})
