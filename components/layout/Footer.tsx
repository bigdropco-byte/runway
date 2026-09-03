import React from 'react';
import Link from 'next/link';
import { Calculator, ShieldCheck, Lock, Plane } from 'lucide-react';
import { ALL_NICHES } from '@/lib/niches';
import CookiePreferencesButton from '@/components/layout/CookiePreferencesButton';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Privacy Statement */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5 text-white">
              <img
                src="/favicon.png"
                alt="Runway Calculator Logo"
                className="w-8 h-8 rounded-lg shadow-xs object-cover"
              />
              <span className="text-lg font-bold tracking-tight">
                Runway<span className="text-indigo-400">Calculator</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Free, professional-grade calculation suite for financial runway forecasting, headcount burn, and FAA/ICAO aeronautical runway calculations. 100% private in-browser computation.
            </p>
            <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/60 max-w-sm">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Zero Server-Side Storage</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-normal">
                Your calculations happen locally in your browser. We do not need, transmit, or store your financial data to calculate your runway.
              </p>
            </div>
          </div>

          {/* Financial Tools */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Financial Calculators
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/tools/startup-runway-calculator" className="hover:text-indigo-400 transition-colors">
                  Startup Runway Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/hiring-runway-calculator" className="hover:text-indigo-400 transition-colors">
                  Hiring &amp; Headcount Burn
                </Link>
              </li>
              <li>
                <Link href="/tools/default-alive-calculator" className="hover:text-indigo-400 transition-colors">
                  Default Alive vs Dead (PG)
                </Link>
              </li>
              <li>
                <Link href="/tools/safe-dilution-runway-calculator" className="hover:text-indigo-400 transition-colors">
                  SAFE &amp; Dilution Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/cash-runway-calculator" className="hover:text-indigo-400 transition-colors">
                  Cash Runway Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/burn-rate-calculator" className="hover:text-indigo-400 transition-colors">
                  Burn Rate Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/runway-calculator-excel" className="hover:text-indigo-400 transition-colors">
                  Excel Model &amp; CSV Template
                </Link>
              </li>
              <li>
                <Link href="/tools/runway-extension-calculator" className="hover:text-indigo-400 transition-colors">
                  Runway Extension Solver
                </Link>
              </li>
            </ul>
          </div>

          {/* Aviation Tools */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 flex items-center">
              <Plane className="w-3.5 h-3.5 mr-1 text-indigo-400" />
              Aviation Tools
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/aviation/crosswind-calculator" className="hover:text-indigo-400 transition-colors">
                  Crosswind &amp; Wind Component
                </Link>
              </li>
              <li>
                <Link href="/aviation/runway-slope-calculator" className="hover:text-indigo-400 transition-colors">
                  Runway Slope Gradient
                </Link>
              </li>
              <li>
                <Link href="/aviation/runway-number-calculator" className="hover:text-indigo-400 transition-colors">
                  Runway Number &amp; Reciprocal
                </Link>
              </li>
              <li>
                <Link href="/aviation/runway-length-calculator" className="hover:text-indigo-400 transition-colors">
                  Density Altitude &amp; Length
                </Link>
              </li>
              <li>
                <Link href="/aviation/runway-visual-range-calculator" className="hover:text-indigo-400 transition-colors">
                  Runway Visual Range (RVR)
                </Link>
              </li>
              <li>
                <Link href="/aviation/contaminated-runway-calculator" className="hover:text-indigo-400 transition-colors">
                  Contaminated Runway (TALPA)
                </Link>
              </li>
              <li>
                <Link href="/aviation/runway-in-use-calculator" className="hover:text-indigo-400 transition-colors">
                  Runway in Use Calculator
                </Link>
              </li>
              <li>
                <Link href="/aviation/runway-wind-calculator" className="hover:text-indigo-400 transition-colors">
                  Runway Wind Calculator
                </Link>
              </li>
              <li>
                <Link href="/aviation" className="hover:text-indigo-400 transition-colors font-semibold text-indigo-400">
                  Aviation Hub Overview →
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Resources */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Guides &amp; Niches
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/tools" className="hover:text-indigo-400 transition-colors font-semibold text-indigo-400">
                  All 10 Industry Niches →
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-indigo-400 transition-colors">
                  Runway Formula Breakdown
                </Link>
              </li>
              <li>
                <Link href="/#runway-guide" className="hover:text-indigo-400 transition-colors">
                  Gross vs Net Burn Guide
                </Link>
              </li>
              <li>
                <Link href="/#methodology" className="hover:text-indigo-400 transition-colors">
                  Calculation Assumptions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-400 transition-colors">
                  Privacy &amp; Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Attribution */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 space-y-3">
          <p className="leading-relaxed">
            <strong>Disclaimer:</strong> The Runway Calculator suite is built for educational, illustrative, and planning purposes only. Financial calculations do not constitute formal CPA accounting, investment, or legal advice. Aviation calculations do not replace official aircraft Pilot Operating Handbooks (POH), FAA weight &amp; balance, or certified dispatch releases. Always verify calculations with certified professional resources.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <p>© {new Date().getFullYear()} RunwayCalculator.dev. Open, private, and independent.</p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs">
              <Link href="/privacy" className="hover:text-slate-300 transition-colors text-slate-400">
                Privacy Policy
              </Link>
              <CookiePreferencesButton />
              <span className="flex items-center text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                Browser-only execution
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
