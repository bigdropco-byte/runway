import React from 'react';
import type { Metadata } from 'next';
import LocalizedHomePage, { generateMetadata as getLocalizedMetadata } from './[locale]/page';
import { getLocaleMessages } from '@/i18n/getTranslations';
import { TranslationProvider } from '@/i18n/useTranslation';

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  return getLocalizedMetadata({ params: Promise.resolve({ locale: 'en' }) });
}

export default async function RootEnglishPage() {
  const messages = getLocaleMessages('en');
  return (
    <TranslationProvider locale="en" messages={messages} fallbackMessages={messages}>
      <LocalizedHomePage params={Promise.resolve({ locale: 'en' })} />
    </TranslationProvider>
  );
}
