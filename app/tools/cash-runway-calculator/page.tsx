import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CashRunwayCalculator from '@/components/calculator/CashRunwayCalculator';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import RelatedTools from '@/components/layout/RelatedTools';
import { 
  getWebApplicationSchema, 
  getBreadcrumbSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { ShieldCheck, DollarSign, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cash Runway Calculator – Calculate Cash Reserves & Burn',
  description: 'Free cash runway calculator. Calculate how many months your liquid cash reserves will last with emergency buffers, monthly outflows, and incoming receipts.',
  keywords: [
    'cash runway calculator',
    'cash runway',
    'calculate cash runway',
    'liquid cash reserve calculator',
    'business cash runway'
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/cash-runway-calculator`
  }
};

const FAQS: FaqItem[] = [
  {
    question: 'What is cash runway?',
    answer: 'Cash runway is the amount of time in months that a business can continue paying its operational expenses before running out of money, calculated by dividing available liquid cash balance by the net monthly cash burn.'
  },
  {
    question: 'How should I treat emergency reserve buffers in my cash runway?',
    answer: 'Financial advisors recommend segregating 15% to 25% of your total cash balance as a protected emergency reserve. Your "usable runway" should only be calculated against the unreserved operating capital to prevent sudden liquidity insolvency.'
  },
  {
    question: 'How does cash runway differ from accounting profit?',
    answer: 'Profit is an accrual concept that recognizes revenue upon delivery regardless of when cash is collected. Cash runway tracks strictly cleared bank deposits and real cash outflows. A profitable company on paper can still run out of cash due to delayed customer receivables.'
  }
];

export default function CashRunwayPage() {
  const pageUrl = `${SITE_URL}/tools/cash-runway-calculator`;
  const webAppSchema = getWebApplicationSchema(pageUrl, 'Cash Runway Calculator');
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Tools Directory', url: `${SITE_URL}/tools` },
    { name: 'Cash Runway Calculator', url: pageUrl }
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
              { name: 'Cash Runway Calculator', url: pageUrl }
            ]}
          />

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-xs font-semibold text-emerald-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Liquidity &amp; Emergency Buffer Forecaster</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Cash Runway Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Calculate how many months your liquid cash reserves will support your company. Factor in emergency buffers and model zero-revenue survival windows.
            </p>
          </div>

          <CashRunwayCalculator />

          <RelatedTools currentUrl="/tools/cash-runway-calculator" category="financial" />

          <FaqAccordion faqs={FAQS} title="Cash Runway Frequently Asked Questions" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
