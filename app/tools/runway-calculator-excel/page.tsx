import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import RunwayExcelGenerator from '@/components/calculator/RunwayExcelGenerator';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import RelatedTools from '@/components/layout/RelatedTools';
import { 
  getWebApplicationSchema, 
  getBreadcrumbSchema, 
  getFaqPageSchema, 
  SITE_URL 
} from '@/lib/seo';
import { FileSpreadsheet, Sparkles } from 'lucide-react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Runway Calculator Excel Template – Free Model Download',
  description: 'Free runway calculator Excel template and CSV generator. Download a pre-built 24-month financial runway projection model with built-in formulas.',
  keywords: [
    'runway calculator excel',
    'cash runway excel template',
    'runway projection spreadsheet',
    'startup runway template excel',
    'burn rate excel formula'
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/runway-calculator-excel`
  }
};

const FAQS: FaqItem[] = [
  {
    question: 'What is the Excel formula to calculate runway in months?',
    answer: 'In Microsoft Excel or Google Sheets, the formula is: =IF((B4-B3)<=0, "Sustainable", B2/(B4-B3)), where B2 is your Cash Balance, B3 is Monthly Revenue, and B4 is Monthly Expenses.'
  },
  {
    question: 'Is this downloaded Excel template compatible with Google Sheets?',
    answer: 'Yes, 100%. The downloaded .csv file opens natively in Microsoft Excel, Google Sheets, Apple Numbers, and LibreOffice with standard comma-delimited columns.'
  },
  {
    question: 'How do I model month-over-month revenue growth in an Excel runway model?',
    answer: 'Set Month 1 revenue to your starting MRR in cell C2. For subsequent months (e.g. cell C3), enter the formula: =C2*(1+$B$5), where $B$5 is your monthly growth rate percentage. Drag this formula across all 24 months.'
  }
];

export default function RunwayExcelPage() {
  const pageUrl = `${SITE_URL}/tools/runway-calculator-excel`;
  const webAppSchema = getWebApplicationSchema(pageUrl, 'Runway Calculator Excel Generator');
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Tools Directory', url: `${SITE_URL}/tools` },
    { name: 'Runway Calculator Excel', url: pageUrl }
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
              { name: 'Runway Calculator Excel', url: pageUrl }
            ]}
          />

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-xs font-semibold text-emerald-700">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Spreadsheet Template &amp; Formula Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Runway Calculator Excel Template
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Download a ready-to-use 24-month financial runway projection model pre-filled with your customized numbers, native Excel formulas, and cash depletion indicators.
            </p>
          </div>

          <RunwayExcelGenerator />

          <RelatedTools currentUrl="/tools/runway-calculator-excel" category="financial" />

          <FaqAccordion faqs={FAQS} title="Runway Excel Frequently Asked Questions" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
