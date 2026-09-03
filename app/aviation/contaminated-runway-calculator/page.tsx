import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import ContaminatedRunwayCalculator from '@/components/aviation/ContaminatedRunwayCalculator';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import RelatedTools from '@/components/layout/RelatedTools';
import { 
  getWebApplicationSchema, 
  getBreadcrumbSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { CloudRain, Sparkles } from 'lucide-react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Contaminated Runway Calculator – FAA TALPA & Wet Distance',
  description: 'Calculate contaminated runway landing distance adjustments based on FAA TALPA Runway Condition Codes (RWYCC 1–6). Account for wet, slush, and icy surfaces.',
  keywords: [
    'contaminated runway calculator',
    'wet runway landing distance calculator',
    'talpa runway condition calculator',
    'rcam runway assessment',
    'hydroplaning landing distance'
  ],
  alternates: {
    canonical: `${SITE_URL}/aviation/contaminated-runway-calculator`
  }
};

const FAQS: FaqItem[] = [
  {
    question: 'What is the FAA TALPA / RCAM system?',
    answer: 'The FAA Takeoff and Landing Performance Assessment (TALPA) initiative introduced the Runway Condition Assessment Matrix (RCAM). It replaces subjective pilot braking action reports with objective Runway Condition Codes (RWYCC from 0 to 6) based on contaminant type, depth, and temperature.'
  },
  {
    question: 'How much does a wet runway increase aircraft landing distance?',
    answer: 'Under standard dispatch rules, a smooth wet runway requires at least a 35% to 40% increase over unfactored dry landing distance (multiplier of ~1.35x to 1.40x), plus a mandatory 15% operational safety margin.'
  },
  {
    question: 'What is dynamic hydroplaning and when does it occur?',
    answer: 'Dynamic hydroplaning occurs when standing water (depth > 3mm) builds a wedge in front of the tire, lifting it completely off the pavement. The minimum dynamic hydroplaning speed in knots is roughly calculated as 9 times the square root of the tire pressure in PSI (9 × √PSI).'
  }
];

export default function ContaminatedRunwayPage() {
  const pageUrl = `${SITE_URL}/aviation/contaminated-runway-calculator`;
  const webAppSchema = getWebApplicationSchema(pageUrl, 'Contaminated Runway Landing Distance Calculator');
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Aviation Tools', url: `${SITE_URL}/aviation` },
    { name: 'Contaminated Runway Calculator', url: pageUrl }
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
              { name: 'Contaminated Runway Calculator', url: pageUrl }
            ]}
          />

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <CloudRain className="w-3.5 h-3.5" />
              <span>FAA TALPA / RCAM Surface Matrix</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Contaminated Runway Landing Distance Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Calculate landing rollout distances on contaminated surfaces. Select FAA Runway Condition Codes (RWYCC 1–6) for rain, slush, snow, and ice, including 15% safety dispatch factors.
            </p>
          </div>

          <ContaminatedRunwayCalculator />

          <RelatedTools currentUrl="/aviation/contaminated-runway-calculator" category="aviation" />

          <FaqAccordion faqs={FAQS} title="Contaminated Runway FAQs" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
