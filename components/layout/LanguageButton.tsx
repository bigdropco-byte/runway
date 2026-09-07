'use client';

import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { getLocaleConfig } from '@/i18n/config';
import LanguageModal from './LanguageModal';

interface LanguageButtonProps {
  currentLocale: string;
  className?: string;
  variant?: 'header' | 'footer';
}

export default function LanguageButton({
  currentLocale,
  className = '',
  variant = 'header'
}: LanguageButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = getLocaleConfig(currentLocale);

  if (variant === 'footer') {
    return (
      <>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`flex items-center space-x-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 transition-colors py-1.5 px-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-white cursor-pointer ${className}`}
          aria-label={`Change language, currently set to ${config.nativeName}`}
        >
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <span>{config.nativeName}</span>
        </button>
        <LanguageModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          currentLocale={currentLocale}
        />
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all cursor-pointer ${className}`}
        aria-label={`Select language. Current language: ${config.nativeName}`}
      >
        <Globe className="w-3.5 h-3.5 text-slate-500" />
        <span>{config.nativeName}</span>
      </button>
      <LanguageModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentLocale={currentLocale}
      />
    </>
  );
}
