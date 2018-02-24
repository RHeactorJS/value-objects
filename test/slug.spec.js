import {SlugValue, SlugValueType, MaybeSlugValueType} from '../src'
import {ValidationFailedError} from '@rheactorjs/errors'

/* global describe expect, it */
/* eslint no-unused-vars: 0 */

describe('SlugValue', () => {
  describe('constructor()', function () {
    it('should parse a slug', () => {
      [
        'some-slug',
        'short'
      ].forEach(slug => {
        let d = new SlugValue(slug)
        expect(d.toString()).toEqual(slug)
      })
    })

    it('should not parse invalid slugs', () => {
      [
        'not a slug',
        'a-', //  trailing dash
        'a--', //  trailing dash
        '-a', //  leading dash
        '--a' //  leading dash
      ].forEach(slug => {
        expect(() => {
          let s = new SlugValue(slug)
        }).toThrow(ValidationFailedError)
      })
    })
  })

  describe('SlugValueType', () => {
    it('should detect invalid types', () => {
      [
        {foo: 'bar'},
        null,
        undefined
      ].forEach(v => {
        expect(() => {
          SlugValueType(v)
        }).toThrow(TypeError)
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
      expect(new SlugValue('some-slug').equals(new SlugValue('some-slug'))).toEqual(true)
    })
    it('should return false for different slugs', () => {
      expect(new SlugValue('some-slug').equals(new SlugValue('some-other-slug'))).toEqual(false)
    })
  })
})
