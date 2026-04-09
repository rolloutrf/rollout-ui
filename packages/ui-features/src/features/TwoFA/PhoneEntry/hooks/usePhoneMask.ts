import { useCallback, useMemo, useState } from 'react'

import type { PhoneMaskConfig } from '@features-src/features/TwoFA/PhoneEntry/constants/phoneMasks'

const getCountryPrefixDigits = (pattern: string): string => {
  const firstHashIndex = pattern.indexOf('#')

  if (firstHashIndex < 0) {
    return ''
  }

  return pattern.slice(0, firstHashIndex).replace(/\D/g, '')
}

const getMaskPrefix = (pattern: string): string => {
  const firstHashIndex = pattern.indexOf('#')

  if (firstHashIndex < 0) {
    return pattern
  }

  return pattern.slice(0, firstHashIndex).replace(/[^\d+]+$/, '')
}

export const maskPhoneValue = (rawValue: string, pattern: string): string => {
  const countryPrefixDigits = getCountryPrefixDigits(pattern)
  const maskPrefix = getMaskPrefix(pattern)
  let digits = rawValue.replace(/\D/g, '')

  if (countryPrefixDigits && digits.startsWith(countryPrefixDigits)) {
    digits = digits.slice(countryPrefixDigits.length)
  } else if (countryPrefixDigits === '7' && digits.startsWith('8')) {
    // Support users typing a domestic RU/KZ prefix before normalizing to +7 format.
    digits = digits.slice(1)
  }

  if (digits.length === 0) {
    return rawValue.trim().length > 0 ? maskPrefix : ''
  }

  let masked = ''
  let digitIndex = 0

  for (const symbol of pattern) {
    if (digitIndex >= digits.length) {
      break
    }

    if (symbol === '#') {
      masked += digits[digitIndex]
      digitIndex += 1
    } else {
      masked += symbol
    }
  }

  return masked.replace(/[^\d]+$/, '')
}

export const usePhoneMask = (mask: PhoneMaskConfig) => {
  const [value, setValue] = useState<string>('')
  const maskPrefix = useMemo(() => getMaskPrefix(mask.pattern), [mask.pattern])

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const maskedValue = maskPhoneValue(event.target.value, mask.pattern)
      setValue(maskedValue)
      return maskedValue
    },
    [mask.pattern]
  )

  const onFocus = useCallback(() => {
    if (value.length > 0) {
      return value
    }

    setValue(maskPrefix)
    return maskPrefix
  }, [maskPrefix, value])

  return {
    value,
    onChange,
    onFocus,
    placeholder: mask.placeholder,
  }
}
