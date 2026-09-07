import React from 'react';
import { notFound } from 'next/navigation';
import { NON_DEFAULT_LOCALES, isValidLocale, getLocaleConfig } from '@/i18n/config';
import { getLocaleMessages } from '@/i18n/getTranslations';
import { TranslationProvider } from '@/i18n/useTranslation';
import DirectionProvider from '@/components/layout/DirectionProvider';

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((l) => ({ locale: l.code }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const config = getLocaleConfig(locale);
  const messages = getLocaleMessages(locale);
  const fallbackMessages = getLocaleMessages('en');

  return (
    <TranslationProvider
      locale={locale}
      messages={messages}
      fallbackMessages={fallbackMessages}
    >
      <DirectionProvider dir={config.direction} lang={config.code}>
        <div dir={config.direction} lang={config.code} className="w-full flex-1 flex flex-col">
          {children}
        </div>
      </DirectionProvider>
    </TranslationProvider>
  );
}
