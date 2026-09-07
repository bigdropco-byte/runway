import { DEFAULT_LOCALE, isValidLocale } from './config';
import fs from 'fs';
import path from 'path';

// Memory cache for parsed JSON translations
const translationCache: Record<string, Record<string, unknown>> = {};

function loadLocaleFile(locale: string): Record<string, unknown> {
  const code = isValidLocale(locale) ? locale.toLowerCase() : DEFAULT_LOCALE;
  if (translationCache[code]) {
    return translationCache[code];
  }

  try {
    const filePath = path.join(process.cwd(), 'locales', `${code}.json`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(content);
      translationCache[code] = parsed;
      return parsed;
    }
  } catch (err) {
    console.error(`Failed to load translation for locale: ${code}`, err);
  }

  // Fallback to English
  if (code !== DEFAULT_LOCALE) {
    return loadLocaleFile(DEFAULT_LOCALE);
  }

  return {};
}

function getNestedValue(obj: Record<string, unknown>, pathStr: string): unknown {
  const keys = pathStr.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return current;
}

export type TranslateFunction = (path: string, params?: Record<string, string | number>) => string;

/**
 * Server-side translation helper
 * Usage:
 * const t = getTranslations(locale);
 * const heading = t('calculator.title');
 */
export function getTranslations(locale: string): TranslateFunction {
  const targetLocale = isValidLocale(locale) ? locale.toLowerCase() : DEFAULT_LOCALE;
  const currentTranslations = loadLocaleFile(targetLocale);
  const fallbackTranslations = targetLocale !== DEFAULT_LOCALE ? loadLocaleFile(DEFAULT_LOCALE) : currentTranslations;

  return function t(pathStr: string, params?: Record<string, string | number>): string {
    const val = getNestedValue(currentTranslations, pathStr) ?? getNestedValue(fallbackTranslations, pathStr) ?? pathStr;
    if (typeof val !== 'string') {
      return pathStr;
    }
    if (!params) {
      return val;
    }
    return Object.entries(params).reduce((str, [k, v]) => {
      return str.replace(new RegExp(`{${k}}`, 'g'), String(v));
    }, val);
  };
}

/**
 * Get raw translation object for client bundle injection
 */
export function getLocaleMessages(locale: string): Record<string, unknown> {
  return loadLocaleFile(locale);
}
