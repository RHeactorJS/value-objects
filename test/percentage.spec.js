'use strict'

const _map = require('lodash/map')
const map = require('lodash/fp/map')
const forEach = require('lodash/fp/forEach')
const PercentageValue = require('../percentage')
const ValidationFailedError = require('../errors/validation-failed')

/* global describe, it */
/* eslint no-unused-vars: 0 */

const expect = require('chai').expect

describe('PercentageValue()', () => {
  it('should accept a percentage', () => {
    map((data) => {
      let u = new PercentageValue(data[0])
      expect(u.toString()).to.equal(data[1])
      expect(u.valueOf()).to.equal(typeof data[2] !== 'undefined' ? data[2] : data[0])
    })(
      [
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
    )
  })

  it('should not parse invalid percentages', () => {
    _map([
      'bogus',
      ''
    ], (v) => {
      expect(() => {
        let u = new PercentageValue(v)
      }, JSON.stringify(v) + ' should not be accepted as a valid value').to.throw(ValidationFailedError)
    })
  })

  it('should parse itself', () => {
    expect(new PercentageValue(new PercentageValue(33.33)).toString()).to.equal('33%')
  })
})

describe('PercentageValue.Type', () => {
  it('should detect invalid types', (done) => {
    _map([
      {foo: 'bar'},
      null,
      undefined
    ], (v) => {
      expect(() => {
        PercentageValue.Type(v)
      }).to.throw(TypeError)
    })
    done()
  })
  it('should accept valid types', (done) => {
    PercentageValue.Type(new PercentageValue(75))
    done()
  })
})
