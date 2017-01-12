'use strict'

import {DomainValue, DomainValueType} from '../src'
import {ValidationFailedError} from 'rheactor-errors'
import {expect} from 'chai'

/* global describe, it */
/* eslint no-unused-vars: 0 */

describe('DomainValue', () => {
  describe('constructor()', function () {
    it('should parse a domain', (done) => {
      [
        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijk.com', // 63 chars
        'rh.com', // two letter
        'r.com', // one letter
        'r-h.com', // with dash
        'xn--mgb9awbf6b.xn--4gbrim', // عُمان.موقع (oman.site)
        'xn--brger-kva.de' // bürger.de
      ].map(domain => {
        let d = new DomainValue(domain)
        expect(d.toString()).to.equal(domain)
      })
      done()
    })

    it('should not parse invalid domains', (done) => {
      [
        'bogus', // No second level
        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijkl.com', //  64 chars
        'www.example.com', //  subdomain
        'a-.com', //  trailing dash
        '-a.com' //  leading dash
      ].map(domain => {
        expect(() => {
          let d = new DomainValue(domain)
        }, `It should not parse ${domain} as a domain`).to.throw(ValidationFailedError)
      })
      done()
    })
  })

  describe('DomainValueType', () => {
    it('should detect invalid types', (done) => {
      [
        {foo: 'bar'},
        null,
        undefined
      ].map(v => {
        expect(() => {
          DomainValueType(v)
        }).to.throw(TypeError)
      })
      done()
    })
    it('should accept valid types', (done) => {
      DomainValueType(new DomainValue('example.com'))
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

