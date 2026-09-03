'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, ChevronDown, Menu, X, ArrowUpRight, ShieldCheck, Plane, DollarSign, FileSpreadsheet, Flame, Users, HeartPulse, PieChart } from 'lucide-react';
import { ALL_NICHES } from '@/lib/niches';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const [aviationDropdownOpen, setAviationDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:bg-indigo-700 transition-colors">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-tight">
                Runway<span className="text-indigo-600">Calculator</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider hidden sm:block">
                Financial &amp; Aviation Runway Suite
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <Link href="/#calculator" className="hover:text-indigo-600 transition-colors">
              Calculator
            </Link>

            {/* Financial Tools dropdown */}
            <div className="relative" onMouseLeave={() => setBusinessDropdownOpen(false)}>
              <button
                type="button"
                onClick={() => setBusinessDropdownOpen(!businessDropdownOpen)}
                onMouseEnter={() => setBusinessDropdownOpen(true)}
                className="flex items-center space-x-1 hover:text-indigo-600 transition-colors py-2 focus:outline-none"
                aria-expanded={businessDropdownOpen}
              >
                <span>Financial Tools</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {businessDropdownOpen && (
                <div 
                  className="absolute left-0 mt-1 w-80 rounded-xl bg-white shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => setBusinessDropdownOpen(true)}
                  onMouseLeave={() => setBusinessDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Core Financial Calculators
                  </div>
                  <div className="space-y-0.5">
                    <Link
                      href="/tools/startup-runway-calculator"
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span>Startup Runway Calculator</span>
                      <span className="text-[10px] text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded">Venture</span>
                    </Link>
                    <Link
                      href="/tools/hiring-runway-calculator"
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span>Hiring &amp; Headcount Burn</span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">New</span>
                    </Link>
                    <Link
                      href="/tools/default-alive-calculator"
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span>Default Alive / Dead (PG)</span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">New</span>
                    </Link>
                    <Link
                      href="/tools/safe-dilution-runway-calculator"
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span>SAFE &amp; Dilution Calculator</span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">New</span>
                    </Link>
                    <Link
                      href="/tools/cash-runway-calculator"
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span>Cash Runway &amp; Buffer</span>
                    </Link>
                    <Link
                      href="/tools/burn-rate-calculator"
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span>Burn Rate &amp; Multiple</span>
                    </Link>
                    <Link
                      href="/tools/runway-calculator-excel"
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span>Excel Model &amp; CSV Template</span>
                    </Link>
                    <Link
                      href="/tools/runway-extension-calculator"
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span>Runway Extension Solver</span>
                    </Link>
                  </div>
                  <div className="mt-1.5 pt-1.5 border-t border-slate-100">
                    <Link
                      href="/tools"
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      <span>View All 10 Industry Niches</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Aviation Tools dropdown */}
            <div className="relative" onMouseLeave={() => setAviationDropdownOpen(false)}>
              <button
                type="button"
                onClick={() => setAviationDropdownOpen(!aviationDropdownOpen)}
                onMouseEnter={() => setAviationDropdownOpen(true)}
                className="flex items-center space-x-1 hover:text-indigo-600 transition-colors py-2 focus:outline-none"
                aria-expanded={aviationDropdownOpen}
              >
                <Plane className="w-3.5 h-3.5 mr-0.5 text-slate-500" />
                <span>Aviation</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {aviationDropdownOpen && (
                <div 
                  className="absolute left-0 mt-1 w-72 rounded-xl bg-white shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => setAviationDropdownOpen(true)}
                  onMouseLeave={() => setAviationDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Pilot &amp; Airport Flight Tools
                  </div>
                  <div className="space-y-0.5">
                    <Link
                      href="/aviation/crosswind-calculator"
                      onClick={() => setAviationDropdownOpen(false)}
                      className="flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span>Crosswind &amp; Wind Component</span>
                    </Link>
                    <Link
                      href="/aviation/runway-slope-calculator"
                      onClick={() => setAviationDropdownOpen(false)}
                      className="flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span>Runway Slope Gradient</span>
                    </Link>
                    <Link
                      href="/aviation/runway-number-calculator"
                      onClick={() => setAviationDropdownOpen(false)}
                      className="flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span>Runway Number &amp; Reciprocal</span>
                    </Link>
                    <Link
                      href="/aviation/runway-length-calculator"
                      onClick={() => setAviationDropdownOpen(false)}
                      className="flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span>Density Altitude &amp; Length</span>
                    </Link>
                    <Link
                      href="/aviation/runway-visual-range-calculator"
                      onClick={() => setAviationDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span>Runway Visual Range (RVR)</span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">New</span>
                    </Link>
                    <Link
                      href="/aviation/contaminated-runway-calculator"
                      onClick={() => setAviationDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <span>Contaminated Runway (TALPA)</span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">New</span>
                    </Link>
                  </div>
                  <div className="mt-1.5 pt-1.5 border-t border-slate-100">
                    <Link
                      href="/aviation"
                      onClick={() => setAviationDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      <span>Aviation Hub Overview</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/#how-it-works" className="hover:text-indigo-600 transition-colors">
              Formulas
            </Link>
          </nav>

          {/* Privacy badge & Primary CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              <span>100% Client-Side Privacy</span>
            </div>
            <Link
              href="/#calculator"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Calculate Runway
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 text-sm max-h-[85vh] overflow-y-auto">
          <Link
            href="/#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50"
          >
            Cash Runway Calculator
          </Link>
          <div className="pt-2 border-t border-slate-100">
            <span className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Financial Tools
            </span>
            <Link
              href="/tools/startup-runway-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Startup Runway Calculator
            </Link>
            <Link
              href="/tools/hiring-runway-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Hiring &amp; Headcount Burn
            </Link>
            <Link
              href="/tools/default-alive-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Default Alive vs Dead (PG)
            </Link>
            <Link
              href="/tools/safe-dilution-runway-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-50"
            >
              SAFE &amp; Dilution Calculator
            </Link>
            <Link
              href="/tools/cash-runway-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Cash Runway &amp; Buffer
            </Link>
            <Link
              href="/tools/burn-rate-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Burn Rate Calculator
            </Link>
            <Link
              href="/tools/runway-calculator-excel"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Excel Model &amp; CSV Template
            </Link>
          </div>
          <div className="pt-2 border-t border-slate-100">
            <span className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Aviation Tools
            </span>
            <Link
              href="/aviation/crosswind-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Runway Crosswind Calculator
            </Link>
            <Link
              href="/aviation/runway-slope-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Runway Slope Calculator
            </Link>
            <Link
              href="/aviation/runway-number-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Runway Number Calculator
            </Link>
            <Link
              href="/aviation/runway-length-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Runway Length Calculator
            </Link>
            <Link
              href="/aviation/runway-visual-range-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Runway Visual Range (RVR)
            </Link>
            <Link
              href="/aviation/contaminated-runway-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Contaminated Runway (TALPA)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
