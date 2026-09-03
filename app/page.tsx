import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RunwayCalculator from '@/components/calculator/RunwayCalculator';
import GuideContent from '@/components/content/GuideContent';
import FaqAccordion, { FaqItem } from '@/components/content/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';
import { 
  getBaseMetadata, 
  getWebApplicationSchema, 
  getFaqPageSchema 
} from '@/lib/seo';
import { ShieldCheck, Zap, Sparkles, TrendingUp } from 'lucide-react';

export const metadata: Metadata = getBaseMetadata();

const HOMEPAGE_FAQS: FaqItem[] = [
  {
    question: 'What is a runway calculator and how is cash runway calculated?',
    answer: 'A runway calculator is a financial tool that computes how many months a business can continue operating before running out of liquid cash. The standard formula is: Available Cash ÷ Net Monthly Burn. Net burn is calculated by subtracting total monthly cash revenue from total monthly operating expenses.'
  },
  {
    question: 'What is the critical difference between Gross Burn and Net Burn?',
    answer: 'Gross Burn is the total absolute amount of cash leaving your business bank account each month (payroll, rent, software, inventory). Net Burn subtracts incoming revenue receipts from gross expenses. If you spend $40,000/month and generate $15,000/month in sales, your Gross Burn is $40,000 and your Net Burn is $25,000. Your runway is always determined by Net Burn.'
  },
  {
    question: 'How does this calculator handle revenue growth and expense inflation?',
    answer: 'Under the Advanced Options panel, you can specify monthly compound revenue growth (%) and expense growth (%). Our calculation engine runs month-by-month cash simulations up to 60 months and uses linear interpolation to determine the exact fraction of the month when cash reserves deplete.'
  },
  {
    question: 'How many months of runway should an early-stage startup maintain?',
    answer: 'Venture-backed startups should ideally maintain 18 to 24 months of runway following a financing round to allow 12 to 18 months of product milestones and 6 months to execute the subsequent institutional fundraise. Bootstrapped businesses typically maintain 6 to 12 months, while freelancers and service agencies target 3 to 6 months.'
  },
  {
    question: 'What does it mean if my runway is "Sustainable / Infinite"?',
    answer: 'If your monthly revenue equals or exceeds your monthly expenses, your net monthly burn is zero or negative. Your business is producing positive cash flow (or operating at break-even), meaning your cash balance is not depleting over time.'
  },
  {
    question: 'Is my financial data kept private and secure?',
    answer: 'Yes, 100%. All calculations and projections run entirely client-side inside your browser’s JavaScript runtime. No bank numbers, balance figures, or revenue metrics are ever transmitted to our servers or stored in any database.'
  }
];

export default function HomePage() {
  const webAppSchema = getWebApplicationSchema();
  const faqSchema = getFaqPageSchema(HOMEPAGE_FAQS);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      <JsonLd data={webAppSchema} />
      <JsonLd data={faqSchema} />
      
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-10 pb-8 sm:pt-14 sm:pb-10 border-b border-slate-200/60 bg-gradient-to-b from-white via-indigo-50/20 to-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              {/* Trust Badges */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Free Financial Runway &amp; Burn Engine</span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-medium flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-0.5" /> 100% Private
                </span>
              </div>

              {/* H1 Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Runway Calculator
              </h1>

              {/* Supporting Hero Text */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
                Calculate how many months your cash can support your business based on your cash balance, revenue, and monthly expenses. Model growth projections and scenario impact instantly.
              </p>
            </div>

            {/* Privacy Promise Banner */}
            <div className="mt-6 max-w-xl mx-auto p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center space-x-2 text-xs text-slate-600 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Privacy-friendly:</strong> Your calculations happen locally in your browser. We do not need or store your financial data.
              </span>
            </div>
          </div>
        </section>

        {/* Primary Calculator Section */}
        <section className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RunwayCalculator />
          </div>
        </section>

        {/* In-Depth Educational Guide */}
        <section className="py-12 sm:py-16 border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GuideContent />
          </div>
        </section>

        {/* Semantic FAQ Section */}
        <section className="py-12 sm:py-16 border-t border-slate-200 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FaqAccordion faqs={HOMEPAGE_FAQS} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
