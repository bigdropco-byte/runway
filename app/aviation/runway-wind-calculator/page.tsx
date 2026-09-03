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

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Runway Wind Calculator – Headwind, Crosswind & Gust Velocity',
  description: 'Free runway wind calculator. Calculate crosswind, headwind, and tailwind components with visual compass vectors and peak reported gust factors.',
  keywords: [
    'runway wind calculator',
    'runway crosswind calculator',
    'headwind calculator runway',
    'aviation wind calculator',
    'tailwind component calculator'
  ],
  alternates: {
    canonical: `${SITE_URL}/aviation/runway-wind-calculator`
  }
};

const FAQS: FaqItem[] = [
  {
    question: 'What does a runway wind calculator do?',
    answer: 'A runway wind calculator resolves total wind speed and direction into two perpendicular vectors: the headwind/tailwind component aligned with the runway centerline, and the crosswind component perpendicular to the runway. This allows pilots to check safe aircraft operating limitations.'
  },
  {
    question: 'How do gusts impact runway wind calculations?',
    answer: 'When winds are reported with gusts (e.g., 15 gusting to 25 knots), pilots must calculate crosswind components for both the sustained wind and the peak gust speed. The aircraft’s maximum demonstrated crosswind limit must not be exceeded by the peak gust component.'
  },
  {
    question: 'Is a tailwind always dangerous on landing?',
    answer: 'Yes. A tailwind significantly increases true ground speed at touchdown, increases landing rollout distance exponentially (often doubling stopping distance on contaminated runways), and degrades directional control authority.'
  }
];

export default function RunwayWindPage() {
  const pageUrl = `${SITE_URL}/aviation/runway-wind-calculator`;
  const webAppSchema = getWebApplicationSchema(
    pageUrl,
    'Runway Wind Calculator',
    'Calculate headwind, crosswind, and tailwind components with wind gust factoring and directional compass vectors.',
    'AerospaceApplication'
  );
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Aviation Tools', url: `${SITE_URL}/aviation` },
    { name: 'Runway Wind Calculator', url: pageUrl }
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
              { name: 'Runway Wind Calculator', url: pageUrl }
            ]}
          />

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <Wind className="w-3.5 h-3.5" />
              <span>Aeronautical Vector Trigonometry</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Runway Wind Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Resolve reported surface winds into precise headwind and crosswind components. Factor in peak reported wind gusts and inspect the interactive compass vector.
            </p>
          </div>

          <CrosswindCalculator />

          <RelatedTools currentUrl="/aviation/runway-wind-calculator" category="aviation" />

          <FaqAccordion faqs={FAQS} title="Runway Wind Frequently Asked Questions" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
