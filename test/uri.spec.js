import {URIValue, URIValueType, MaybeURIValueType} from '../src'
import {ValidationFailedError} from '@rheactorjs/errors'
import {expect} from 'chai'

/* global describe, it */
/* eslint no-unused-vars: 0 */

// Test data from https://mathiasbynens.be/demo/url-regex

const goodURIs = [
  'https://example.com',
  'https://example.com/dakjh/sadkjh.html',
  'https://services.digital-bauhaus.solutions/RH-API/V0.94',
  'http://foo.com/blah_blah',
  'http://foo.com/blah_blah/',
  'http://foo.com/blah_blah_(wikipedia)',
  'http://foo.com/blah_blah_(wikipedia)_(again)',
  'http://www.example.com/wpstyle/?p=364',
  'https://www.example.com/foo/?bar=baz&inga=42&quux',
  'http://foo.com/blah_(wikipedia)#cite-1',
  'http://foo.com/blah_(wikipedia)_blah#cite-1',
  'http://foo.com/(something)?after=parens',
  'http://code.google.com/events/#&product=browser',
  'http://j.mp',
  'http://foo.bar/?q=Test%20URL-encoded%20stuff',
  'http://1337.net',
  'http://a.b-c.de',
  'http://223.255.255.254',
  'http://142.42.1.1/',
  'http://142.42.1.1:8080/',
  'http://0.0.0.0',
  'http://10.1.1.0',
  'http://10.1.1.1',
  'https://github.com/RHeactorJS/nucleus/wiki/HttpProblem#409?title=ConflictError&detail=ConflictError%3A%20Already%20registered!',
  'https://static.wixstatic.com/media/dbd157_7aee6.png/v1/fill/w_216,h_217,al_c,usm_0.66_1.00_0.01/dbd157_7aee6.png'
]

const badURIs = [
  'bogus',
  17,
  // Legal URIs, but not supported
  // Auth
  'http://userid:password@example.com:8080',
  'http://userid:password@example.com:8080/',
  'http://userid@example.com',
  'http://userid@example.com/',
  'http://userid@example.com:8080',
  'http://userid@example.com:8080/',
  'http://userid:password@example.com',
  'http://userid:password@example.com/',
  // Unicode
  'http://➡.ws/䨹',
  'http://⌘.ws',
  'http://⌘.ws/',
  'http://☺.damowmow.com/',
  'http://foo.com/unicode_(✪)_in_parens',
  // IDN
  'http://✪df.ws/123',
  'http://مثال.إختبار',
  'http://例子.测试',
  'http://उदाहरण.परीक्षा',
  'http://-.~_!$&\'()*+,;=:%40:80%2f::::::@example.com',
  'ftp://foo.bar/baz', // Scheme not supported
  // Illegal URIs
  'http://',
  'http://.',
  'http://..',
  'http://../',
  'http://?',
  'http://??',
  'http://??/',
  'http://#',
  'http://##',
  'http://##/',
  'http://foo.bar?q=Spaces should be encoded',
  '//',
  '//a',
  '///a',
  '///',
  'http:///a',
  'foo.com',
  'rdar://1234',
  'h://test',
  'http:// shouldfail.com',
  ':// should fail',
  'http://foo.bar/foo(bar)baz quux',
  'ftps://foo.bar/',
  'http://-error-.invalid/',
  // FIXME: 'http://a.b--c.de/',
  'http://-a.b.co',
  'http://a.b-.co',
  'http://3628126748',
  'http://.www.foo.bar/',
  'http://www.foo.bar./',
  'http://.www.foo.bar./',
  // Unescaped fragment
  'https://github.com/RHeactorJS/nucleus/wiki/HttpProblem#409?title=ConflictError&detail=ConflictError: Already registered!',
  'http://foo.com/blah_blah#%'
]

describe('URIValue', () => {
  describe('constructor()', function () {
    it('should parse a URI', () => {
      goodURIs.map(uri => {
        let u = new URIValue(uri)
        expect(u.toString()).to.equal(uri)
      })
    })

    it('should not parse invalid URIs', () => {
      badURIs.map(uri => {
        expect(() => {
          let u = new URIValue(uri)
        }, `this should be an invalid URI: "${uri}"`).to.throw(ValidationFailedError)
      })
    })
    describe('slashless()', () => {
      it('should return a copy with out a slash', () => {
        expect((new URIValue('https://example.com/')).slashless().toString()).to.equal('https://example.com')
        expect((new URIValue('https://example.com')).slashless().toString()).to.equal('https://example.com')
      })
    })
  })

  describe('URIValueType', () => {
    it('should detect invalid types', () => {
      [
        {foo: 'bar'},
        null,
        undefined
      ].map(v => {
        expect(() => {
          URIValueType(v)
        }).to.throw(TypeError)
      })
    })
    it('should accept valid types', () => {
      URIValueType(new URIValue('https://example.com'))
    })
  })

  describe('MaybeURIValueType', () => {
    it('should accept undefined types', () => {
      MaybeURIValueType()
      MaybeURIValueType(null)
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

  describe('stringIs()', () => {
    it('should accept good URIs as strings', () => {
      goodURIs.map(uri => expect(URIValue.stringIs(uri)).to.equal(true))
    })
    it('should not accept bad URIs as strings', () => {
      badURIs.map(uri => expect(URIValue.stringIs(uri)).to.equal(false))
    })
  })

  describe('append()', () => {
    it('should return a new URL with the appended string', () => {
      const u = new URIValue('https://example.com')
      const u2 = u.append('/status')
      expect(u2.toString(), 'it should concatenate the string to the URI').to.equal('https://example.com/status')
      expect(u, 'it should create a new instance').to.not.equal(u2)
    })
  })
})
