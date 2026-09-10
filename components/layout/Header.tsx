'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X, ArrowUpRight, ShieldCheck, Plane } from 'lucide-react';
import LanguageButton from '@/components/layout/LanguageButton';
import { useTranslation } from '@/i18n/useTranslation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const [aviationDropdownOpen, setAviationDropdownOpen] = useState(false);
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={lp('/')} className="flex items-center space-x-2.5 group">
            <img
              src="/favicon.png"
              alt="Runway Calculator Logo"
              className="w-9 h-9 rounded-xl shadow-xs object-cover group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-tight">
                Runway<span className="text-indigo-600">Calculator</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider hidden sm:block">
                Financial &amp; Aviation Runway Suite
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <Link href={lp('/#calculator')} className="hover:text-indigo-600 transition-colors">
              {t('navigation.calculator')}
            </Link>

            {/* Financial Tools dropdown */}
            <div className="relative" onMouseLeave={() => setBusinessDropdownOpen(false)}>
              <button
                type="button"
                onClick={() => setBusinessDropdownOpen(!businessDropdownOpen)}
                onMouseEnter={() => setBusinessDropdownOpen(true)}
                className="flex items-center space-x-1 hover:text-indigo-600 transition-colors py-2 focus:outline-none cursor-pointer"
                aria-expanded={businessDropdownOpen}
              >
                <span>{t('navigation.financialTools')}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {businessDropdownOpen && (
                <div 
                  className="absolute left-0 mt-1 w-80 rounded-xl bg-white shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => setBusinessDropdownOpen(true)}
                  onMouseLeave={() => setBusinessDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {t('navigation.financialTools')}
                  </div>
                  <div className="space-y-0.5">
                    <Link
                      href={lp('/tools/startup-runway-calculator')}
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="truncate mr-2">{t('financialTools.startupRunway')}</span>
                      <span className="text-[10px] text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded shrink-0">Venture</span>
                    </Link>
                    <Link
                      href={lp('/tools/hiring-runway-calculator')}
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="truncate mr-2">{t('financialTools.hiringRunway')}</span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">New</span>
                    </Link>
                    <Link
                      href={lp('/tools/default-alive-calculator')}
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="truncate mr-2">{t('financialTools.defaultAlive')}</span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">New</span>
                    </Link>
                    <Link
                      href={lp('/tools/safe-dilution-runway-calculator')}
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="truncate mr-2">{t('financialTools.safeDilution')}</span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">New</span>
                    </Link>
                    <Link
                      href={lp('/tools/cash-runway-calculator')}
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="truncate">{t('financialTools.cashRunway')}</span>
                    </Link>
                    <Link
                      href={lp('/tools/burn-rate-calculator')}
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="truncate">{t('financialTools.burnRate')}</span>
                    </Link>
                    <Link
                      href={lp('/tools/runway-calculator-excel')}
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="truncate">{t('financialTools.excelTemplate')}</span>
                    </Link>
                    <Link
                      href={lp('/tools/runway-extension-calculator')}
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="truncate">{t('financialTools.extensionSolver')}</span>
                    </Link>
                  </div>
                  <div className="mt-1.5 pt-1.5 border-t border-slate-100">
                    <Link
                      href={lp('/tools')}
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      <span>{t('navigation.allTools')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Aviation Tools dropdown */}
            <div className="relative" onMouseLeave={() => setAviationDropdownOpen(false)}>
              <button
                type="button"
                onClick={() => setAviationDropdownOpen(!aviationDropdownOpen)}
                onMouseEnter={() => setAviationDropdownOpen(true)}
                className="flex items-center space-x-1 hover:text-indigo-600 transition-colors py-2 focus:outline-none cursor-pointer"
                aria-expanded={aviationDropdownOpen}
              >
                <Plane className="w-3.5 h-3.5 mr-0.5 text-slate-500" />
                <span>{t('navigation.aviationTools')}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {aviationDropdownOpen && (
                <div 
                  className="absolute left-0 mt-1 w-72 rounded-xl bg-white shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => setAviationDropdownOpen(true)}
                  onMouseLeave={() => setAviationDropdownOpen(false)}
                >
                  <div className="px-3 py-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {t('navigation.aviationTools')}
                  </div>
                  <div className="space-y-0.5">
                    <Link
                      href={lp('/aviation/crosswind-calculator')}
                      onClick={() => setAviationDropdownOpen(false)}
                      className="flex items-center px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="truncate">{t('aviationTools.crosswind')}</span>
                    </Link>
                    <Link
                      href={lp('/aviation/runway-slope-calculator')}
                      onClick={() => setAviationDropdownOpen(false)}
                      className="flex items-center px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="truncate">{t('aviationTools.runwaySlope')}</span>
                    </Link>
                    <Link
                      href={lp('/aviation/runway-number-calculator')}
                      onClick={() => setAviationDropdownOpen(false)}
                      className="flex items-center px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="truncate">{t('aviationTools.runwayNumber')}</span>
                    </Link>
                    <Link
                      href={lp('/aviation/runway-length-calculator')}
                      onClick={() => setAviationDropdownOpen(false)}
                      className="flex items-center px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="truncate">{t('aviationTools.runwayLength')}</span>
                    </Link>
                    <Link
                      href={lp('/aviation/runway-visual-range-calculator')}
                      onClick={() => setAviationDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="truncate mr-2">{t('aviationTools.rvr')}</span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">New</span>
                    </Link>
                    <Link
                      href={lp('/aviation/contaminated-runway-calculator')}
                      onClick={() => setAviationDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="truncate mr-2">{t('aviationTools.contaminated')}</span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">New</span>
                    </Link>
                    <Link
                      href={lp('/aviation/runway-in-use-calculator')}
                      onClick={() => setAviationDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="truncate mr-2">{t('aviationTools.runwayInUse')}</span>
                      <span className="text-[10px] text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded shrink-0">ATC</span>
                    </Link>
                    <Link
                      href={lp('/aviation/runway-wind-calculator')}
                      onClick={() => setAviationDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span className="truncate">{t('aviationTools.runwayWind')}</span>
                    </Link>
                  </div>
                  <div className="mt-1 pt-2 border-t border-slate-100">
                    <Link
                      href={lp('/aviation')}
                      onClick={() => setAviationDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      <span>{t('navigation.allAviation')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href={lp('/#how-it-works')} className="hover:text-indigo-600 transition-colors">
              {t('navigation.howItWorks')}
            </Link>
          </nav>

          {/* Privacy badge, Language & Primary CTA */}
          <div className="hidden lg:flex items-center space-x-3 rtl:space-x-reverse">
            <div className="flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0 text-emerald-600" />
              <span>100% Client-Side Privacy</span>
            </div>
            <LanguageButton currentLocale={locale || 'en'} />
            <Link
              href={lp('/#calculator')}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {t('common.calculate')}
            </Link>
          </div>

          {/* Mobile menu button and language switch */}
          <div className="md:hidden flex items-center space-x-2 rtl:space-x-reverse">
            <LanguageButton currentLocale={locale || 'en'} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 text-sm max-h-[85vh] overflow-y-auto">
          <Link
            href={lp('/#calculator')}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-md font-medium text-slate-700 hover:bg-slate-50"
          >
            {t('navigation.calculator')}
          </Link>
          <div className="pt-2 border-t border-slate-100">
            <span className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              {t('navigation.financialTools')}
            </span>
            <Link
              href={lp('/tools/startup-runway-calculator')}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              {t('financialTools.startupRunway')}
            </Link>
            <Link
              href={lp('/tools/hiring-runway-calculator')}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              {t('financialTools.hiringRunway')}
            </Link>
            <Link
              href={lp('/tools/default-alive-calculator')}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              {t('financialTools.defaultAlive')}
            </Link>
            <Link
              href={lp('/tools/safe-dilution-runway-calculator')}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              {t('financialTools.safeDilution')}
            </Link>
            <Link
              href={lp('/tools/cash-runway-calculator')}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              {t('financialTools.cashRunway')}
            </Link>
            <Link
              href={lp('/tools/burn-rate-calculator')}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              {t('financialTools.burnRate')}
            </Link>
            <Link
              href={lp('/tools/runway-calculator-excel')}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              {t('financialTools.excelTemplate')}
            </Link>
            <Link
              href={lp('/tools/runway-extension-calculator')}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              {t('financialTools.extensionSolver')}
            </Link>
          </div>
          <div className="pt-2 border-t border-slate-100">
            <span className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              {t('navigation.aviationTools')}
            </span>
            <Link
              href={lp('/aviation/crosswind-calculator')}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              {t('aviationTools.crosswind')}
            </Link>
            <Link
              href={lp('/aviation/runway-slope-calculator')}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              {t('aviationTools.runwaySlope')}
            </Link>
            <Link
              href={lp('/aviation/runway-number-calculator')}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              {t('aviationTools.runwayNumber')}
            </Link>
            <Link
              href={lp('/aviation/runway-length-calculator')}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              {t('aviationTools.runwayLength')}
            </Link>
            <Link
              href={lp('/aviation/runway-visual-range-calculator')}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              {t('aviationTools.rvr')}
            </Link>
            <Link
              href={lp('/aviation/contaminated-runway-calculator')}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              {t('aviationTools.contaminated')}
            </Link>
            <Link
              href={lp('/aviation/runway-in-use-calculator')}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              {t('aviationTools.runwayInUse')}
            </Link>
            <Link
              href={lp('/aviation/runway-wind-calculator')}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              {t('aviationTools.runwayWind')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
