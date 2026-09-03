import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import RunwayInUseCalculator from '@/components/aviation/RunwayInUseCalculator';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import RelatedTools from '@/components/layout/RelatedTools';
import { 
  getWebApplicationSchema, 
  getBreadcrumbSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { Plane, Compass, Wind, Sparkles } from 'lucide-react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Runway in Use Calculator – Active Runway Selector by Wind',
  description: 'Free runway in use calculator. Determine which runway is active at any airport based on reported wind direction, wind speed, headwind, and crosswind limits.',
  keywords: [
    'runway in use calculator',
    'active runway calculator',
    'preferred runway calculator',
    'which runway is in use',
    'runway wind selector'
  ],
  alternates: {
    canonical: `${SITE_URL}/aviation/runway-in-use-calculator`
  }
};

const FAQS: FaqItem[] = [
  {
    question: 'How is the "Runway in Use" determined at airports?',
    answer: 'Air traffic control (ATC) designates the "Runway in Use" primarily based on surface wind direction and velocity. Aircraft must take off and land into the wind to maximize lift at lower ground speeds. The runway heading that aligns closest to the reported wind direction (providing maximum headwind and minimum crosswind) is selected.'
  },
  {
    question: 'What is the maximum allowable tailwind for commercial aircraft?',
    answer: 'Most commercial airliners and general aviation aircraft have an operating limitation of 10 knots of tailwind for takeoff and landing, although some modern airliners (e.g. Boeing 777/787 or Airbus A350) can be certified for up to 15 knots under specific performance conditions.'
  },
  {
    question: 'What is a "Calm Wind Runway"?',
    answer: 'When surface winds are light and variable (typically under 5 knots), air traffic control designates a designated "Calm Wind Runway", typically chosen based on noise abatement procedures, runway length, or instrument approach availability.'
  }
];

export default function RunwayInUsePage() {
  const pageUrl = `${SITE_URL}/aviation/runway-in-use-calculator`;
  const webAppSchema = getWebApplicationSchema(
    pageUrl,
    'Runway in Use Calculator',
    'Determine the active runway in use based on reported wind direction, wind velocity, and airport runway configurations.',
    'AerospaceApplication'
  );
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Aviation Tools', url: `${SITE_URL}/aviation` },
    { name: 'Runway in Use Calculator', url: pageUrl }
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
              { name: 'Runway in Use Calculator', url: pageUrl }
            ]}
          />

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <Compass className="w-3.5 h-3.5" />
              <span>ATC &amp; Pilot Active Runway Selection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Runway in Use Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Find the active runway in use for any airport. Input surface wind direction and velocity to compare all runway orientations and identify the active runway with maximum headwind.
            </p>
          </div>

          <RunwayInUseCalculator />

          <RelatedTools currentUrl="/aviation/runway-in-use-calculator" category="aviation" />

          <FaqAccordion faqs={FAQS} title="Runway in Use Frequently Asked Questions" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
