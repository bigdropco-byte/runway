'use client';

import React, { useState } from 'react';
import { Flame, TrendingUp, DollarSign, Award, ArrowRight } from 'lucide-react';
import { calculateBurnRate, BurnRateInputs } from '@/lib/financialTools';
import { formatCurrency } from '@/lib/runwayCalculator';

export default function BurnRateCalculator() {
  const [inputs, setInputs] = useState<BurnRateInputs>({
    cashBalance: 250_000,
    grossMonthlyExpenses: 45_000,
    monthlyRevenue: 15_000,
    netNewARR: 180_000
  });

  const res = calculateBurnRate(inputs);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <Flame className="w-4 h-4 mr-1.5 text-rose-600" />
            Burn Rate &amp; Efficiency Inputs
          </h3>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Current Cash Balance ($)
            </label>
            <div className="relative rounded-xl">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">$</span>
              <input
                type="number"
                min="0"
                step="5000"
                value={inputs.cashBalance || ''}
                onChange={(e) => setInputs({ ...inputs, cashBalance: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-8 pr-4 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="e.g. 250000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Gross Monthly Expenses ($)
              </label>
              <div className="relative rounded-xl">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">$</span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={inputs.grossMonthlyExpenses || ''}
                  onChange={(e) => setInputs({ ...inputs, grossMonthlyExpenses: parseFloat(e.target.value) || 0 })}
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-8 pr-4 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="e.g. 45000"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Monthly Revenue ($)
              </label>
              <div className="relative rounded-xl">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">$</span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={inputs.monthlyRevenue || ''}
                  onChange={(e) => setInputs({ ...inputs, monthlyRevenue: parseFloat(e.target.value) || 0 })}
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-8 pr-4 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="e.g. 15000"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Annual Net New ARR ($) — Optional for Burn Multiple
            </label>
            <div className="relative rounded-xl">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">$</span>
              <input
                type="number"
                min="0"
                step="10000"
                value={inputs.netNewARR || ''}
                onChange={(e) => setInputs({ ...inputs, netNewARR: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-8 pr-4 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="e.g. 180000 (New ARR added over last 12 mo)"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Used by top venture funds (Bessemer/Craft) to benchmark capital efficiency ($Net Burn ÷ Net New ARR$).
            </p>
          </div>
        </div>

        {/* Right Column: Visual Results */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950">
              <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider block">Net Monthly Burn</span>
              <span className="text-2xl sm:text-3xl font-extrabold block mt-1">
                {res.netBurnRate <= 0 ? '$0' : formatCurrency(res.netBurnRate)}
              </span>
              <span className="text-[11px] text-rose-600 mt-0.5 block">Cash drained per month</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Gross Monthly Burn</span>
              <span className="text-2xl sm:text-3xl font-extrabold block mt-1">
                {formatCurrency(res.grossBurnRate)}
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Total monthly expenses</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-md space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold uppercase tracking-wider">Cash Burn Velocity</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-medium">
                {res.monthlyBurnPercentage}% cash / month
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-xs text-slate-400 block">Implied Runway</span>
                <span className="text-3xl font-extrabold text-white">
                  {res.runwayMonths === 'infinite' ? 'Sustainable' : `${res.runwayMonths} months`}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Annualized Net Burn</span>
                <span className="text-lg font-bold text-rose-400">
                  {formatCurrency(res.annualizedNetBurn)}/yr
                </span>
              </div>
            </div>
          </div>

          {res.burnMultiple !== undefined && (
            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-950 flex items-center">
                  <Award className="w-4 h-4 mr-1 text-indigo-600" />
                  SaaS Burn Multiple: {res.burnMultiple}x
                </span>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  You spend ${res.burnMultiple} to generate $1.00 of new ARR.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-white border border-indigo-200 text-xs font-bold text-indigo-700 shadow-2xs">
                Rating: {res.burnMultipleRating}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
