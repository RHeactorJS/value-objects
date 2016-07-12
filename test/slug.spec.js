'use strict'

const _map = require('lodash/map')
const SlugValue = require('..//slug')
const Errors = require('../errors')

/* global describe, it */

const expect = require('chai').expect

describe('SlugValue()', function () {
  it('should parse a slug', (done) => {
    _map([
      'some-slug',
      'short'
    ], (slug) => {
      let d = new SlugValue(slug)
      expect(d.toString()).to.equal(slug)
    })
    done()
  })

  it('should not parse invalid slugs', (done) => {
    _map([
      'not a slug',
      'a-',         //  trailing dash
      'a--',        //  trailing dash
      '-a',         //  leading dash
      '--a'         //  leading dash
    ], (slug) => {
      expect(() => {
        SlugValue(slug)
      }).to.throw(Errors.ValidationFailedException)
    })
    done()
  })
})

describe('SlugValue.Type', () => {
  it('should detect invalid types', (done) => {
    expect(() => {
      SlugValue.Type({foo: 'bar'})
    }).to.throw(TypeError)
    done()
  })
  it('should accept valid types', (done) => {
    SlugValue.Type(new SlugValue('slug'))
    done()
  })
})
