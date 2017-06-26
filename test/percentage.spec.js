import {PercentageValue, PercentageValueType, MaybePercentageValueType} from '../src'
import {ValidationFailedError} from '@rheactorjs/errors'
import {expect} from 'chai'

/* global describe, it */
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
      goodPercentages.map(data => {
        let u = new PercentageValue(data[0])
        expect(u.toString()).to.equal(data[1])
        expect(u.valueOf()).to.equal(typeof data[2] !== 'undefined' ? data[2] : data[0])
      })
    })

    it('should not parse invalid percentages', () => {
      badPercentages.map(v => {
        expect(() => {
          let u = new PercentageValue(v)
        }, JSON.stringify(v) + ' should not be accepted as a valid value').to.throw(ValidationFailedError)
      })
    })

    it('should parse itself', () => {
      expect(new PercentageValue(new PercentageValue(33.33)).toString()).to.equal('33%')
    })
  })

  describe('PercentageValueType', () => {
    it('should detect invalid types', () => {
      [
        {foo: 'bar'},
        null,
        undefined
      ].map(v => {
        expect(() => {
          PercentageValueType(v)
        }).to.throw(TypeError)
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
      expect(new PercentageValue(33).equals(new PercentageValue(33))).to.equal(true)
    })
    it('should return false for different percentages', () => {
      expect(new PercentageValue(33).equals(new PercentageValue(33.1))).to.equal(false)
    })
  })

  describe('stringIs()', () => {
    it('should accept good percentages as strings', () => {
      goodPercentages.map(percentage => expect(PercentageValue.stringIs(percentage[1], `${percentage[1]} should be accepted`)).to.equal(true))
    })
    it('should not accept bad percentages as strings', () => {
      badPercentages.map(percentage => expect(PercentageValue.stringIs(percentage, `${percentage[1]} should not be accepted`)).to.equal(false))
    })
  })
})
