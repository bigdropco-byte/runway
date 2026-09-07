'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { locale, t } = useTranslation();

  const lp = (path: string) => {
    const clean = path.startsWith('/') ? path : `/${path}`;
    if (!locale || locale === 'en') {
      return clean;
    }
    if (clean === `/${locale}` || clean.startsWith(`/${locale}/`)) {
      return clean;
    }
    return `/${locale}${clean === '/' ? '' : clean}`;
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-xs text-slate-500">
      <Link
        href={lp('/')}
        className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <Home className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
        <span>{t('navigation.home')}</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.url}>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0 rtl:rotate-180" />
            {isLast ? (
              <span className="font-medium text-slate-800 truncate max-w-[200px] sm:max-w-none" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                href={lp(item.url)}
                className="hover:text-indigo-600 transition-colors truncate max-w-[150px] sm:max-w-none"
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
