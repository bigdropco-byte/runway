import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RunwayCalculator from '@/components/calculator/RunwayCalculator';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import GuideContent from '@/components/content/GuideContent';
import JsonLd from '@/components/seo/JsonLd';
import { 
  getLocalizedMetadata, 
  getWebApplicationSchema, 
  getWebSiteSchema,
  getOrganizationSchema,
  getHowToSchema,
  getFaqPageSchema,
  getImageObjectSchema,
  SITE_URL 
} from '@/lib/seo';
import { getTranslations } from '@/i18n/getTranslations';
import { NON_DEFAULT_LOCALES } from '@/i18n/config';
import { ALL_NICHES } from '@/lib/niches';
import Link from 'next/link';
import { ShieldCheck, Zap, Sparkles, TrendingUp, CheckCircle2, ArrowRight, Plane, DollarSign, FileSpreadsheet, Flame, Users, HeartPulse, PieChart } from 'lucide-react';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((l) => ({ locale: l.code }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);

  return getLocalizedMetadata({
    locale,
    subpath: '',
    title: t('seo.defaultTitle'),
    description: t('seo.defaultDescription'),
    keywords: [
      'runway calculator',
      'startup runway calculator',
      'cash runway calculator',
      'business runway calculator',
      'burn rate calculator',
      'runway crosswind calculator',
      'runway in use calculator'
    ]
  });
}

