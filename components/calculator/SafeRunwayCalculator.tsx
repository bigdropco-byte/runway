'use client';

import React, { useState } from 'react';
import { PieChart, DollarSign, Target, Percent, ArrowRight, ShieldCheck } from 'lucide-react';
import { calculateSafeRunway, SafeRunwayInputs } from '@/lib/advancedFinancialTools';
import { formatCurrency } from '@/lib/runwayCalculator';

export default function SafeRunwayCalculator() {
  const [inputs, setInputs] = useState<SafeRunwayInputs>({
    currentCash: 100_000,
    monthlyNetBurn: 20_000,
    targetRunwayMonths: 18,
    valuationCap: 5_000_000
  });

  const res = calculateSafeRunway(inputs);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <PieChart className="w-4 h-4 mr-1.5 text-indigo-600" />
            Fundraising &amp; Valuation Parameters
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Current Cash ($)
              </label>
              <input
                type="number"
                min="0"
                step="5000"
                value={inputs.currentCash}
                onChange={(e) => setInputs({ ...inputs, currentCash: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Net Monthly Burn ($)
              </label>
              <input
                type="number"
                min="1000"
                step="1000"
                value={inputs.monthlyNetBurn}
                onChange={(e) => setInputs({ ...inputs, monthlyNetBurn: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Target Runway Months: <strong className="text-indigo-600">{inputs.targetRunwayMonths} months</strong>
              </label>
            </div>
            <input
              type="range"
              min="6"
              max="36"
              step="1"
              value={inputs.targetRunwayMonths}
              onChange={(e) => setInputs({ ...inputs, targetRunwayMonths: parseInt(e.target.value, 10) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Post-Money SAFE Valuation Cap ($)
            </label>
            <input
              type="number"
              min="500000"
              step="250000"
              value={inputs.valuationCap}
              onChange={(e) => setInputs({ ...inputs, valuationCap: parseFloat(e.target.value) || 0 })}
              className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. 5000000"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Standard Y Combinator Post-Money SAFE valuation cap.
            </p>
          </div>
        </div>

        {/* Right Column: Visual Results */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Recommended SAFE Raise
            </span>
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                {formatCurrency(res.recommendedRaiseAmount)}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Includes {formatCurrency(res.capitalNeededForTarget)} core capital + 15% contingency buffer to secure {inputs.targetRunwayMonths} months.
            </p>

            <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Extended Runway:</span>
              <strong className="text-white font-bold">{res.newTotalRunwayMonths} months</strong>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <span className="text-[11px] font-semibold text-slate-500 block">Founder Dilution</span>
              <span className="text-2xl font-extrabold text-rose-600 block mt-0.5">
                {res.founderDilutionPercent}%
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Equity given to SAFE investors</span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <span className="text-[11px] font-semibold text-slate-500 block">Remaining Ownership</span>
              <span className="text-2xl font-extrabold text-emerald-700 block mt-0.5">
                {res.founderOwnershipRemainingPercent}%
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Retained by founding team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
