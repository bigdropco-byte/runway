'use client';

import React, { useState } from 'react';
import { Target, TrendingDown, TrendingUp, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';
import { calculateRunwayExtension, ExtensionInputs } from '@/lib/financialTools';
import { formatCurrency } from '@/lib/runwayCalculator';

export default function RunwayExtensionCalculator() {
  const [inputs, setInputs] = useState<ExtensionInputs>({
    currentCash: 120_000,
    monthlyRevenue: 15_000,
    monthlyExpenses: 30_000,
    targetRunwayMonths: 18
  });

  const res = calculateRunwayExtension(inputs);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-5 space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <Target className="w-4 h-4 mr-1.5 text-indigo-600" />
            Target Runway Parameters
          </h3>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Current Available Cash ($)
            </label>
            <div className="relative rounded-xl">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">$</span>
              <input
                type="number"
                min="0"
                step="5000"
                value={inputs.currentCash || ''}
                onChange={(e) => setInputs({ ...inputs, currentCash: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-8 pr-4 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="e.g. 120000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
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

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Monthly Expenses ($)
              </label>
              <div className="relative rounded-xl">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">$</span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={inputs.monthlyExpenses || ''}
                  onChange={(e) => setInputs({ ...inputs, monthlyExpenses: parseFloat(e.target.value) || 0 })}
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-8 pr-4 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="e.g. 30000"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Target Runway Goal: <strong className="text-indigo-600">{inputs.targetRunwayMonths} months</strong>
              </label>
            </div>
            <input
              type="range"
              min="3"
              max="36"
              step="1"
              value={inputs.targetRunwayMonths}
              onChange={(e) => setInputs({ ...inputs, targetRunwayMonths: parseInt(e.target.value, 10) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>6 mo (Short)</span>
              <span>18 mo (Standard Seed)</span>
              <span>36 mo (Defensive)</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Actionable Levers */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-md flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Current vs. Target Runway</span>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-2xl font-bold text-slate-300">
                  {typeof res.currentRunwayMonths === 'number' ? `${res.currentRunwayMonths} mo` : 'Sustainable'}
                </span>
                <ArrowRight className="w-5 h-5 text-indigo-400" />
                <span className="text-3xl font-extrabold text-emerald-400">
                  {inputs.targetRunwayMonths} months
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Max Allowed Net Burn</span>
              <span className="text-lg font-bold text-white">
                {formatCurrency(res.targetNetBurnAllowed)}/mo
              </span>
            </div>
          </div>

          {res.alreadyMeetsTarget ? (
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-950 flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <strong className="font-bold block">Runway Goal Already Met!</strong>
                <p className="text-xs text-emerald-800">
                  Your current cash trajectory already supports at least {inputs.targetRunwayMonths} months of operation.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Choose 1 of 3 Independent Levers to Reach {inputs.targetRunwayMonths} Months:
              </h4>

              {/* Lever 1: Expense Reduction */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-indigo-300 transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 flex items-center">
                    <TrendingDown className="w-4 h-4 mr-1 text-emerald-600" />
                    Lever 1: Cut Monthly Expenses
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
                    -{res.requiredExpenseReductionPercent}%
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Reduce monthly outlays by <strong className="text-slate-900">{formatCurrency(res.requiredMonthlyExpenseReduction)}/mo</strong> (new expenses: {formatCurrency(inputs.monthlyExpenses - res.requiredMonthlyExpenseReduction)}/mo).
                </p>
              </div>

              {/* Lever 2: Revenue Expansion */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-indigo-300 transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1 text-indigo-600" />
                    Lever 2: Expand Monthly Revenue
                  </span>
                  <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-xs font-bold">
                    +{res.requiredRevenueIncreasePercent}%
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Grow monthly sales by <strong className="text-slate-900">+{formatCurrency(res.requiredMonthlyRevenueIncrease)}/mo</strong> (new revenue: {formatCurrency(inputs.monthlyRevenue + res.requiredMonthlyRevenueIncrease)}/mo).
                </p>
              </div>

              {/* Lever 3: Capital Infusion */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-indigo-300 transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-amber-600" />
                    Lever 3: Secure Bridge Funding
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-bold">
                    +{formatCurrency(res.requiredCapitalInfusion)}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Raise or inject <strong className="text-slate-900">{formatCurrency(res.requiredCapitalInfusion)}</strong> in capital without changing current burn rates.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
