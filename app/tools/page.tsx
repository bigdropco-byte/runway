import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import { ALL_NICHES } from '@/lib/niches';
import { 
  getBreadcrumbSchema, 
  getCollectionPageSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { 
  ArrowRight, 
  Calculator, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  HeartPulse, 
  PieChart, 
  Flame, 
  FileSpreadsheet, 
  Target, 
  DollarSign, 
  Plane 
} from 'lucide-react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Financial Runway Calculators Directory – Core & Niche Tools',
  description: 'Explore the complete directory of free financial runway calculators. Model startup burn rates, hiring impact, Paul Graham default alive status, SAFE dilution, and 10 industry niche models.',
  keywords: [
    'runway calculators directory',
    'startup runway calculator tools',
    'cash runway calculators',
    'burn rate tools',
    'saas runway calculator',
    'small business runway'
  ],
  alternates: {
    canonical: `${SITE_URL}/tools`
  }
};

const CORE_FINANCIAL_TOOLS = [
  {
    name: 'Startup Runway Calculator',
    url: '/tools/startup-runway-calculator',
    description: 'Venture & seed stage cash forecasting with compound growth, hiring burn, and milestone timelines.',
    badge: 'Popular',
    icon: Sparkles
  },
  {
    name: 'Hiring Runway Calculator',
    url: '/tools/hiring-runway-calculator',
    description: 'Model headcount salary additions and benefits overhead (1.15x–1.30x) to see exact runway reduction.',
    badge: 'Headcount',
    icon: Users
  },
  {
    name: 'Default Alive vs. Default Dead Calculator',
    url: '/tools/default-alive-calculator',
    description: 'Paul Graham framework: verify if current revenue growth rate reaches profitability before cash runs out.',
    badge: 'YC Method',
    icon: HeartPulse
  },
  {
    name: 'SAFE & Dilution Runway Calculator',
    url: '/tools/safe-dilution-runway-calculator',
    description: 'Calculate capital needed for 18-month target runway and compute post-money founder equity dilution.',
    badge: 'Fundraising',
    icon: PieChart
  },
  {
    name: 'Cash Runway Calculator',
    url: '/tools/cash-runway-calculator',
    description: 'Calculate usable cash survival months with dedicated emergency reserve buffer sliders (0–50%).',
    badge: 'Liquidity',
    icon: DollarSign
  },
  {
    name: 'Burn Rate & Multiple Calculator',
    url: '/tools/burn-rate-calculator',
    description: 'Measure gross burn, net burn rate, cash depletion velocity %, and SaaS Burn Multiple efficiency.',
    badge: 'Metrics',
    icon: Flame
  },
  {
    name: 'Runway Calculator Excel Template',
    url: '/tools/runway-calculator-excel',
    description: 'Download a pre-built 24-month financial runway projection model spreadsheet with native formulas.',
    badge: 'Download',
    icon: FileSpreadsheet
  },
  {
    name: 'Runway Extension Solver',
    url: '/tools/runway-extension-calculator',
    description: 'Reverse goal solver: input your desired runway months to find exact dollar expense cuts or sales needed.',
    badge: 'Strategy',
    icon: Target
  }
];

const DIRECTORY_FAQS: FaqItem[] = [
  {
    question: 'How do I choose the right runway calculator for my company?',
    answer: 'If you are actively fundraising or venture-backed, start with the Startup Runway or SAFE Dilution Calculator. If you are planning new hires, use the Hiring Runway Calculator. If you want to check your path to self-sustaining profitability without future capital, use the Default Alive Calculator.'
  },
  {
    question: 'Why are there different runway calculators for each industry?',
    answer: 'Different industries have vastly different working capital cycles. A SaaS company has high gross margins and recurring subscriptions, while an e-commerce brand carries heavy physical inventory, and an agency deals with delayed 60-day client invoices. Our industry calculators are pre-configured to reflect these distinct cash flow patterns.'
  },
  {
    question: 'Are all calculators free and private?',
    answer: 'Yes, 100%. Every single calculator operates locally in your browser. No financial numbers, salaries, or bank figures are ever transmitted to any server or stored in any database.'
  }
];

export default function ToolsDirectoryPage() {
  const pageUrl = `${SITE_URL}/tools`;
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Financial Tools Directory', url: pageUrl }
  ]);

  const collectionItems = [
    ...CORE_FINANCIAL_TOOLS.map((t) => ({
      name: t.name,
      url: `${SITE_URL}${t.url}`,
      description: t.description
    })),
    ...ALL_NICHES.map((n) => ({
      name: `${n.name} Runway Calculator`,
      url: `${SITE_URL}/tools/${n.slug}`,
      description: n.intro
    }))
  ];

  const collectionSchema = getCollectionPageSchema(
    'Financial Runway Calculators Directory',
    pageUrl,
    'Comprehensive directory of core financial calculators and industry-specific runway models.',
    collectionItems
  );
  const faqSchema = getFaqPageSchema(DIRECTORY_FAQS);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      <JsonLd data={faqSchema} />
      <Header />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Breadcrumbs items={[{ name: 'Financial Tools Directory', url: '/tools' }]} />

          {/* Header Hero */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Financial Planning &amp; Runway Suite</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Financial Runway Calculators
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Precision tools to calculate cash survival, model hiring additions, verify default alive status, and forecast capital requirements across every stage of business growth.
            </p>
          </div>

          {/* Section 1: Core Financial Tools */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-indigo-600" />
                  Core Financial &amp; Planning Calculators
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  High-precision financial engines for founders, operators, and CFOs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {CORE_FINANCIAL_TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.url}
                    href={tool.url}
                    className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-500 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
                          {tool.badge}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1.5">
                        {tool.name}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600 group-hover:text-indigo-800">
                      <span>Launch Tool</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Section 2: Industry Niche Calculators */}
          <section className="space-y-6 pt-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Runway Calculators by Industry Niche
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pre-configured with industry-specific burn drivers, target runway benchmarks, and worked examples.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ALL_NICHES.map((niche) => (
                <div
                  key={niche.slug}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                        {niche.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Target: {niche.recommendedRunwayMonths}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      <Link
                        href={`/tools/${niche.slug}`}
                        className="hover:text-indigo-600 transition-colors"
                      >
                        {niche.name}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {niche.intro}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 mb-4">
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                        Recommended Runway Target
                      </div>
                      <div className="text-xs font-bold text-indigo-900">
                        {niche.recommendedRunwayMonths}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/tools/${niche.slug}`}
                      className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      <span>Launch {niche.name} Calculator</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Cross-link to Aviation */}
          <div className="p-6 rounded-2xl bg-indigo-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider block flex items-center">
                <Plane className="w-3.5 h-3.5 mr-1" /> Aeronautical Runway Calculations
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Looking for Aviation Runway Calculators?
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Explore our pilot tools: Crosswind Components, Runway Slope, Magnetic Runway Numbering, Density Altitude, RVR, and TALPA Contaminated Runway length.
              </p>
            </div>
            <Link
              href="/aviation"
              className="shrink-0 px-4 py-2.5 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs shadow-sm transition-colors flex items-center space-x-1.5"
            >
              <span>Explore Aviation Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Section 4: Directory FAQs */}
          <FaqAccordion faqs={DIRECTORY_FAQS} title="Financial Tools Directory FAQs" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
