'use strict'

import {URIValue, URIValueType} from '../src'
import {ValidationFailedError} from '../src/errors'

/* global describe, it */
/* eslint no-unused-vars: 0 */

const expect = require('chai').expect

describe('URIValue', () => {
  describe('constructor()', function () {
    it('should parse a URI', (done) => {
      [
        'https://example.com',
        'https://example.com/dakjh/sadkjh.html'
      ].map(uri => {
        let u = new URIValue(uri)
        expect(u.toString()).to.equal(uri)
      })
      done()
    })

    it('should not parse invalid URIs', (done) => {
      [
        'bogus',
        17
      ].map(uri => {
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

  describe('Type()', () => {
    it('should detect invalid types', (done) => {
      [
        {foo: 'bar'},
        null,
        undefined
      ].map(v => {
        expect(() => {
          URIValueType(v)
        }).to.throw(TypeError)
      })
      done()
    })
    it('should accept valid types', (done) => {
      URIValueType(new URIValue('https://example.com'))
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
