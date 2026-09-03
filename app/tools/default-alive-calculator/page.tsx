import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import DefaultAliveCalculator from '@/components/calculator/DefaultAliveCalculator';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import RelatedTools from '@/components/layout/RelatedTools';
import { 
  getWebApplicationSchema, 
  getBreadcrumbSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { HeartPulse, Sparkles } from 'lucide-react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Default Alive vs Default Dead Calculator – Paul Graham Model',
  description: 'Free Default Alive vs Default Dead calculator. Implements Paul Graham’s startup viability formula to calculate if your revenue growth reaches profitability before cash depletion.',
  keywords: [
    'default alive calculator',
    'am I default alive',
    'paul graham default alive',
    'default alive vs default dead',
    'startup profitability crossover'
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/default-alive-calculator`
  }
};

const FAQS: FaqItem[] = [
  {
    question: 'What does "Default Alive" mean for a startup?',
    answer: 'Coined by Y Combinator founder Paul Graham, a startup is "Default Alive" if, assuming their current revenue growth rate and expenses remain constant, their existing cash balance is sufficient to reach profitability before running out of money. If not, they are "Default Dead".'
  },
  {
    question: 'What should founders do if they are Default Dead?',
    answer: 'If you are Default Dead, you must not assume venture capital will save you. You must take immediate operational action: accelerate revenue growth, reduce expenses, or increase pricing to alter your trajectory before your cash runway drops below 6 months.'
  },
  {
    question: 'What is the "cash trough" in a Default Alive calculation?',
    answer: 'The cash trough is the lowest dollar balance your bank account will drop to right before compounded monthly revenue matches and exceeds your monthly expenses.'
  }
];

export default function DefaultAlivePage() {
  const pageUrl = `${SITE_URL}/tools/default-alive-calculator`;
  const webAppSchema = getWebApplicationSchema(pageUrl, 'Default Alive vs Default Dead Calculator');
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Tools Directory', url: `${SITE_URL}/tools` },
    { name: 'Default Alive Calculator', url: pageUrl }
  ]);
  const faqSchema = getFaqPageSchema(FAQS);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900">
      <JsonLd data={webAppSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <Header />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <Breadcrumbs
            items={[
              { name: 'Tools Directory', url: '/tools' },
              { name: 'Default Alive Calculator', url: pageUrl }
            ]}
          />

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-xs font-semibold text-emerald-700">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Y Combinator Viability Algorithm</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Default Alive vs. Default Dead Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Implement Paul Graham’s famous startup survival test. Calculate whether your current month-over-month revenue growth will reach break-even before your bank account reaches zero.
            </p>
          </div>

          <DefaultAliveCalculator />

          <RelatedTools currentUrl="/tools/default-alive-calculator" category="financial" />

          <FaqAccordion faqs={FAQS} title="Default Alive Frequently Asked Questions" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
