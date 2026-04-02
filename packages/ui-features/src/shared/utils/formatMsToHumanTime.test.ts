import { describe, it, expect } from 'vitest'

import { formatMsToTime } from './formatMsToHumanTime'

describe('formatMsToTime', () => {
  describe('with showLeadingZeros = true (default)', () => {
    it('should format 0 ms', () => {
      expect(formatMsToTime(0)).toBe('00:00:00')
    })

    it('should format seconds only', () => {
      expect(formatMsToTime(5000)).toBe('00:00:05')
    })

    it('should format minutes and seconds', () => {
      expect(formatMsToTime(65_000)).toBe('00:01:05')
    })

    it('should format hours, minutes, and seconds', () => {
      expect(formatMsToTime(3_661_000)).toBe('01:01:01')
    })

    it('should floor fractional milliseconds', () => {
      expect(formatMsToTime(1999)).toBe('00:00:01')
    })

    it('should handle exact minute boundary', () => {
      expect(formatMsToTime(60_000)).toBe('00:01:00')
    })

    it('should handle exact hour boundary', () => {
      expect(formatMsToTime(3_600_000)).toBe('01:00:00')
    })

    it('should pad large hour values', () => {
      expect(formatMsToTime(36_000_000)).toBe('10:00:00')
    })
  })

  describe('with showLeadingZeros = false', () => {
    it('should return only seconds when no minutes or hours', () => {
      expect(formatMsToTime(5000, false)).toBe('05')
    })

    it('should return only seconds for 0 ms', () => {
      expect(formatMsToTime(0, false)).toBe('00')
    })

    it('should include hours when hours > 0', () => {
      expect(formatMsToTime(3_661_000, false)).toBe('01:01:01')
    })

    it('should return seconds only for minutes without hours (minutes leading zeros omitted)', () => {
      // When showLeadingZeros=false and hours=0, the code returns two(seconds)
      // regardless of minutes due to the condition `minutes > 0 && showLeadingZeros`
      expect(formatMsToTime(65_000, false)).toBe('05')
    })
  })

  describe('error handling', () => {
    it('should throw for negative values', () => {
      expect(() => formatMsToTime(-1)).toThrow('ms must be a non-negative finite number')
    })

    it('should throw for NaN', () => {
      expect(() => formatMsToTime(NaN)).toThrow('ms must be a non-negative finite number')
    })

    it('should throw for Infinity', () => {
      expect(() => formatMsToTime(Infinity)).toThrow('ms must be a non-negative finite number')
    })

    it('should throw for -Infinity', () => {
      expect(() => formatMsToTime(-Infinity)).toThrow('ms must be a non-negative finite number')
    })
  })
})
