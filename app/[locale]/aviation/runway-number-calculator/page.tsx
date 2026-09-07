import { NON_DEFAULT_LOCALES } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import RunwayNumberCalculator from '@/components/aviation/RunwayNumberCalculator';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import RelatedTools from '@/components/layout/RelatedTools';
import { 
  getWebApplicationSchema, 
  getBreadcrumbSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { Compass, Sparkles } from 'lucide-react';

export const dynamic = 'force-static';


const FAQS: FaqItem[] = [
  {
    question: 'How are airport runway numbers determined?',
    answer: 'Airport runways are numbered according to their magnetic heading rounded to the nearest 10 degrees, with the trailing zero dropped. For example, a runway oriented along magnetic heading 088° is rounded to 090° and designated Runway 09. A runway oriented at 356° is rounded to 360° and designated Runway 36.'
  },
  {
    question: 'How do you find the reciprocal runway number?',
    answer: 'The reciprocal runway is the opposite end of the same physical strip, located exactly 180° opposite. To find it, add 180 to headings under 180°, or subtract 180 from headings above 180°. For example, the reciprocal of Runway 09 (090°) is Runway 27 (270°).'
  },
  {
    question: 'Why do runway numbers occasionally change at airports?',
    answer: 'Because runway numbers are based on Magnetic North rather than True Geographic North, the natural movement of the Earth’s magnetic core (magnetic drift / secular variation) slowly alters local magnetic variation. Over decades, airports renumber and repaint runways when headings drift past the 5-degree threshold.'
  }
];

export default async function RunwayNumberPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const pageUrl = `${SITE_URL}/aviation/runway-number-calculator`;
  const webAppSchema = getWebApplicationSchema(pageUrl, 'Runway Number Calculator');
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Aviation Tools', url: `${SITE_URL}/aviation` },
    { name: 'Runway Number Calculator', url: pageUrl }
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
              { name: 'Runway Number Calculator', url: pageUrl }
            ]}
          />

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <Compass className="w-3.5 h-3.5" />
              <span>FAA / ICAO Magnetic Runway Designator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Runway Number Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Convert any magnetic compass heading to its official airport runway designation. Calculate reciprocal runways, parallel strip suffixes (L/C/R), and magnetic rounding.
            </p>
          </div>

          <RunwayNumberCalculator />

          <RelatedTools currentUrl="/aviation/runway-number-calculator" category="aviation" />

          <FaqAccordion faqs={FAQS} title="Runway Numbering Frequently Asked Questions" />
        </div>
      </main>

      <Footer />
    </div>
  );
}


export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((l) => ({ locale: l.code }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getLocalizedMetadata({
    locale,
    subpath: '/aviation/runway-number-calculator',
    title: 'Runway Number Calculator – Runway Designator & Reciprocal Heading',
    description: 'Free runway number calculator. Convert magnetic centerline headings into official FAA/ICAO runway identifiers (01–36), reciprocal headings, and parallel designations.'
  });
}
