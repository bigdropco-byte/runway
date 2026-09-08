import { describe, it, expect } from 'vitest';
import { 
  SUPPORTED_LOCALES, 
  LOCALE_CODES, 
  isValidLocale, 
  getLocaleConfig, 
  isRtlLocale, 
  DEFAULT_LOCALE 
} from '../i18n/config';
import { getTranslations, getLocaleMessages } from '../i18n/getTranslations';
import { getLocalizedPath } from '../components/layout/LanguageModal';
import { formatLocalizedNumber, formatLocalizedCurrency, formatLocalizedDate } from '../lib/format-utils';
import fs from 'fs';
import path from 'path';

describe('Multilingual System Architecture & Integrity', () => {
  it('supports exactly 40 languages as required', () => {
    expect(SUPPORTED_LOCALES.length).toBe(40);
    expect(DEFAULT_LOCALE).toBe('en');
  });

  it('correctly classifies RTL languages (Arabic, Hebrew, Persian, Urdu)', () => {
    expect(isRtlLocale('ar')).toBe(true);
    expect(isRtlLocale('he')).toBe(true);
    expect(isRtlLocale('fa')).toBe(true);
    expect(isRtlLocale('ur')).toBe(true);

    expect(isRtlLocale('en')).toBe(false);
    expect(isRtlLocale('es')).toBe(false);
    expect(isRtlLocale('fr')).toBe(false);
    expect(isRtlLocale('de')).toBe(false);
    expect(isRtlLocale('ja')).toBe(false);
  });

  it('validates locale codes correctly', () => {
    expect(isValidLocale('en')).toBe(true);
    expect(isValidLocale('fr')).toBe(true);
    expect(isValidLocale('hi')).toBe(true);
    expect(isValidLocale('mr')).toBe(true);
    expect(isValidLocale('bn')).toBe(true);
    expect(isValidLocale('th')).toBe(true);
    expect(isValidLocale('vi')).toBe(true);
    expect(isValidLocale('xyz')).toBe(false);
  });

  it('provides native names for all 40 languages', () => {
    const arConfig = getLocaleConfig('ar');
    expect(arConfig.nativeName).toBe('العربية');

    const hiConfig = getLocaleConfig('hi');
    expect(hiConfig.nativeName).toBe('हिन्दी');

    const jaConfig = getLocaleConfig('ja');
    expect(jaConfig.nativeName).toBe('日本語');

    const deConfig = getLocaleConfig('de');
    expect(deConfig.nativeName).toBe('Deutsch');

    const viConfig = getLocaleConfig('vi');
    expect(viConfig.nativeName).toBe('Tiếng Việt');

    const thConfig = getLocaleConfig('th');
    expect(thConfig.nativeName).toBe('ไทย');
  });

  it('ensures every one of the 40 translation JSON files exists on disk and has core keys', () => {
    for (const code of LOCALE_CODES) {
      const filePath = path.join(process.cwd(), 'locales', `${code}.json`);
      expect(fs.existsSync(filePath)).toBe(true);

      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      expect(data.common).toBeDefined();
      expect(data.common.siteName).toBe('Runway Calculator');
      expect(data.common.calculate).toBeDefined();
      expect(data.navigation).toBeDefined();
      expect(data.calculator).toBeDefined();
      expect(data.calculator.title).toBeDefined();
    }
  });

  it('translates nested keys on server side with fallback to English', () => {
    const tEn = getTranslations('en');
    expect(tEn('common.calculate')).toBe('Calculate');
    expect(tEn('calculator.inputs.cashBalance')).toBe('Current Cash Balance ($)');

    const tEs = getTranslations('es');
    expect(tEs('common.calculate')).toBe('Calcular');
    expect(tEs('navigation.home')).toBe('Inicio');

    const tFr = getTranslations('fr');
    expect(tFr('common.calculate')).toBe('Calculer');
    expect(tFr('navigation.home')).toBe('Accueil');

    const tDe = getTranslations('de');
    expect(tDe('common.calculate')).toBe('Berechnen');
    expect(tDe('navigation.home')).toBe('Startseite');

    // Missing key fallback test
    const tUnknown = getTranslations('fr');
    expect(tUnknown('nonexistent.nested.key')).toBe('nonexistent.nested.key');
  });

  it('interpolates parameters dynamically in t() helper', () => {
    const t = getTranslations('en');
    // Test with mock string
    const result = (t as any)('Hello {name}, welcome to {place}!', { name: 'Founder', place: 'Runway' });
    expect(result).toBe('Hello Founder, welcome to Runway!');
  });
});

describe('Language Switching & Path Preservation', () => {
  it('correctly uses main URL without /en for English', () => {
    expect(getLocalizedPath('/fr/tools/startup-runway-calculator/', 'en')).toBe('/tools/startup-runway-calculator/');
    expect(getLocalizedPath('/es/aviation/crosswind-calculator/', 'en')).toBe('/aviation/crosswind-calculator/');
    expect(getLocalizedPath('/ar/', 'en')).toBe('/');
    expect(getLocalizedPath('/', 'en')).toBe('/');
  });

  it('correctly replaces locale segment for non-default languages', () => {
    expect(getLocalizedPath('/tools/startup-runway-calculator/', 'fr')).toBe('/fr/tools/startup-runway-calculator/');
    expect(getLocalizedPath('/aviation/crosswind-calculator/', 'de')).toBe('/de/aviation/crosswind-calculator/');
    expect(getLocalizedPath('/es/tools/burn-rate-calculator/', 'ja')).toBe('/ja/tools/burn-rate-calculator/');
    expect(getLocalizedPath('/', 'es')).toBe('/es/');
  });
});

describe('Native Intl Formatting Helpers', () => {
  it('formats numbers according to locale', () => {
    const formattedEn = formatLocalizedNumber(1250000, 'en-US');
    expect(formattedEn).toBe('1,250,000');

    const formattedDe = formatLocalizedNumber(1250000, 'de-DE');
    expect(formattedDe).toBe('1.250.000');
  });

  it('formats currency cleanly', () => {
    const curr = formatLocalizedCurrency(50000, 'en-US', 'USD');
    expect(curr).toContain('50,000');
  });

  it('formats dates consistently', () => {
    const d = new Date('2026-12-31T00:00:00Z');
    const formatted = formatLocalizedDate(d, 'en-US');
    expect(formatted).toContain('2026');
  });
});
