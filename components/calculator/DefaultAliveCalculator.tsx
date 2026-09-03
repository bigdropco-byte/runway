'use client';

import React, { useState } from 'react';
import { HeartPulse, CheckCircle2, AlertOctagon, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { calculateDefaultAlive, DefaultAliveInputs } from '@/lib/advancedFinancialTools';
import { formatCurrency } from '@/lib/runwayCalculator';

export default function DefaultAliveCalculator() {
  const [inputs, setInputs] = useState<DefaultAliveInputs>({
    cashBalance: 180_000,
    monthlyRevenue: 15_000,
    monthlyExpenses: 32_000,
    monthlyRevenueGrowthRate: 8,
    monthlyExpenseGrowthRate: 1
  });

  const res = calculateDefaultAlive(inputs);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <HeartPulse className="w-4 h-4 mr-1.5 text-indigo-600" />
            Default Alive Financial Inputs
          </h3>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Current Cash Balance ($)
            </label>
            <input
              type="number"
              min="0"
              step="5000"
              value={inputs.cashBalance}
              onChange={(e) => setInputs({ ...inputs, cashBalance: parseFloat(e.target.value) || 0 })}
              className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Monthly Revenue ($)
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={inputs.monthlyRevenue}
                onChange={(e) => setInputs({ ...inputs, monthlyRevenue: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Monthly Expenses ($)
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={inputs.monthlyExpenses}
                onChange={(e) => setInputs({ ...inputs, monthlyExpenses: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Monthly Revenue Growth (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={inputs.monthlyRevenueGrowthRate}
                onChange={(e) => setInputs({ ...inputs, monthlyRevenueGrowthRate: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Monthly Expense Growth (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={inputs.monthlyExpenseGrowthRate}
                onChange={(e) => setInputs({ ...inputs, monthlyExpenseGrowthRate: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Visual Verdict */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className={`p-6 rounded-2xl border text-white shadow-md space-y-3 ${
              res.isDefaultAlive
                ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 border-emerald-800'
                : 'bg-gradient-to-br from-rose-950 via-slate-900 to-rose-900 border-rose-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Paul Graham Framework Verdict
              </span>
              <div
                className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  res.isDefaultAlive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}
              >
                {res.isDefaultAlive ? (
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                ) : (
                  <AlertOctagon className="w-3.5 h-3.5 mr-1 text-rose-400" />
                )}
                <span>{res.statusHeadline}</span>
              </div>
            </div>

            <div className="text-3xl sm:text-4xl font-black tracking-tight">
              {res.isDefaultAlive ? 'Default Alive' : 'Default Dead'}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {res.explanation}
            </p>

            <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">
                  {res.isDefaultAlive ? 'Profitability Crossover:' : 'Cash Depleted Around:'}
                </span>
                <strong className="text-white font-bold">
                  {res.isDefaultAlive ? `Month ${res.crossoverMonth}` : `Month ${res.depletionMonth}`}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block">Lowest Cash Trough:</span>
                <strong className={res.isDefaultAlive ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {formatCurrency(res.lowestCashTrough)}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
