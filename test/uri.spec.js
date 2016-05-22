'use strict'

const _map = require('lodash/map')
const URIValue = require('..//uri')
const Errors = require('../errors')

/* global describe, it */
/*eslint no-unused-vars: 0*/

const expect = require('chai').expect

describe('URIValue()', function () {
  it('should parse a URI', (done) => {
    _map([
      'https://example.com',
      'https://example.com/dakjh/sadkjh.html'
    ], (uri) => {
      let u = new URIValue(uri)
      expect(u.toString()).to.equal(uri)
    })
    done()
  })

  it('should not parse invalid URIs', (done) => {
    _map([
      'bogus',
      17
    ], (uri) => {
      expect(() => {
        let u = new URIValue(uri)
      }).to.throw(Errors.ValidationFailedException)
    })
    done()
  })
})
