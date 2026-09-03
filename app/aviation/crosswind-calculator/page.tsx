import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CrosswindCalculator from '@/components/aviation/CrosswindCalculator';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import RelatedTools from '@/components/layout/RelatedTools';
import { 
  getWebApplicationSchema, 
  getBreadcrumbSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { Wind, Compass, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Runway Crosswind Calculator – Wind & Headwind Component',
  description: 'Free runway crosswind calculator. Calculate exact crosswind and headwind/tailwind components, maximum demonstrated limits, and gust factors with visual compass.',
  keywords: [
    'runway crosswind calculator',
    'runway headwind calculator',
    'runway calculator wind',
    'crosswind component calculator',
    'aviation runway wind'
  ],
  alternates: {
    canonical: `${SITE_URL}/aviation/crosswind-calculator`
  }
};

const FAQS: FaqItem[] = [
  {
    question: 'What is the formula to calculate runway crosswind component?',
    answer: 'Crosswind Component = Wind Speed × sin(Wind Angle − Runway Heading). For example, with a 20-knot wind blowing at a 30-degree angle to the runway, the crosswind component is 20 × sin(30°) = 10.0 knots.'
  },
  {
    question: 'What is the formula for headwind component?',
    answer: 'Headwind Component = Wind Speed × cos(Wind Angle − Runway Heading). A positive result indicates a beneficial headwind that reduces landing rollout, while a negative value indicates a hazardous tailwind.'
  },
  {
    question: 'What is the maximum crosswind component for a Cessna 172?',
    answer: 'The maximum demonstrated crosswind velocity for a standard Cessna 172 Skyhawk is 15 knots (with flaps fully extended). While not an absolute FAA regulatory limitation, operating beyond demonstrated limits significantly increases loss-of-directional-control risk.'
  },
  {
    question: 'How does wind gust affect crosswind calculations?',
    answer: 'Pilots should always calculate their crosswind using both the steady wind speed and the peak reported gust speed. If steady wind is 15 kts gusting to 25 kts at a 45° angle, the peak gust crosswind reaches 17.7 knots.'
  }
];

export default function CrosswindPage() {
  const pageUrl = `${SITE_URL}/aviation/crosswind-calculator`;
  const webAppSchema = getWebApplicationSchema(pageUrl, 'Runway Crosswind Calculator');
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Aviation Tools', url: `${SITE_URL}/aviation` },
    { name: 'Runway Crosswind Calculator', url: pageUrl }
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
              { name: 'Runway Crosswind Calculator', url: pageUrl }
            ]}
          />

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <Wind className="w-3.5 h-3.5" />
              <span>FAA &amp; ICAO Flight Planning Standard</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Runway Crosswind Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Calculate exact crosswind and headwind/tailwind components for takeoff and landing. Check your aircraft’s maximum demonstrated limits and view the interactive runway wind vector.
            </p>
          </div>

          <CrosswindCalculator />

          <RelatedTools currentUrl="/aviation/crosswind-calculator" category="aviation" />

          <FaqAccordion faqs={FAQS} title="Runway Crosswind Frequently Asked Questions" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
