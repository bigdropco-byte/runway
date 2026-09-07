'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
 * Replace or strip the locale prefix in the pathname.
 * For English (default), does NOT show /en and uses the main URL.
 * e.g., /es/tools/startup-runway-calculator/ -> /tools/startup-runway-calculator/
 * e.g., /tools/startup-runway-calculator/ -> /es/tools/startup-runway-calculator/
 */
export function getLocalizedPath(pathname: string, targetLocale: string): string {
  const cleanPath = pathname || '/';
  const segments = cleanPath.split('/').filter(Boolean);

  // If first segment is an existing locale, remove it
  if (segments.length > 0 && LOCALE_CODES.includes(segments[0].toLowerCase())) {
    segments.shift();
  }

  // English (default locale) shows the main URL with NO /en
  if (targetLocale === DEFAULT_LOCALE) {
    return segments.length === 0 ? '/' : `/${segments.join('/')}/`;
  }

  // Localized non-default locales prepend /[locale]/
  return segments.length === 0 ? `/${targetLocale}/` : `/${targetLocale}/${segments.join('/')}/`;
}

export default function LanguageModal({ isOpen, onClose, currentLocale }: LanguageModalProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() || '/';

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Language Selector Directory"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
    >
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
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
        <div className="p-4 sm:p-6 overflow-y-auto min-h-0 flex-1">
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
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>{SUPPORTED_LOCALES.length} languages available</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-slate-700 font-medium hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
