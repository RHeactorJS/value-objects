'use strict'

const _map = require('lodash/map')
const DomainValue = require('..//domain')
const Errors = require('../errors')

/* global describe, it */

const expect = require('chai').expect

describe('DomainValue()', function () {
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
      }).to.throw(Errors.ValidationFailedException)
    })
    done()
  })
})
