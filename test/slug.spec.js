'use strict'

import {SlugValue, SlugValueType} from '../src'
import {ValidationFailedError} from '../src/errors'

/* global describe, it */
/* eslint no-unused-vars: 0 */

const expect = require('chai').expect

describe('SlugValue', () => {
  describe('constructor()', function () {
    it('should parse a slug', (done) => {
      [
        'some-slug',
        'short'
      ].map(slug => {
        let d = new SlugValue(slug)
        expect(d.toString()).to.equal(slug)
      })
      done()
    })

    it('should not parse invalid slugs', (done) => {
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
      done()
    })
  })

  describe('Type', () => {
    it('should detect invalid types', (done) => {
      [
        {foo: 'bar'},
        null,
        undefined
      ].map(v => {
        expect(() => {
          SlugValueType(v)
        }).to.throw(TypeError)
      })
      done()
    })
    it('should accept valid types', (done) => {
      SlugValueType(new SlugValue('slug'))
      done()
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
