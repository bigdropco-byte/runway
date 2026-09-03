import React from 'react';
import { BookOpen, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export default function CalculatorMethodology() {
  return (
    <section id="methodology" className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center space-x-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider">
        <BookOpen className="w-4 h-4" />
        <span>Financial Calculation Methodology & Transparency</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
        How the Runway Calculator Works: Mathematical Model & Assumptions
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
            <h4 className="font-bold text-slate-900 mb-1">1. Static Cash Runway Formula</h4>
            <p className="text-xs mb-2">
              For businesses with steady revenue and predictable overhead, runway is determined by dividing liquid cash reserves by net monthly cash deficit:
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs">
              Runway (months) = Available Cash ÷ Net Monthly Burn
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
            <h4 className="font-bold text-slate-900 mb-1">2. Gross Burn vs. Net Burn</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <strong>Gross Burn:</strong> Total cash disbursed each month (payroll, contractors, hosting, rent, utilities).
              </li>
              <li>
                <strong>Net Burn:</strong> Gross monthly expenses minus total monthly cash revenue collections.
              </li>
              <li>
                <strong>Break-Even:</strong> When Net Burn $\le$ $0$, cash runway is mathematically sustainable or infinite.
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
            <h4 className="font-bold text-slate-900 mb-1">3. Dynamic Growth Projections & Interpolation</h4>
            <p className="text-xs mb-2">
              When revenue growth or expense inflation rates are enabled, the engine calculates month-by-month compound flows up to 60 months:
            </p>
            <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-mono text-[11px] space-y-1">
              <div>Ending Cash(m) = Beginning Cash(m) + Revenue(m) - Expenses(m)</div>
              <div>Fractional Month = Beginning Cash(depletion) ÷ Monthly Net Burn</div>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              We linearly interpolate the exact day/fraction when cash reaches $0, avoiding arbitrary rounded whole months.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              4. Client-Side Privacy Guarantee
            </h4>
            <p className="text-xs text-slate-600 leading-normal">
              Every financial computation executes exclusively inside your local browser runtime. No financial balances, revenue figures, or payroll numbers are sent to any remote server or database.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
