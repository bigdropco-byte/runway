import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import RunwayCalculator from '@/components/calculator/RunwayCalculator';
import FaqAccordion from '@/components/content/FaqAccordion';
import { ALL_NICHES, getNicheBySlug } from '@/lib/niches';
import { 
  getNicheMetadata, 
  getWebApplicationSchema, 
  getBreadcrumbSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { 
  ShieldCheck, 
  Target, 
  Flame, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle, 
  Info,
  DollarSign
} from 'lucide-react';
import { formatCurrency } from '@/lib/runwayCalculator';

interface NichePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ALL_NICHES.map((niche) => ({
    slug: niche.slug
  }));
}

export async function generateMetadata({ params }: NichePageProps): Promise<Metadata> {
  const { slug } = await params;
  const niche = getNicheBySlug(slug);
  if (!niche) {
    return {
      title: 'Calculator Not Found | Runway Calculator'
    };
  }
  return getNicheMetadata(niche);
}

export default async function NicheCalculatorPage({ params }: NichePageProps) {
  const { slug } = await params;
  const niche = getNicheBySlug(slug);

  if (!niche) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/tools/${niche.slug}`;
  const webAppSchema = getWebApplicationSchema(pageUrl, `${niche.name} Runway Calculator`);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Tools Directory', url: `${SITE_URL}/tools` },
    { name: `${niche.name} Calculator`, url: pageUrl }
  ]);
  const faqSchema = getFaqPageSchema(niche.faqs);

  const relatedNiches = niche.relatedNicheSlugs
    .map((rSlug) => getNicheBySlug(rSlug))
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900">
      <JsonLd data={webAppSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { name: 'Tools Directory', url: '/tools' },
              { name: `${niche.name} Runway Calculator`, url: `/tools/${niche.slug}` }
            ]}
          />

          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <span>{niche.badge}</span>
              <span className="text-slate-300">•</span>
              <span>Recommended Target: {niche.recommendedRunwayMonths}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              {niche.h1}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {niche.intro}
            </p>

            {/* Benchmark Callout Banner */}
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200/80 text-left text-xs sm:text-sm text-slate-700 flex items-start space-x-3">
              <Target className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-indigo-950 font-bold block mb-0.5">
                  Industry Benchmark Guidance ({niche.recommendedRunwayMonths}):
                </strong>
                <span>{niche.targetBenchmarkText}</span>
              </div>
            </div>
          </div>

          {/* Interactive Calculator with Niche Defaults */}
          <div className="pt-2">
            <RunwayCalculator initialInputs={niche.defaultInputs} />
          </div>

          {/* Niche Specific Content Sections */}
          <div className="max-w-4xl mx-auto space-y-12 pt-8 border-t border-slate-200">
            {/* Key Burn Drivers */}
            <section className="space-y-4">
              <div className="flex items-center space-x-2 text-rose-600 font-semibold text-xs uppercase tracking-wider">
                <Flame className="w-4 h-4" />
                <span>Primary Cost Drivers</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Major Burn Drivers for {niche.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {niche.keyBurnDrivers.map((driver, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2"
                  >
                    <h3 className="text-sm font-bold text-slate-900">{driver.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{driver.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Extension Strategies */}
            <section className="space-y-4">
              <div className="flex items-center space-x-2 text-emerald-600 font-semibold text-xs uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>Actionable Levers</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                How to Extend {niche.name} Runway
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {niche.extensionStrategies.map((strat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{strat.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{strat.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Worked Calculation Example */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Worked Calculation: {niche.workedExample.scenarioTitle}
              </h2>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">Starting Cash</span>
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      {formatCurrency(niche.workedExample.cash)}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">Monthly Cash Inflow</span>
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      {formatCurrency(niche.workedExample.revenue)}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">Monthly Cash Outflow</span>
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      {formatCurrency(niche.workedExample.expenses)}
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  {niche.workedExample.explanation}
                </p>
              </div>
            </section>

            {/* Niche FAQs */}
            <section className="pt-4">
              <FaqAccordion
                faqs={niche.faqs}
                title={`Frequently Asked Questions: ${niche.name} Runway`}
                description={`Common questions and financial benchmarks for ${niche.name.toLowerCase()}.`}
              />
            </section>

            {/* Related Niches Section */}
            {relatedNiches.length > 0 && (
              <section className="pt-6 border-t border-slate-200 space-y-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Explore Related Industry Calculators
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {relatedNiches.map((rel) => {
                    if (!rel) return null;
                    return (
                      <Link
                        key={rel.slug}
                        href={`/tools/${rel.slug}`}
                        className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-xs transition-all group"
                      >
                        <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {rel.name} Calculator
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                          {rel.badge} • Target {rel.recommendedRunwayMonths}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
