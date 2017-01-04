'use strict'

const _map = require('lodash/map')
const URIValue = require('../src/uri')
const ValidationFailedError = require('../src/errors/validation-failed')

/* global describe, it */
/* eslint no-unused-vars: 0 */

const expect = require('chai').expect

describe('URIValue', () => {
  describe('constructor()', function () {
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
        }).to.throw(ValidationFailedError)
      })
      done()
    })
    describe('slashless()', () => {
      it('should return a copy with out a slash', () => {
        expect((new URIValue('https://example.com/')).slashless().toString()).to.equal('https://example.com')
        expect((new URIValue('https://example.com')).slashless().toString()).to.equal('https://example.com')
      })
    })
  })

  describe('.Type()', () => {
    it('should detect invalid types', (done) => {
      _map([
        {foo: 'bar'},
        null,
        undefined
      ], (v) => {
        expect(() => {
          URIValue.Type(v)
        }).to.throw(TypeError)
      })
      done()
    })
    it('should accept valid types', (done) => {
      URIValue.Type(new URIValue('https://example.com'))
      done()
    })
  })

  describe('.equals()', () => {
    it('should return true for the same URLs', () => {
      expect(new URIValue('https://example.com').equals(new URIValue('https://example.com'))).to.equal(true)
    })
    it('should return false for different URLs', () => {
      expect(new URIValue('https://example.com').equals(new URIValue('http://example.com'))).to.equal(false)
    })
  })
})
