import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import BurnRateCalculator from '@/components/calculator/BurnRateCalculator';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import RelatedTools from '@/components/layout/RelatedTools';
import { 
  getWebApplicationSchema, 
  getBreadcrumbSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { Flame, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Burn Rate Calculator – Gross Burn, Net Burn & Multiple',
  description: 'Free burn rate calculator. Calculate your monthly gross burn, net burn rate, cash depletion velocity, and SaaS Burn Multiple efficiency.',
  keywords: [
    'burn rate calculator',
    'startup burn rate calculator',
    'gross burn rate',
    'net burn rate',
    'burn multiple calculator'
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/burn-rate-calculator`
  }
};

const FAQS: FaqItem[] = [
  {
    question: 'What is Gross Burn vs. Net Burn?',
    answer: 'Gross Burn is the total absolute amount of cash spent by the business each month (payroll, rent, vendors). Net Burn is Gross Burn minus total monthly cash revenue. If you spend $50,000 and earn $20,000, your Gross Burn is $50,000 and Net Burn is $30,000.'
  },
  {
    question: 'What is a SaaS Burn Multiple and why does it matter?',
    answer: 'Burn Multiple is Net Burn divided by Net New ARR. It measures how much capital your company burns to generate each dollar of annual recurring revenue. A Burn Multiple under 1.0x is considered excellent, 1.0x to 1.5x is good, while above 2.0x indicates poor capital efficiency.'
  },
  {
    question: 'How do you calculate monthly burn percentage?',
    answer: 'Monthly burn percentage is calculated by dividing your monthly net burn by your starting cash balance. For example, burning $20,000 per month with $200,000 cash in bank represents a 10% monthly burn rate.'
  }
];

export default function BurnRatePage() {
  const pageUrl = `${SITE_URL}/tools/burn-rate-calculator`;
  const webAppSchema = getWebApplicationSchema(pageUrl, 'Burn Rate Calculator');
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Tools Directory', url: `${SITE_URL}/tools` },
    { name: 'Burn Rate Calculator', url: pageUrl }
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
              { name: 'Burn Rate Calculator', url: pageUrl }
            ]}
          />

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-xs font-semibold text-rose-700">
              <Flame className="w-3.5 h-3.5" />
              <span>Capital Velocity &amp; Efficiency Metric</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Burn Rate Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Measure your monthly cash burn velocity. Compare gross burn against net burn, calculate annualized loss rates, and benchmark your venture Burn Multiple.
            </p>
          </div>

          <BurnRateCalculator />

          <RelatedTools currentUrl="/tools/burn-rate-calculator" category="financial" />

          <FaqAccordion faqs={FAQS} title="Burn Rate Frequently Asked Questions" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
