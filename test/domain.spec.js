import {DomainValue, DomainValueType, MaybeDomainValueType} from '../src'
import {ValidationFailedError} from '@rheactorjs/errors'
import {expect} from 'chai'

/* global describe, it */
/* eslint no-unused-vars: 0 */

describe('DomainValue', () => {
  describe('constructor()', function () {
    it('should parse a domain', () => {
      [
        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijk.com', // 63 chars
        'staRHs.example', // case-insensitive
        'rh.com', // two letter
        'r.com', // one letter
        'r-h.com', // with dash
        'xn--mgb9awbf6b.xn--4gbrim', // عُمان.موقع (oman.site)
        'xn--brger-kva.de' // bürger.de
      ].map(domain => {
        let d = new DomainValue(domain)
        expect(d.toString()).to.equal(domain.toLowerCase())
      })
    })

    it('should not parse invalid domains', () => {
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
    })
  })

  describe('DomainValueType', () => {
    it('should detect invalid types', () => {
      [
        {foo: 'bar'},
        null,
        undefined
      ].map(v => {
        expect(() => {
          DomainValueType(v)
        }).to.throw(TypeError)
      })
    })
    it('should accept valid types', () => {
      DomainValueType(new DomainValue('example.com'))
    })
  })

  describe('MaybeDomainValueType', () => {
    it('should accept undefined types', () => {
      MaybeDomainValueType()
      MaybeDomainValueType(null)
    })
  })

  describe('.equals()', () => {
    it('should return true for the same domains', () => {
      expect(new DomainValue('resourceful-humans.com').equals(new DomainValue('resourceful-humans.com'))).to.equal(true)
    })
    it('should return true for the same domains (acse-insensitive)', () => {
      expect(new DomainValue('staRHs.example').equals(new DomainValue('starhs.example'))).to.equal(true)
    })
    it('should return false for different domains', () => {
      expect(new DomainValue('resourceful-humans.com').equals(new DomainValue('resourceful-humans.de'))).to.equal(false)
    })
  })
})
