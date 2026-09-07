/**
 * Central Multilingual Configuration for Runway Calculator
 * Supports 27 languages with native names and directional specifications (LTR/RTL).
 */

export type LocaleDirection = 'ltr' | 'rtl';

export interface LocaleConfig {
  code: string;
  nativeName: string;
  englishName: string;
  direction: LocaleDirection;
  enabled: boolean;
}

export const DEFAULT_LOCALE = 'en';

export const SUPPORTED_LOCALES: LocaleConfig[] = [
  { code: 'en', nativeName: 'English', englishName: 'English', direction: 'ltr', enabled: true },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish', direction: 'ltr', enabled: true },
  { code: 'fr', nativeName: 'Français', englishName: 'French', direction: 'ltr', enabled: true },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German', direction: 'ltr', enabled: true },
  { code: 'pt', nativeName: 'Português', englishName: 'Portuguese', direction: 'ltr', enabled: true },
  { code: 'it', nativeName: 'Italiano', englishName: 'Italian', direction: 'ltr', enabled: true },
  { code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi', direction: 'ltr', enabled: true },
  { code: 'mr', nativeName: 'मराठी', englishName: 'Marathi', direction: 'ltr', enabled: true },
  { code: 'bn', nativeName: 'বাংলা', englishName: 'Bengali', direction: 'ltr', enabled: true },
  { code: 'ar', nativeName: 'العربية', englishName: 'Arabic', direction: 'rtl', enabled: true },
  { code: 'ru', nativeName: 'Русский', englishName: 'Russian', direction: 'ltr', enabled: true },
  { code: 'ja', nativeName: '日本語', englishName: 'Japanese', direction: 'ltr', enabled: true },
  { code: 'ko', nativeName: '한국어', englishName: 'Korean', direction: 'ltr', enabled: true },
  { code: 'zh', nativeName: '中文', englishName: 'Chinese (Simplified)', direction: 'ltr', enabled: true },
  { code: 'tr', nativeName: 'Türkçe', englishName: 'Turkish', direction: 'ltr', enabled: true },
  { code: 'id', nativeName: 'Bahasa Indonesia', englishName: 'Indonesian', direction: 'ltr', enabled: true },
  { code: 'nl', nativeName: 'Nederlands', englishName: 'Dutch', direction: 'ltr', enabled: true },
  { code: 'pl', nativeName: 'Polski', englishName: 'Polish', direction: 'ltr', enabled: true },
  { code: 'sv', nativeName: 'Svenska', englishName: 'Swedish', direction: 'ltr', enabled: true },
  { code: 'da', nativeName: 'Dansk', englishName: 'Danish', direction: 'ltr', enabled: true },
  { code: 'fi', nativeName: 'Suomi', englishName: 'Finnish', direction: 'ltr', enabled: true },
  { code: 'no', nativeName: 'Norsk bokmål', englishName: 'Norwegian', direction: 'ltr', enabled: true },
  { code: 'cs', nativeName: 'Čeština', englishName: 'Czech', direction: 'ltr', enabled: true },
  { code: 'el', nativeName: 'Ελληνικά', englishName: 'Greek', direction: 'ltr', enabled: true },
  { code: 'he', nativeName: 'עברית', englishName: 'Hebrew', direction: 'rtl', enabled: true },
  { code: 'fa', nativeName: 'فارسی', englishName: 'Persian', direction: 'rtl', enabled: true },
  { code: 'ur', nativeName: 'اردو', englishName: 'Urdu', direction: 'rtl', enabled: true }
];

export const LOCALE_CODES = SUPPORTED_LOCALES.map((l) => l.code);

export const NON_DEFAULT_LOCALES = SUPPORTED_LOCALES.filter((l) => l.code !== DEFAULT_LOCALE);
export const NON_DEFAULT_LOCALE_CODES = NON_DEFAULT_LOCALES.map((l) => l.code);

export const RTL_LOCALES = new Set(['ar', 'he', 'fa', 'ur']);

export function isDefaultLocale(code: string): boolean {
  return (code || '').toLowerCase() === DEFAULT_LOCALE;
}

export function isValidLocale(code: string): boolean {
  return LOCALE_CODES.includes(code.toLowerCase());
}

export function getLocaleConfig(code: string): LocaleConfig {
  const normalized = (code || '').toLowerCase();
  const match = SUPPORTED_LOCALES.find((l) => l.code === normalized);
  return match || SUPPORTED_LOCALES[0];
}

export function isRtlLocale(code: string): boolean {
  return RTL_LOCALES.has((code || '').toLowerCase());
}

export function getLocaleDirection(code: string): LocaleDirection {
  return isRtlLocale(code) ? 'rtl' : 'ltr';
}
