import { SUPPORTED_LOCALES } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import RunwayExtensionCalculator from '@/components/calculator/RunwayExtensionCalculator';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import RelatedTools from '@/components/layout/RelatedTools';
import { 
  getWebApplicationSchema, 
  getBreadcrumbSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { Target, Sparkles } from 'lucide-react';

export const dynamic = 'force-static';


const FAQS: FaqItem[] = [
  {
    question: 'How does the Runway Extension Calculator work?',
    answer: 'Unlike standard calculators that calculate months from existing burn, this reverse solver allows you to set a target runway goal (e.g. 18 months) and immediately calculates the exact dollar reduction in monthly expenses or monthly revenue growth required to hit that target.'
  },
  {
    question: 'What is the fastest way to extend runway by 6 months?',
    answer: 'The fastest lever is typically pausing non-essential hiring and restructuring software subscriptions, which takes effect immediately. Converting monthly customers to annual upfront billing also injects instant non-dilutive cash without adding debt.'
  },
  {
    question: 'Should I prioritize cost cutting or revenue growth to extend runway?',
    answer: 'Cost cuts take effect immediately with 100% certainty, whereas revenue expansion carries sales cycle lag and variable conversion rates. Founders with under 6 months of runway should prioritize aggressive cost optimization first.'
  }
];

export default async function RunwayExtensionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const pageUrl = `${SITE_URL}/tools/runway-extension-calculator`;
  const webAppSchema = getWebApplicationSchema(pageUrl, 'Runway Extension Calculator');
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Tools Directory', url: `${SITE_URL}/tools` },
    { name: 'Runway Extension Calculator', url: pageUrl }
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
              { name: 'Tools Directory', url: '/tools' },
              { name: 'Runway Extension Calculator', url: pageUrl }
            ]}
          />

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <Target className="w-3.5 h-3.5" />
              <span>Reverse Target Financial Solver</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Runway Extension Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Select your target runway goal (e.g. 18 months). Calculate the exact dollar expense cuts, sales targets, or capital infusion needed to guarantee survival.
            </p>
          </div>

          <RunwayExtensionCalculator />

          <RelatedTools currentUrl="/tools/runway-extension-calculator" category="financial" />

          <FaqAccordion faqs={FAQS} title="Runway Extension Frequently Asked Questions" />
        </div>
      </main>

      <Footer />
    </div>
  );
}


export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((l) => ({ locale: l.code }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getLocalizedMetadata({
    locale,
    subpath: '/tools/runway-extension-calculator',
    title: 'Runway Extension Calculator – Reverse Goal Solver for Cost Cuts',
    description: 'Free runway extension solver. Reverse goal-seek calculator: determine the exact monthly expense cuts or revenue growth needed to hit your target runway.'
  });
}
