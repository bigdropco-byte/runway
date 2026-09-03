import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { Plane, Wind, Mountain, Compass, Gauge, ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aviation Runway Calculators – Crosswind, Slope, Number & Length',
  description: 'Free aviation runway calculators for pilots and flight operations. Calculate runway crosswind components, runway slope gradient, magnetic runway numbers, and density altitude length.',
  keywords: [
    'aviation runway calculator',
    'runway calculator wind',
    'runway crosswind calculator',
    'runway slope calculator',
    'runway number calculator',
    'runway length calculator'
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
  }
];

export default function AviationHubPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Aviation Tools Hub', url: `${SITE_URL}/aviation` }
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900">
      <JsonLd data={breadcrumbSchema} />
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
              Professional flight planning and airport runway calculation tools. Built according to FAA and ICAO standards for flight instructors, student pilots, and dispatchers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
          <div className="max-w-5xl mx-auto p-6 rounded-2xl bg-indigo-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
              className="shrink-0 px-4 py-2.5 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs shadow-sm transition-colors"
            >
              Go to Financial Runway Calculator
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
