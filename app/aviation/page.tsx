import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import { 
  getBreadcrumbSchema, 
  getCollectionPageSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { Plane, Wind, Mountain, Compass, Gauge, Eye, CloudRain, ArrowRight, Sparkles } from 'lucide-react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Aviation Runway Calculators – Pilot & Aerodrome Tools',
  description: 'Free aviation runway calculators for pilots, flight instructors, and dispatchers. Calculate crosswind components, slope gradient, runway numbers, density altitude, RVR, and TALPA contaminated distances.',
  keywords: [
    'aviation runway calculator',
    'runway calculator wind',
    'runway crosswind calculator',
    'runway slope calculator',
    'runway number calculator',
    'runway length calculator',
    'rvr calculator',
    'contaminated runway calculator'
  ],
  alternates: {
    canonical: `${SITE_URL}/aviation`
  }
};

const AVIATION_TOOLS = [
  {
    name: 'Runway Crosswind & Headwind Calculator',
    slug: 'crosswind-calculator',
    description: 'Calculate exact crosswind and headwind/tailwind components based on magnetic runway heading, wind direction, and speed with an interactive compass visual.',
    icon: Wind,
    badge: 'Popular'
  },
  {
    name: 'Runway Slope Calculator',
    slug: 'runway-slope-calculator',
    description: 'Determine runway longitudinal gradient percentage from threshold elevations and evaluate takeoff acceleration and landing rollout impact.',
    icon: Mountain,
    badge: 'ICAO Standard'
  },
  {
    name: 'Runway Number & Reciprocal Calculator',
    slug: 'runway-number-calculator',
    description: 'Convert any magnetic centerline heading into official FAA/ICAO runway numbers, parallel suffixes (L/C/R), and 180° reciprocal approach designations.',
    icon: Compass,
    badge: 'Navigation'
  },
  {
    name: 'Runway Length & Takeoff Performance Calculator',
    slug: 'runway-length-calculator',
    description: 'Calculate pressure altitude, density altitude, and temperature-adjusted takeoff ground roll distance with recommended safety margins.',
    icon: Gauge,
    badge: 'Performance'
  },
  {
    name: 'Runway Visual Range (RVR) Calculator',
    slug: 'runway-visual-range-calculator',
    description: 'Convert RVR in feet and meters to statute miles using FAA AIM Table 7-1-10 and check Category I, II, and III precision ILS minimums.',
    icon: Eye,
    badge: 'Approach'
  },
  {
    name: 'Contaminated Runway Landing Distance Calculator',
    slug: 'contaminated-runway-calculator',
    description: 'Apply FAA TALPA Runway Condition Assessment Matrix (RCAM 1–6) multipliers for rain, slush, snow, and ice with 15% dispatch buffers.',
    icon: CloudRain,
    badge: 'TALPA / RCAM'
  },
  {
    name: 'Runway in Use Calculator',
    slug: 'runway-in-use-calculator',
    description: 'Determine active airport runway in use based on surface wind direction, speed, and airport runway layouts.',
    icon: Compass,
    badge: 'Active Runway'
  },
  {
    name: 'Runway Wind Calculator',
    slug: 'runway-wind-calculator',
    description: 'Calculate headwind, crosswind, and tailwind components with wind gust factoring and visual vectors.',
    icon: Wind,
    badge: 'Wind Vectors'
  }
];

const AVIATION_FAQS: FaqItem[] = [
  {
    question: 'Are these aviation calculations compliant with FAA and ICAO standards?',
    answer: 'Yes. Trigonometric formulas follow standard aeronautical navigation mathematics. Runway numbering adheres to FAA Order 5300.1D, slope gradient follows ICAO Annex 14 recommendations, RVR conversions align with FAA AIM Table 7-1-10, and contaminated distances reflect FAA TALPA RCAM guidelines.'
  },
  {
    question: 'Can I use these calculators for commercial flight dispatch?',
    answer: 'These calculators are designed for educational, flight planning, and scenario assessment purposes. Certified flight crews and air carriers must always refer to their aircraft’s approved Pilot’s Operating Handbook (POH), Aircraft Flight Manual (AFM), and company Operations Specifications.'
  }
];

export default function AviationHubPage() {
  const pageUrl = `${SITE_URL}/aviation`;
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Aviation Tools Hub', url: pageUrl }
  ]);

  const collectionSchema = getCollectionPageSchema(
    'Aviation Runway Calculators Suite',
    pageUrl,
    'Suite of pilot and aerodrome calculators covering crosswinds, slope gradients, runway numbering, density altitude, RVR, and TALPA contaminated runway lengths.',
    AVIATION_TOOLS.map((t) => ({
      name: t.name,
      url: `${SITE_URL}/aviation/${t.slug}`,
      description: t.description
    }))
  );

  const faqSchema = getFaqPageSchema(AVIATION_FAQS);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      <JsonLd data={faqSchema} />
      <Header />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <Breadcrumbs items={[{ name: 'Aviation Runway Calculators', url: '/aviation' }]} />

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <Plane className="w-3.5 h-3.5" />
              <span>Aeronautical Flight Operations &amp; Pilot Tools</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Aviation Runway Calculators
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Professional flight planning and aerodrome calculation tools. Built according to FAA and ICAO standards for flight instructors, student pilots, dispatchers, and airport operators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {AVIATION_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.slug}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {tool.badge}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 mb-2">
                      <Link
                        href={`/aviation/${tool.slug}`}
                        className="hover:text-indigo-600 transition-colors"
                      >
                        {tool.name}
                      </Link>
                    </h2>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {tool.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      href={`/aviation/${tool.slug}`}
                      className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      <span>Open Aviation Calculator</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cross-Link Back to Business Runway */}
          <div className="max-w-6xl mx-auto p-6 rounded-2xl bg-indigo-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider block">
                Looking for Business &amp; Financial Runway?
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Calculate Startup Cash Runway &amp; Burn Rates
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Model monthly cash balances, burn multiple, break-even timeline, and financial survival months.
              </p>
            </div>
            <Link
              href="/"
              className="shrink-0 px-4 py-2.5 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs shadow-sm transition-colors flex items-center space-x-1"
            >
              <span>Go to Financial Runway Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <FaqAccordion faqs={AVIATION_FAQS} title="Aviation Runway Frequently Asked Questions" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
