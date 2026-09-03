import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import RvrCalculator from '@/components/aviation/RvrCalculator';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import RelatedTools from '@/components/layout/RelatedTools';
import { 
  getWebApplicationSchema, 
  getBreadcrumbSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { Eye, Sparkles } from 'lucide-react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Runway Visual Range Calculator – RVR to Visibility Converter',
  description: 'Free Runway Visual Range (RVR) calculator. Convert RVR in feet or meters to statute miles and check CAT I, CAT II, and CAT III precision approach minimums.',
  keywords: [
    'runway visual range calculator',
    'rvr to visibility calculator',
    'rvr converter',
    'runway visual range aviation',
    'cat 1 rvr minimums'
  ],
  alternates: {
    canonical: `${SITE_URL}/aviation/runway-visual-range-calculator`
  }
};

const FAQS: FaqItem[] = [
  {
    question: 'What is Runway Visual Range (RVR)?',
    answer: 'Runway Visual Range (RVR) is an instrumentally derived measurement of the horizontal distance over which a pilot on the runway centerline can see the runway surface markings, runway edge lights, or centerline lights.'
  },
  {
    question: 'What is RVR 2400 in statute miles?',
    answer: 'According to FAA AIM Table 7-1-10, an RVR of 2,400 feet corresponds to 1/2 statute mile (SM) visibility, which is the standard minimum for Category I precision ILS instrument approaches.'
  },
  {
    question: 'What is the difference between RVR and prevailing visibility?',
    answer: 'Prevailing visibility is a human or automated observation representing the greatest horizontal visibility across at least half the horizon. RVR is measured specifically along the landing runway corridor and takes regulatory precedence over prevailing visibility for instrument approaches.'
  }
];

export default function RvrCalculatorPage() {
  const pageUrl = `${SITE_URL}/aviation/runway-visual-range-calculator`;
  const webAppSchema = getWebApplicationSchema(pageUrl, 'Runway Visual Range (RVR) Calculator');
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Aviation Tools', url: `${SITE_URL}/aviation` },
    { name: 'RVR to Visibility Calculator', url: pageUrl }
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
              { name: 'RVR to Visibility Calculator', url: pageUrl }
            ]}
          />

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <Eye className="w-3.5 h-3.5" />
              <span>FAA AIM Table 7-1-10 Instrument Minimums</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Runway Visual Range (RVR) Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Convert reported Runway Visual Range (RVR) in feet and meters to statute miles. Check precision approach authorization across Category I, II, and III ILS minimums.
            </p>
          </div>

          <RvrCalculator />

          <RelatedTools currentUrl="/aviation/runway-visual-range-calculator" category="aviation" />

          <FaqAccordion faqs={FAQS} title="Runway Visual Range (RVR) FAQs" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
