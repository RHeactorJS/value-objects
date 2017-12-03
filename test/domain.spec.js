import {DomainValue, DomainValueType, MaybeDomainValueType} from '../src'
import {ValidationFailedError} from '@rheactorjs/errors'

/* global describe expect, it */
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
      ].forEach(domain => {
        let d = new DomainValue(domain)
        expect(d.toString()).toEqual(domain.toLowerCase())
      })
    })

    describe('should not parse invalid domains', () => {
      [
        'bogus', // No second level
        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijkl.com', //  64 chars
        'www.example.com', //  subdomain
        'a-.com', //  trailing dash
        '-a.com' //  leading dash
      ].forEach(domain => {
        it(`It should not parse ${domain} as a domain`, () => {
          expect(() => {
            let d = new DomainValue(domain)
          }).toThrow(ValidationFailedError)
        })
      })
    })
  })

  describe('DomainValueType', () => {
    it('should detect invalid types', () => {
      [
        {foo: 'bar'},
        null,
        undefined
      ].forEach(v => {
        expect(() => {
          DomainValueType(v)
        }).toThrow(TypeError)
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
      expect(new DomainValue('resourceful-humans.com').equals(new DomainValue('resourceful-humans.com'))).toEqual(true)
    })
    it('should return true for the same domains (acse-insensitive)', () => {
      expect(new DomainValue('staRHs.example').equals(new DomainValue('starhs.example'))).toEqual(true)
    })
    it('should return false for different domains', () => {
      expect(new DomainValue('resourceful-humans.com').equals(new DomainValue('resourceful-humans.de'))).toEqual(false)
    })
  })
})
