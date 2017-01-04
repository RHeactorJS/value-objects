'use strict'

const _map = require('lodash/map')
const DomainValue = require('../domain')
const ValidationFailedError = require('../errors/validation-failed')

/* global describe, it */

const expect = require('chai').expect

describe('DomainValue', () => {
  describe('constructor()', function () {
    it('should parse a domain', (done) => {
      _map([
        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijk.com', // 63 chars
        'rh.com', // two letter
        'r.com', // one letter
        'r-h.com', // with dash
        'xn--mgb9awbf6b.xn--4gbrim', // عُمان.موقع (oman.site)
        'xn--brger-kva.de' // bürger.de
      ], (domain) => {
        let d = new DomainValue(domain)
        expect(d.toString()).to.equal(domain)
      })
      done()
    })

    it('should not parse invalid domains', (done) => {
      _map([
        'bogus', // No second level
        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijkl.com', //  64 chars
        'www.example.com', //  subdomain
        'a-.com', //  trailing dash
        '-a.com' //  leading dash
      ], (domain) => {
        expect(() => {
          DomainValue(domain)
        }, `It should not parse ${domain} as a domain`).to.throw(ValidationFailedError)
      })
      done()
    })
  })

  describe('DomainValue.Type', () => {
    it('should detect invalid types', (done) => {
      _map([
        {foo: 'bar'},
        null,
        undefined
      ], (v) => {
        expect(() => {
          DomainValue.Type(v)
        }).to.throw(TypeError)
      })
      done()
    })
    it('should accept valid types', (done) => {
      DomainValue.Type(new DomainValue('example.com'))
      done()
    })
  })

  describe('.equals()', () => {
    it('should return true for the same emails', () => {
      expect(new DomainValue('resourceful-humans.com').equals(new DomainValue('resourceful-humans.com'))).to.equal(true)
    })
    it('should return false for different emails', () => {
      expect(new DomainValue('resourceful-humans.com').equals(new DomainValue('resourceful-humans.de'))).to.equal(false)
    })
  })
})

