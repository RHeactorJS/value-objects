import {SlugValue, SlugValueType, MaybeSlugValueType} from '../src'
import {ValidationFailedError} from '@rheactorjs/errors'
import {expect} from 'chai'

/* global describe, it */
/* eslint no-unused-vars: 0 */

describe('SlugValue', () => {
  describe('constructor()', function () {
    it('should parse a slug', () => {
      [
        'some-slug',
        'short'
      ].map(slug => {
        let d = new SlugValue(slug)
        expect(d.toString()).to.equal(slug)
      })
    })

    it('should not parse invalid slugs', () => {
      [
        'not a slug',
        'a-',         //  trailing dash
        'a--',        //  trailing dash
        '-a',         //  leading dash
        '--a'         //  leading dash
      ].map(slug => {
        expect(() => {
          let s = new SlugValue(slug)
        }).to.throw(ValidationFailedError)
      })
    })
  })

  describe('SlugValueType', () => {
    it('should detect invalid types', () => {
      [
        {foo: 'bar'},
        null,
        undefined
      ].map(v => {
        expect(() => {
          SlugValueType(v)
        }).to.throw(TypeError)
      })
    })
    it('should accept valid types', () => {
      SlugValueType(new SlugValue('slug'))
    })
  })

  describe('MaybeSlugValueType', () => {
    it('should accept undefined types', () => {
      MaybeSlugValueType()
      MaybeSlugValueType(null)
    })
  })

  describe('.equals()', () => {
    it('should return true for the same slugs', () => {
      expect(new SlugValue('some-slug').equals(new SlugValue('some-slug'))).to.equal(true)
    })
    it('should return false for different slugs', () => {
      expect(new SlugValue('some-slug').equals(new SlugValue('some-other-slug'))).to.equal(false)
    })
  })
})
