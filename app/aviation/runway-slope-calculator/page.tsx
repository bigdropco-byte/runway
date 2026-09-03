import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import RunwaySlopeCalculator from '@/components/aviation/RunwaySlopeCalculator';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import RelatedTools from '@/components/layout/RelatedTools';
import { 
  getWebApplicationSchema, 
  getBreadcrumbSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { Mountain, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Runway Slope Calculator – Gradient & Elevation Difference',
  description: 'Free runway slope calculator. Calculate runway gradient percentage, threshold elevation changes, and performance adjustments for takeoff and landing rollout.',
  keywords: [
    'runway slope calculator',
    'runway gradient calculator',
    'runway elevation difference',
    'ICAO runway slope limit',
    'takeoff slope adjustment'
  ],
  alternates: {
    canonical: `${SITE_URL}/aviation/runway-slope-calculator`
  }
};

const FAQS: FaqItem[] = [
  {
    question: 'How do you calculate runway slope percentage?',
    answer: 'Runway Slope (%) = (Absolute Elevation Difference between Thresholds ÷ Runway Physical Length) × 100. For example, a 6,000 ft runway with a 60 ft elevation change has a slope of (60 ÷ 6,000) × 100 = 1.0%.'
  },
  {
    question: 'How does runway slope affect takeoff ground roll?',
    answer: 'As a standard aviation rule of thumb, each 1% of uphill runway slope increases required takeoff ground roll distance by approximately 7% to 10% for light piston aircraft, due to gravity resisting acceleration.'
  },
  {
    question: 'What is the maximum allowable runway slope under ICAO regulations?',
    answer: 'ICAO Annex 14 specifies that the maximum longitudinal runway slope should not exceed 1.0% to 1.25% for primary commercial instrument runways (Code 3 and 4), and must never exceed 2.0% for any civil aerodrome runway.'
  }
];

export default function RunwaySlopePage() {
  const pageUrl = `${SITE_URL}/aviation/runway-slope-calculator`;
  const webAppSchema = getWebApplicationSchema(pageUrl, 'Runway Slope Calculator');
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Aviation Tools', url: `${SITE_URL}/aviation` },
    { name: 'Runway Slope Calculator', url: pageUrl }
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
              { name: 'Aviation Tools', url: '/aviation' },
              { name: 'Runway Slope Calculator', url: pageUrl }
            ]}
          />

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <Mountain className="w-3.5 h-3.5" />
              <span>ICAO Aerodrome Gradient Analysis</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Runway Slope Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Calculate longitudinal runway gradient percentages, evaluate elevation changes between thresholds, and check ICAO 2.0% maximum compliance.
            </p>
          </div>

          <RunwaySlopeCalculator />

          <RelatedTools currentUrl="/aviation/runway-slope-calculator" category="aviation" />

          <FaqAccordion faqs={FAQS} title="Runway Slope Frequently Asked Questions" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