export default async function LocalizedHomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);

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

  const HOMEPAGE_FAQS: FaqItem[] = [
    {
      question: t('faqs.q1'),
      answer: t('faqs.a1')
    },
    {
      question: t('faqs.q2'),
      answer: t('faqs.a2')
    },
    {
      question: t('faqs.q3'),
      answer: t('faqs.a3')
    },
    {
      question: t('faqs.q4'),
      answer: t('faqs.a4')
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Schema.org JSON-LD Structured Data */}
      <JsonLd data={getWebSiteSchema()} />
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd 
        data={getWebApplicationSchema({
          name: t('calculator.title') || 'Runway Calculator – Startup Cash Runway & Burn Rate Calculator',
          url: locale === 'en' ? `${SITE_URL}/` : `${SITE_URL}/${locale}/`,
          description: t('calculator.subtitle') || 'Accurately forecast how many months of cash your business has left. Interactive scenario planning and real-time projections.',
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'All (Web Browser)',
          features: [
            'Real-time cash runway forecasting',
            'Gross burn vs net burn analysis',
            'Interactive scenario planning',
            'Depletion date projection',
            '100% private client-side processing'
          ]
        })} 
      />
      <JsonLd data={getHowToSchema()} />
      <JsonLd data={getFaqPageSchema(HOMEPAGE_FAQS)} />
      <JsonLd
        data={getImageObjectSchema({
          url: `${SITE_URL}/images/how-runway-calculator-works-step-by-step-guide.jpg`,
          name: 'How Runway Calculator Works - Step-by-Step Financial Infographic',
          description: 'Step-by-step visual diagram illustrating how startup cash runway, net monthly burn, and break-even trajectories are calculated.',
          width: 1024,
          height: 682
        })}
      />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-10 pb-8 sm:pt-14 sm:pb-12 bg-linear-to-b from-white via-indigo-50/20 to-slate-50 border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t('common.tagline')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
              {t('calculator.title')}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t('calculator.subtitle')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-medium text-slate-500">
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1.5" />
                {t('common.inBrowser')}
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1.5" />
                {t('common.growthModel')}
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1.5" />
                {t('common.noSignUp')}
              </span>
            </div>
          </div>
        </section>

        {/* Main Interactive Calculator */}
        <section id="calculator" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-16 relative z-10">
          <RunwayCalculator />
        </section>

        {/* How It Works Infographic & 6-Step Workflow */}
        <section id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200/80 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>{t('howItWorks.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t('howItWorks.title')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              {t('howItWorks.description')}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 overflow-hidden">
            <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-inner border border-slate-100">
              <img
                src="/images/how-runway-calculator-works-step-by-step-guide.jpg"
                alt="How Runway Calculator Works - Step-by-Step Financial Infographic showing cash balance, monthly gross expenses, net burn calculation, and cash depletion projection"
                width={1024}
                height={682}
                className="w-full h-auto object-cover rounded-xl"
                loading="lazy"
              />
            </div>
          </div>

          {/* 6 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: '1', title: t('howItWorks.step1Title'), desc: t('howItWorks.step1Desc') },
              { num: '2', title: t('howItWorks.step2Title'), desc: t('howItWorks.step2Desc') },
              { num: '3', title: t('howItWorks.step3Title'), desc: t('howItWorks.step3Desc') },
              { num: '4', title: t('howItWorks.step4Title'), desc: t('howItWorks.step4Desc') },
              { num: '5', title: t('howItWorks.step5Title'), desc: t('howItWorks.step5Desc') },
              { num: '6', title: t('howItWorks.step6Title'), desc: t('howItWorks.step6Desc') },
            ].map((step) => (
              <div key={step.num} className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                    {step.num}
                  </span>
                  <h3>{step.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Specialized Financial Calculators Grid */}
        <section className="bg-white py-14 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                {t('financialTools.badge')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {t('financialTools.title')}
              </h2>
              <p className="text-sm text-slate-600">
                {t('financialTools.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: t('financialTools.startupRunway'), desc: t('financialTools.startupRunwayDesc'), href: lp('/tools/startup-runway-calculator'), icon: TrendingUp },
                { title: t('financialTools.cashRunway'), desc: t('financialTools.cashRunwayDesc'), href: lp('/tools/cash-runway-calculator'), icon: DollarSign },
                { title: t('financialTools.burnRate'), desc: t('financialTools.burnRateDesc'), href: lp('/tools/burn-rate-calculator'), icon: Flame },
                { title: t('financialTools.hiringRunway'), desc: t('financialTools.hiringRunwayDesc'), href: lp('/tools/hiring-runway-calculator'), icon: Users },
                { title: t('financialTools.defaultAlive'), desc: t('financialTools.defaultAliveDesc'), href: lp('/tools/default-alive-calculator'), icon: HeartPulse },
                { title: t('financialTools.safeDilution'), desc: t('financialTools.safeDilutionDesc'), href: lp('/tools/safe-dilution-runway-calculator'), icon: PieChart },
                { title: t('financialTools.excelTemplate'), desc: t('financialTools.excelTemplateDesc'), href: lp('/tools/runway-calculator-excel'), icon: FileSpreadsheet },
                { title: t('financialTools.extensionSolver'), desc: t('financialTools.extensionSolverDesc'), href: lp('/tools/runway-extension-calculator'), icon: Zap },
              ].map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.title}
                    href={tool.href}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 hover:shadow-sm transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100/80 text-indigo-700 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {tool.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-indigo-700">
                      <span>{t('common.launchTool')}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Aviation Calculators Grid */}
        <section className="bg-slate-50 py-14 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                {t('aviationTools.badge')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {t('aviationTools.title')}
              </h2>
              <p className="text-sm text-slate-600">
                {t('aviationTools.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: t('aviationTools.crosswind'), desc: t('aviationTools.crosswindDesc'), href: lp('/aviation/crosswind-calculator') },
                { title: t('aviationTools.runwayInUse'), desc: t('aviationTools.runwayInUseDesc'), href: lp('/aviation/runway-in-use-calculator') },
                { title: t('aviationTools.runwayLength'), desc: t('aviationTools.runwayLengthDesc'), href: lp('/aviation/runway-length-calculator') },
                { title: t('aviationTools.runwayNumber'), desc: t('aviationTools.runwayNumberDesc'), href: lp('/aviation/runway-number-calculator') },
                { title: t('aviationTools.runwaySlope'), desc: t('aviationTools.runwaySlopeDesc'), href: lp('/aviation/runway-slope-calculator') },
                { title: t('aviationTools.runwayWind'), desc: t('aviationTools.runwayWindDesc'), href: lp('/aviation/runway-wind-calculator') },
                { title: t('aviationTools.rvr'), desc: t('aviationTools.rvrDesc'), href: lp('/aviation/runway-visual-range-calculator') },
                { title: t('aviationTools.contaminated'), desc: t('aviationTools.contaminatedDesc'), href: lp('/aviation/contaminated-runway-calculator') },
              ].map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="p-5 rounded-xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-sm transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-sky-100/80 text-sky-700 flex items-center justify-center">
                      <Plane className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700">
                    <span>{t('common.launchTool')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Educational Guide & Internal Linking */}
        <section id="runway-guide" className="py-14 border-t border-slate-200/80 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <GuideContent locale={locale} />
          </div>
        </section>

        {/* FAQs */}
        <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-slate-200/80 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">{t('faqs.title')}</h2>
            <p className="text-xs sm:text-sm text-slate-500">{t('faqs.description')}</p>
          </div>
          <FaqAccordion faqs={HOMEPAGE_FAQS} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
