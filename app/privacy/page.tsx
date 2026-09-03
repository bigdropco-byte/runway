import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { ShieldCheck, Lock, Cookie, Eye, Server, RefreshCw } from 'lucide-react';
import CookiePreferencesButton from '@/components/layout/CookiePreferencesButton';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Privacy Policy & Cookie Disclosure – Runway Calculator',
  description: 'Understand how Runway Calculator respects your privacy. 100% client-side execution, zero data selling, and GDPR/CCPA cookie compliance.',
  keywords: [
    'runway calculator privacy policy',
    'cookie policy',
    'gdpr compliance',
    'ccpa privacy notice',
    'client-side data privacy'
  ],
  alternates: {
    canonical: `${SITE_URL}/privacy`
  }
};

export default function PrivacyPolicyPage() {
  const pageUrl = `${SITE_URL}/privacy`;
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Privacy & Cookie Policy', url: pageUrl }
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900">
      <JsonLd data={breadcrumbSchema} />
      <Header />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <Breadcrumbs items={[{ name: 'Privacy & Cookie Policy', url: '/privacy' }]} />

          <div className="space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Client-Side Privacy Standard</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Privacy Policy &amp; Cookie Disclosure
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Last Updated: September 2026 • Compliant with EU GDPR, UK GDPR, and California CCPA/CPRA.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-10 space-y-8 text-sm text-slate-600 leading-relaxed">
            {/* Section 1: Zero Server-Side Financial Transmission */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center text-slate-900">
                <Lock className="w-4 h-4 mr-2 text-indigo-600" />
                1. Zero Server-Side Transmission of Financial Data
              </h2>
              <p>
                At Runway Calculator, privacy is not an afterthought—it is built into our software architecture. <strong>All calculation algorithms run strictly within your device’s local browser JavaScript engine.</strong>
              </p>
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-xs text-emerald-900 space-y-1.5">
                <strong className="font-bold block">What this means for you:</strong>
                <ul className="list-disc list-inside space-y-1">
                  <li>Your bank balance, revenue, and payroll numbers are <strong>never</strong> transmitted over the internet to our servers.</li>
                  <li>We do not operate databases storing your proprietary financial information.</li>
                  <li>When you close your browser or clear your cache, your session data is removed.</li>
                </ul>
              </div>
            </section>

            {/* Section 2: Global Cookie Policy */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center">
                <Cookie className="w-4 h-4 mr-2 text-indigo-600" />
                2. How We Use Cookies and Local Storage
              </h2>
              <p>
                Under the EU ePrivacy Directive and GDPR Article 5(3), websites must disclose the use of cookies and local storage tokens:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <tr>
                      <th className="p-3">Type</th>
                      <th className="p-3">Purpose</th>
                      <th className="p-3">Duration</th>
                      <th className="p-3">Required</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Strictly Necessary</td>
                      <td className="p-3">Saves your consent preference and local calculator memory across page tabs.</td>
                      <td className="p-3">Persistent (Local Storage)</td>
                      <td className="p-3 text-emerald-600 font-bold">Yes (Exempt)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Functional</td>
                      <td className="p-3">Remembers chosen presets (e.g. Seed vs Bootstrapped) for convenience.</td>
                      <td className="p-3">Session</td>
                      <td className="p-3 text-slate-500">Optional</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Third-Party Tracking</td>
                      <td className="p-3">Advertising networks, behavioral surveillance, or cross-site tracking.</td>
                      <td className="p-3">None</td>
                      <td className="p-3 text-rose-600 font-bold">Not Used</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3: CCPA / CPRA */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center">
                <Eye className="w-4 h-4 mr-2 text-indigo-600" />
                3. California Consumer Privacy Act (CCPA / CPRA)
              </h2>
              <p>
                We do not sell, rent, or share personal information with third-party data brokers. Because our calculators function client-side without registration requirements, we do not compile consumer profiles.
              </p>
            </section>

            {/* Section 4: GDPR Rights */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-indigo-600" />
                4. Your Rights Under European Data Protection (GDPR)
              </h2>
              <p>
                Under EU/UK GDPR regulations, you maintain the right to access, rectify, or erase any stored personal data. Because we do not store personal data on our servers, clearing your browser cookies and local storage immediately removes all traces of your interactions.
              </p>
            </section>

            {/* Section 5: Manage Cookie Settings */}
            <section className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <strong className="text-slate-900 block font-semibold text-xs">
                  Change Your Cookie Preferences Anytime
                </strong>
                <span className="text-xs text-slate-500">
                  You can update or revoke your cookie choices at any point.
                </span>
              </div>
              <CookiePreferencesButton />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
