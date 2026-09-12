'use client';

import React from 'react';
import Link from 'next/link';
import { Calculator, ShieldCheck, Lock, Plane } from 'lucide-react';
import CookiePreferencesButton from '@/components/layout/CookiePreferencesButton';
import LanguageButton from '@/components/layout/LanguageButton';
import { useTranslation } from '@/i18n/useTranslation';

export default function Footer() {
  const { locale, t } = useTranslation();

  const lp = (path: string) => {
    if (path.startsWith('/#') || path.startsWith('#')) {
      const hash = path.startsWith('/') ? path : `/${path}`;
      if (!locale || locale === 'en') {
        return hash;
      }
      return `/${locale}${hash}`;
    }
    const clean = path.startsWith('/') ? path : `/${path}`;
    const withSlash = clean.endsWith('/') ? clean : `${clean}/`;
    if (!locale || locale === 'en') {
      return withSlash;
    }
    if (withSlash === `/${locale}/` || withSlash.startsWith(`/${locale}/`)) {
      return withSlash;
    }
    return `/${locale}${withSlash === '/' ? '/' : withSlash}`.replace(/\/\//g, '/');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Privacy Statement */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={lp('/')} className="flex items-center space-x-2.5 text-white">
              <img
                src="/favicon.png"
                alt="Runway Calculator Logo"
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg shadow-xs object-cover"
              />
              <span className="text-lg font-bold tracking-tight">
                Runway<span className="text-indigo-400">Calculator</span>
              </span>
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              {t('common.tagline')}. 100% private in-browser computation.
            </p>
            <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/60 max-w-sm">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Zero Server-Side Storage</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-normal">
                Your calculations happen locally in your browser. We do not need, transmit, or store your financial data to calculate your runway.
              </p>
            </div>
          </div>

          {/* Financial Tools */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              {t('navigation.financialTools')}
            </h3>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href={lp('/tools/startup-runway-calculator')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('financialTools.startupRunway')}
                </Link>
              </li>
              <li>
                <Link href={lp('/tools/hiring-runway-calculator')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('financialTools.hiringRunway')}
                </Link>
              </li>
              <li>
                <Link href={lp('/tools/default-alive-calculator')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('financialTools.defaultAlive')}
                </Link>
              </li>
              <li>
                <Link href={lp('/tools/safe-dilution-runway-calculator')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('financialTools.safeDilution')}
                </Link>
              </li>
              <li>
                <Link href={lp('/tools/cash-runway-calculator')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('financialTools.cashRunway')}
                </Link>
              </li>
              <li>
                <Link href={lp('/tools/burn-rate-calculator')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('financialTools.burnRate')}
                </Link>
              </li>
              <li>
                <Link href={lp('/tools/runway-calculator-excel')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('financialTools.excelTemplate')}
                </Link>
              </li>
              <li>
                <Link href={lp('/tools/runway-extension-calculator')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('financialTools.extensionSolver')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Aviation Tools */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 flex items-center">
              <Plane className="w-3.5 h-3.5 mr-1 text-indigo-400" />
              {t('navigation.aviationTools')}
            </h3>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href={lp('/aviation/crosswind-calculator')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('aviationTools.crosswind')}
                </Link>
              </li>
              <li>
                <Link href={lp('/aviation/runway-slope-calculator')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('aviationTools.runwaySlope')}
                </Link>
              </li>
              <li>
                <Link href={lp('/aviation/runway-number-calculator')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('aviationTools.runwayNumber')}
                </Link>
              </li>
              <li>
                <Link href={lp('/aviation/runway-length-calculator')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('aviationTools.runwayLength')}
                </Link>
              </li>
              <li>
                <Link href={lp('/aviation/runway-visual-range-calculator')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('aviationTools.rvr')}
                </Link>
              </li>
              <li>
                <Link href={lp('/aviation/contaminated-runway-calculator')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('aviationTools.contaminated')}
                </Link>
              </li>
              <li>
                <Link href={lp('/aviation/runway-in-use-calculator')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('aviationTools.runwayInUse')}
                </Link>
              </li>
              <li>
                <Link href={lp('/aviation/runway-wind-calculator')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('aviationTools.runwayWind')}
                </Link>
              </li>
              <li>
                <Link href={lp('/aviation')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors font-semibold text-indigo-400">
                  {t('navigation.allAviation')} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Resources */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              {t('navigation.guides')}
            </h3>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href={lp('/tools')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors font-semibold text-indigo-400">
                  {t('navigation.industryNiches')} →
                </Link>
              </li>
              <li>
                <Link href={lp('/#how-it-works')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('navigation.howItWorks')}
                </Link>
              </li>
              <li>
                <Link href={lp('/#runway-guide')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  Gross vs Net Burn Guide
                </Link>
              </li>
              <li>
                <Link href={lp('/#methodology')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  Calculation Assumptions
                </Link>
              </li>
              <li>
                <Link href={lp('/privacy')} className="inline-block py-1.5 hover:text-indigo-300 transition-colors">
                  {t('common.privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Attribution */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-300 space-y-3">
          <p className="leading-relaxed">
            {t('common.disclaimer')}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <p className="text-slate-300">© {new Date().getFullYear()} RunwayCalculator.dev. {t('common.allRightsReserved')}</p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs">
              <LanguageButton currentLocale={locale || 'en'} variant="footer" />
              <Link href={lp('/privacy')} className="hover:text-white transition-colors text-slate-300 inline-block py-1">
                {t('common.privacyPolicy')}
              </Link>
              <CookiePreferencesButton />
              <span className="flex items-center text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                Browser-only execution
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
