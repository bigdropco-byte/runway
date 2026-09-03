import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { ALL_NICHES } from '@/lib/niches';
import { getBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { ArrowRight, Calculator, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industry Runway Calculators – Customized Financial Tools by Sector',
  description: 'Explore tailored cash runway and burn rate calculators customized for startups, SaaS, small businesses, freelancers, agencies, nonprofits, and DTC brands.',
  alternates: {
    canonical: `${SITE_URL}/tools`
  }
};

export default function ToolsDirectoryPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Tools Directory', url: `${SITE_URL}/tools` }
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900">
      <JsonLd data={breadcrumbSchema} />
      <Header />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Industry Calculators Directory', url: '/tools' }]} />

          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Financial Planning Models</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Cash Runway Calculators by Industry
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Different business models face unique cash cycles. Select your industry below to access an interactive calculator configured with realistic benchmarks, burn drivers, and worked examples.
            </p>
          </div>

          {/* Niche Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_NICHES.map((niche) => (
              <div
                key={niche.slug}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                      {niche.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Target: {niche.recommendedRunwayMonths}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 mb-2">
                    <Link
                      href={`/tools/${niche.slug}`}
                      className="hover:text-indigo-600 transition-colors"
                    >
                      {niche.name}
                    </Link>
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {niche.intro}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 mb-4">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Recommended Runway Target
                    </div>
                    <div className="text-xs font-bold text-indigo-900">
                      {niche.recommendedRunwayMonths}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/tools/${niche.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <span>Launch {niche.name} Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
