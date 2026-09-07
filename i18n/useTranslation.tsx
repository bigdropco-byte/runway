'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { DEFAULT_LOCALE, getLocaleConfig, isRtlLocale, LocaleDirection } from './config';

interface TranslationContextType {
  locale: string;
  dir: LocaleDirection;
  isRtl: boolean;
  t: (path: string, params?: Record<string, string | number>) => string;
}

const TranslationContext = createContext<TranslationContextType>({
  locale: DEFAULT_LOCALE,
  dir: 'ltr',
  isRtl: false,
  t: (key: string) => key
});

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

export function TranslationProvider({
  children,
  locale,
  messages,
  fallbackMessages
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
  fallbackMessages?: Record<string, unknown>;
}) {
  const dir = isRtlLocale(locale) ? 'rtl' : 'ltr';
  const isRtl = dir === 'rtl';

  const t = useMemo(() => {
    return (pathStr: string, params?: Record<string, string | number>): string => {
      const val =
        getNestedValue(messages, pathStr) ??
        (fallbackMessages ? getNestedValue(fallbackMessages, pathStr) : undefined) ??
        pathStr;

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
  }, [messages, fallbackMessages]);

  return (
    <TranslationContext.Provider value={{ locale, dir, isRtl, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    return {
      locale: DEFAULT_LOCALE,
      dir: 'ltr' as LocaleDirection,
      isRtl: false,
      t: (k: string) => k
    };
  }
  return context;
}
