import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import RunwayCalculator from '@/components/calculator/RunwayCalculator';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import RelatedTools from '@/components/layout/RelatedTools';
import { 
  getWebApplicationSchema, 
  getBreadcrumbSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { Sparkles, Rocket } from 'lucide-react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Startup Runway Calculator – Venture Burn & Survival Time',
  description: 'Free startup runway calculator. Calculate cash runway in months, forecast depletion dates, model VC funding timing, and manage hiring burn.',
  keywords: [
    'startup runway calculator',
    'runway calculator startup',
    'venture runway calculator',
    'startup burn rate calculator',
    'seed stage runway'
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/startup-runway-calculator`
  }
};

const FAQS: FaqItem[] = [
  {
    question: 'How many months of runway should an early-stage startup have?',
    answer: 'VC-backed startups should ideally target 18 to 24 months of runway following a funding round. This gives founders 12 to 18 months to reach critical traction milestones (e.g. $1M ARR or proof of PMF) plus a mandatory 6-month window to pitch and close their next round.'
  },
  {
    question: 'When should a startup founder start their next fundraise?',
    answer: 'You should initiate institutional fundraising when you have 6 to 9 months of runway remaining. Running out of cash destroys your negotiating leverage with venture investors.'
  },
  {
    question: 'What is the standard startup runway formula?',
    answer: 'Runway = Current Bank Cash Balance ÷ Net Monthly Burn Rate. Net monthly burn equals total monthly cash expenses minus monthly recurring customer collections.'
  }
];

export default function StartupRunwayPage() {
  const pageUrl = `${SITE_URL}/tools/startup-runway-calculator`;
  const webAppSchema = getWebApplicationSchema(pageUrl, 'Startup Runway Calculator');
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Tools Directory', url: `${SITE_URL}/tools` },
    { name: 'Startup Runway Calculator', url: pageUrl }
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
              { name: 'Startup Runway Calculator', url: pageUrl }
            ]}
          />

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <Rocket className="w-3.5 h-3.5" />
              <span>Venture &amp; Seed Stage Financial Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Startup Runway Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Calculate how many months your venture money will last. Model compound revenue growth, employee payroll burn, and one-time upcoming capital expenses.
            </p>
          </div>

          <RunwayCalculator
            initialInputs={{
              cashBalance: 600_000,
              monthlyRevenue: 18_000,
              monthlyExpenses: 55_000,
              revenueGrowthRate: 8,
              expenseGrowthRate: 2
            }}
          />

          <RelatedTools currentUrl="/tools/startup-runway-calculator" category="financial" />

          <FaqAccordion faqs={FAQS} title="Startup Runway Frequently Asked Questions" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
