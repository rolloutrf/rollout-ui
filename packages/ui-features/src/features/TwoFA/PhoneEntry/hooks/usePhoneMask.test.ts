import { describe, it, expect } from 'vitest'

import { PHONE_MASKS } from '../constants/phoneMasks'

import { maskPhoneValue } from './usePhoneMask'

describe('maskPhoneValue', () => {
  describe('empty / whitespace input', () => {
    it('returns empty string for empty input', () => {
      expect(maskPhoneValue('', PHONE_MASKS.ru.pattern)).toBe('')
    })

    it('returns empty string for whitespace-only input', () => {
      expect(maskPhoneValue('   ', PHONE_MASKS.ru.pattern)).toBe('')
    })
  })

  describe('+7 pattern (ru / kz)', () => {
    const { pattern } = PHONE_MASKS.ru

    it('formats partial input', () => {
      expect(maskPhoneValue('900', pattern)).toBe('+7 (900')
    })

    it('formats a complete 10-digit subscriber number', () => {
      expect(maskPhoneValue('9001234567', pattern)).toBe('+7 (900) 123-45-67')
    })

    it('strips the +7 country prefix before masking', () => {
      expect(maskPhoneValue('79001234567', pattern)).toBe('+7 (900) 123-45-67')
    })

    it('strips the domestic Russian prefix 8 before masking', () => {
      expect(maskPhoneValue('89001234567', pattern)).toBe('+7 (900) 123-45-67')
    })

    it('ignores extra digits beyond the pattern length', () => {
      expect(maskPhoneValue('90012345679999', pattern)).toBe('+7 (900) 123-45-67')
    })

    it('strips non-digit characters from raw value', () => {
      expect(maskPhoneValue('900-123-45-67', pattern)).toBe('+7 (900) 123-45-67')
    })

    it('returns the mask prefix when only the country code digits are provided', () => {
      expect(maskPhoneValue('+7', pattern)).toBe('+7')
    })
  })

  describe('+1 pattern (us)', () => {
    const { pattern } = PHONE_MASKS.us

    it('formats a complete 10-digit subscriber number', () => {
      expect(maskPhoneValue('5551234567', pattern)).toBe('+1 (555) 123-4567')
    })

    it('strips the +1 country prefix before masking', () => {
      expect(maskPhoneValue('15551234567', pattern)).toBe('+1 (555) 123-4567')
    })

    it('formats partial input', () => {
      expect(maskPhoneValue('555', pattern)).toBe('+1 (555')
    })
  })

  describe('+375 pattern (by)', () => {
    const { pattern } = PHONE_MASKS.by

    it('formats a complete subscriber number', () => {
      expect(maskPhoneValue('291234567', pattern)).toBe('+375 (29) 123-45-67')
    })

    it('strips the +375 country prefix before masking', () => {
      expect(maskPhoneValue('375291234567', pattern)).toBe('+375 (29) 123-45-67')
    })

    it('formats partial input', () => {
      expect(maskPhoneValue('29', pattern)).toBe('+375 (29')
    })
  })

  describe('+380 pattern (ua)', () => {
    const { pattern } = PHONE_MASKS.ua

    it('formats a complete subscriber number', () => {
      expect(maskPhoneValue('671234567', pattern)).toBe('+380 (67) 123-45-67')
    })

    it('strips the +380 country prefix before masking', () => {
      expect(maskPhoneValue('380671234567', pattern)).toBe('+380 (67) 123-45-67')
    })
  })
})
