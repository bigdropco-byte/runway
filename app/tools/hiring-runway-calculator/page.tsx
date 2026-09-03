import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import HiringRunwayCalculator from '@/components/calculator/HiringRunwayCalculator';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import RelatedTools from '@/components/layout/RelatedTools';
import { 
  getWebApplicationSchema, 
  getBreadcrumbSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { Users, Sparkles } from 'lucide-react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Hiring Runway Calculator – Headcount Burn & Salary Impact',
  description: 'Calculate how new hires and engineering headcount impact your startup runway. Model fully loaded salaries, payroll taxes, and runway reduction in months.',
  keywords: [
    'hiring runway calculator',
    'headcount runway calculator',
    'how many people can I hire startup runway',
    'hiring impact on runway',
    'payroll burn rate'
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/hiring-runway-calculator`
  }
};

const FAQS: FaqItem[] = [
  {
    question: 'How do you calculate fully loaded employee cost?',
    answer: 'A fully loaded employee cost includes base annual salary plus employer payroll taxes (FICA, FUTA, SUTA), healthcare benefits, 401(k) matching, workers comp, software licenses, and equipment. Typically, founders multiply base salary by 1.20x to 1.25x (20% to 25% overhead) to determine true monthly payroll burn.'
  },
  {
    question: 'How many new engineers can I hire with 18 months of runway?',
    answer: 'Enter your current cash and existing operating expenses into our calculator. As you add engineering roles with their base salaries, the calculator will show your new monthly net burn and exact remaining runway in real time.'
  },
  {
    question: 'When should a startup freeze hiring to protect runway?',
    answer: 'Startups should review or freeze non-essential hiring when cash runway dips below 9 to 12 months, unless the roles are directly generating revenue (such as quota-carrying account executives with validated payback periods).'
  }
];

export default function HiringRunwayPage() {
  const pageUrl = `${SITE_URL}/tools/hiring-runway-calculator`;
  const webAppSchema = getWebApplicationSchema(pageUrl, 'Hiring Runway Calculator');
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Tools Directory', url: `${SITE_URL}/tools` },
    { name: 'Hiring Runway Calculator', url: pageUrl }
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
              { name: 'Hiring Runway Calculator', url: pageUrl }
            ]}
          />

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <Users className="w-3.5 h-3.5" />
              <span>Headcount Planning &amp; Payroll Burn</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Hiring Runway Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Model how planned engineering, sales, and operational hires alter your monthly burn rate and runway depletion timeline before making job offers.
            </p>
          </div>

          <HiringRunwayCalculator />

          <RelatedTools currentUrl="/tools/hiring-runway-calculator" category="financial" />

          <FaqAccordion faqs={FAQS} title="Hiring & Headcount Runway FAQs" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
