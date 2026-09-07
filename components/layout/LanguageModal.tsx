'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Check, Globe } from 'lucide-react';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, LOCALE_CODES } from '@/i18n/config';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: string;
}

/**
 * Replace the locale prefix in the pathname, preserving the rest of the path.
 * e.g., /en/tools/startup-runway-calculator -> /es/tools/startup-runway-calculator
 */
export function getLocalizedPath(pathname: string, targetLocale: string): string {
  if (!pathname || pathname === '/') {
    return `/${targetLocale}/`;
  }

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) {
    return `/${targetLocale}/`;
  }

  // Check if first segment is an existing locale
  if (LOCALE_CODES.includes(segments[0].toLowerCase())) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }

  return `/${segments.join('/')}/`;
}

export default function LanguageModal({ isOpen, onClose, currentLocale }: LanguageModalProps) {
  const pathname = usePathname() || '/';

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Language Selector Directory"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Select Language</h2>
              <p className="text-xs text-slate-500">Choose your preferred language directory</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close language selector"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Column Desktop Grid / 2-Column Mobile Grid */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {SUPPORTED_LOCALES.map((locale) => {
              const isSelected = locale.code === currentLocale;
              const targetUrl = getLocalizedPath(pathname, locale.code);

              return (
                <Link
                  key={locale.code}
                  href={targetUrl}
                  onClick={onClose}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all text-start group cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950 font-bold shadow-2xs'
                      : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  lang={locale.code}
                  dir={locale.direction}
                >
                  <div className="flex flex-col">
                    <span
                      className={`text-sm tracking-tight ${
                        isSelected ? 'font-bold text-indigo-900' : 'font-medium text-slate-900 group-hover:text-indigo-600'
                      }`}
                    >
                      {locale.nativeName}
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      {locale.englishName}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>{SUPPORTED_LOCALES.length} languages available</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-slate-700 font-medium hover:bg-slate-200/70 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
