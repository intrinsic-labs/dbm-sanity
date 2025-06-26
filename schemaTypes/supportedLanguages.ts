// Define supported languages for internationalization
export const supportedLanguages = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'uk', title: 'English (UK)' },
  { id: 'de', title: 'German' },
  { id: 'fr', title: 'French' },
  { id: 'es', title: 'Spanish' },
  { id: 'it', title: 'Italian' }
]

// Base language for fallbacks
export const baseLanguage = supportedLanguages.find(l => l.isDefault) 