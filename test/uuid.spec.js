import {UUIDValue, UUIDValueType, MaybeUUIDValueType} from '../src'
import {ValidationFailedError} from '@rheactorjs/errors'

/* global describe expect, it */
/* eslint no-unused-vars: 0 */

describe('UUIDValue', () => {
  describe('constructor()', function () {
    it('should parse a uuid', () => {
      [
        'b3002f8c-a482-4b83-8ee9-cb930efc2a49',
        '7e8edab4-3099-4499-af60-ab29e51dbb95'
      ].forEach(uuid => {
        let d = new UUIDValue(uuid)
        expect(d.toString()).toEqual(uuid)
      })
    })

    it('should not parse invalid uuids', () => {
      [
        'not a uuid',
        'a-b-c'
      ].forEach(uuid => {
        expect(() => {
          let s = new UUIDValue(uuid)
        }).toThrow(ValidationFailedError)
      })
    })
  })

  describe('UUIDValueType', () => {
    it('should detect invalid types', () => {
      [
        {foo: 'bar'},
        null,
        undefined
      ].forEach(v => {
        expect(() => {
          UUIDValueType(v)
        }).toThrow(TypeError)
      })
    })
    it('should accept valid types', () => {
      UUIDValueType(new UUIDValue('7e8edab4-3099-4499-af60-ab29e51dbb95'))
    })
  })

  describe('MaybeUUIDValueType', () => {
    it('should accept undefined types', () => {
      MaybeUUIDValueType()
      MaybeUUIDValueType(null)
    })
  })

  describe('.equals()', () => {
    it('should return true for the same uuids', () => {
      expect(new UUIDValue('b3002f8c-a482-4b83-8ee9-cb930efc2a49').equals(new UUIDValue('b3002f8c-a482-4b83-8ee9-cb930efc2a49'))).toEqual(true)
    })
    it('should return false for different uuids', () => {
      expect(new UUIDValue('b3002f8c-a482-4b83-8ee9-cb930efc2a49').equals(new UUIDValue('7e8edab4-3099-4499-af60-ab29e51dbb95'))).toEqual(false)
    })
  })
})
