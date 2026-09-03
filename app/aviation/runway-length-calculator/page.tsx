import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import RunwayLengthCalculator from '@/components/aviation/RunwayLengthCalculator';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import RelatedTools from '@/components/layout/RelatedTools';
import { 
  getWebApplicationSchema, 
  getBreadcrumbSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { Gauge, Sparkles } from 'lucide-react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Runway Length Calculator – Density Altitude & Takeoff Distance',
  description: 'Free runway length calculator. Calculate pressure altitude, density altitude, and required takeoff ground roll distance with FAA 50% safety buffers.',
  keywords: [
    'runway length calculator',
    'takeoff distance calculator',
    'density altitude calculator',
    'required runway length',
    'aircraft ground roll calculator'
  ],
  alternates: {
    canonical: `${SITE_URL}/aviation/runway-length-calculator`
  }
};

const FAQS: FaqItem[] = [
  {
    question: 'How does high density altitude affect required runway length?',
    answer: 'High density altitude reduces engine power output, decreases propeller efficiency, and requires a higher true airspeed to generate the same aerodynamic lift. For typical light piston aircraft, every 1,000 feet of density altitude increases takeoff ground roll distance by approximately 10% to 12%.'
  },
  {
    question: 'What is the FAA recommended runway safety factor?',
    answer: 'The FAA recommends adding at least a 50% safety buffer to your POH calculated takeoff and landing distance over a 50-foot obstacle, especially when operating from short, high-altitude, or unpaved runways.'
  },
  {
    question: 'How is density altitude calculated from airport elevation and temperature?',
    answer: 'First calculate Pressure Altitude = Field Elevation + (29.92 − Current Altimeter Setting) × 1,000. Next calculate Density Altitude = Pressure Altitude + [120 × (Outside Air Temperature in °C − Standard ISA Temperature at Pressure Altitude)].'
  }
];

export default function RunwayLengthPage() {
  const pageUrl = `${SITE_URL}/aviation/runway-length-calculator`;
  const webAppSchema = getWebApplicationSchema(pageUrl, 'Runway Length Calculator');
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Aviation Tools', url: `${SITE_URL}/aviation` },
    { name: 'Runway Length Calculator', url: pageUrl }
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
              { name: 'Runway Length Calculator', url: pageUrl }
            ]}
          />

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <Gauge className="w-3.5 h-3.5" />
              <span>Aerodynamic Density Altitude Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Runway Length Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Calculate pressure altitude, density altitude, and temperature-adjusted takeoff distance. Include FAA recommended 50% safety buffers for confident flight planning.
            </p>
          </div>

          <RunwayLengthCalculator />

          <RelatedTools currentUrl="/aviation/runway-length-calculator" category="aviation" />

          <FaqAccordion faqs={FAQS} title="Runway Length Frequently Asked Questions" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
