export type PhoneMaskConfig = {
  // Pattern where # is a digit placeholder, for example: +7 (###) ###-##-##
  pattern: string
  placeholder: string
}

export const PHONE_MASKS = {
  ru: { pattern: '+7 (###) ###-##-##', placeholder: '+7 (900) 123-45-67' },
  us: { pattern: '+1 (###) ###-####', placeholder: '+1 (555) 123-4567' },
  by: { pattern: '+375 (##) ###-##-##', placeholder: '+375 (29) 123-45-67' },
  kz: { pattern: '+7 (###) ###-##-##', placeholder: '+7 (700) 123-45-67' },
  ua: { pattern: '+380 (##) ###-##-##', placeholder: '+380 (67) 123-45-67' },
} as const satisfies Record<string, PhoneMaskConfig>

export type PhoneMaskKey = keyof typeof PHONE_MASKS
