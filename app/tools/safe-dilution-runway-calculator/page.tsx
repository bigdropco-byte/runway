import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import SafeRunwayCalculator from '@/components/calculator/SafeRunwayCalculator';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import RelatedTools from '@/components/layout/RelatedTools';
import { 
  getWebApplicationSchema, 
  getBreadcrumbSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { PieChart, Sparkles } from 'lucide-react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'SAFE & Dilution Runway Calculator – Post-Money Valuation',
  description: 'Calculate how much capital to raise on a SAFE note to reach your runway target, and calculate founder equity dilution based on post-money valuation caps.',
  keywords: [
    'safe runway calculator',
    'safe note dilution calculator',
    'post-money safe calculator',
    'how much safe to raise for 18 months runway',
    'startup dilution calculator'
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/safe-dilution-runway-calculator`
  }
};

const FAQS: FaqItem[] = [
  {
    question: 'How is founder equity dilution calculated on a Post-Money SAFE?',
    answer: 'Under the standard Y Combinator Post-Money SAFE, founder dilution is calculated directly as: Dilution (%) = Investment Amount ÷ Post-Money Valuation Cap. For example, raising $500,000 on a $5,000,000 post-money valuation cap dilutes existing shareholders by exactly 10.0%.'
  },
  {
    question: 'How much capital should I raise on a SAFE note?',
    answer: 'Founders should calculate their net monthly burn rate multiplied by their desired runway in months (typically 18 to 24 months), plus an additional 15% to 20% contingency buffer to ensure they reach their key business milestones without running out of capital prematurely.'
  },
  {
    question: 'What is the difference between Pre-Money and Post-Money SAFEs?',
    answer: 'A Pre-Money SAFE calculates investor ownership after adding all other SAFEs and option pool expansions at the priced round, making exact dilution unpredictable. A Post-Money SAFE fixes the exact percentage of ownership the investor purchases upon signing, giving founders complete ownership transparency.'
  }
];

export default function SafeRunwayPage() {
  const pageUrl = `${SITE_URL}/tools/safe-dilution-runway-calculator`;
  const webAppSchema = getWebApplicationSchema(pageUrl, 'SAFE Note & Dilution Runway Calculator');
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Tools Directory', url: `${SITE_URL}/tools` },
    { name: 'SAFE Runway Calculator', url: pageUrl }
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
              { name: 'SAFE & Dilution Runway Calculator', url: pageUrl }
            ]}
          />

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <PieChart className="w-3.5 h-3.5" />
              <span>Equity Dilution &amp; Capital Sizing Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              SAFE Note &amp; Dilution Runway Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Determine exactly how much capital to raise on a Post-Money SAFE to achieve your 18 or 24-month runway goal, and model founder equity dilution.
            </p>
          </div>

          <SafeRunwayCalculator />

          <RelatedTools currentUrl="/tools/safe-dilution-runway-calculator" category="financial" />

          <FaqAccordion faqs={FAQS} title="SAFE Note & Dilution Frequently Asked Questions" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
