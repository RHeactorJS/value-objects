'use strict'

const _map = require('lodash/map')
const TimestampValue = require('../timestamp')
const Errors = require('../errors')

/* global describe, it */
/*eslint no-unused-vars: 0*/

const expect = require('chai').expect

describe('TimestampValue()', () => {
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
    }).to.throw(Errors.ValidationFailedException)
    done()
  })

  it('should convert date objects', (done) => {
    const d = new Date()
    const t = new TimestampValue(d)
    expect(t.toString()).to.equal('' + d.getTime())
    done()
  })
})

describe('TimestampValue.toString()', () => {
  it('should return the timestamp as string', (done) => {
    const d = Date.now()
    const t = new TimestampValue(d)
    expect(t.toString()).to.equal('' + d)
    done()
  })
})

describe('TimestampValue.valueOf()', () => {
  it('should return the timestamp as number', (done) => {
    const d = Date.now()
    const t = new TimestampValue(d)
    expect(t.valueOf()).to.equal(d)
    done()
  })
})

describe('TimestampValue.Type', () => {
  it('should detect invalid types', (done) => {
    expect(() => {
      TimestampValue.Type({foo: 'bar'})
    }).to.throw(TypeError)
    done()
  })
  it('should accept valid types', (done) => {
    TimestampValue.Type(new TimestampValue(Date.now()))
    done()
  })
})
