'use client';

import React, { useState } from 'react';
import { DollarSign, Shield, AlertTriangle, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';
import { calculateCashRunway, CashRunwayInputs } from '@/lib/financialTools';
import { formatCurrency } from '@/lib/runwayCalculator';

export default function CashRunwayCalculator() {
  const [inputs, setInputs] = useState<CashRunwayInputs>({
    cashBalance: 150_000,
    monthlyOperatingExpenses: 30_000,
    monthlyCashInflows: 12_000,
    emergencyBufferPercent: 20
  });

  const res = calculateCashRunway(inputs);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <DollarSign className="w-4 h-4 mr-1.5 text-indigo-600" />
            Cash Position &amp; Cash Flow Inputs
          </h3>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Available Liquid Cash Balance ($)
            </label>
            <div className="relative rounded-xl">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">$</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={inputs.cashBalance || ''}
                onChange={(e) => setInputs({ ...inputs, cashBalance: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-8 pr-4 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="e.g. 150000"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Gross Monthly Cash Outflows / Expenses ($)
            </label>
            <div className="relative rounded-xl">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">$</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={inputs.monthlyOperatingExpenses || ''}
                onChange={(e) => setInputs({ ...inputs, monthlyOperatingExpenses: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-8 pr-4 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="e.g. 30000"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Monthly Cash Inflows / Collections ($)
            </label>
            <div className="relative rounded-xl">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">$</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={inputs.monthlyCashInflows || ''}
                onChange={(e) => setInputs({ ...inputs, monthlyCashInflows: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-8 pr-4 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="e.g. 12000"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center">
                <Shield className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                Emergency Reserve Buffer ({inputs.emergencyBufferPercent}%)
              </label>
              <span className="text-xs text-slate-500 font-medium">
                {formatCurrency(res.emergencyBufferAmount)} set aside
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={inputs.emergencyBufferPercent}
              onChange={(e) => setInputs({ ...inputs, emergencyBufferPercent: parseInt(e.target.value, 10) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0% (No cushion)</span>
              <span>20% (Standard)</span>
              <span>50% (Conservative)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Results */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Cash Runway Status
            </span>
            <div className="flex items-baseline space-x-3">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                {res.netRunwayMonths === 'infinite' ? 'Sustainable' : `${res.netRunwayMonths} mo`}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {res.statusMessage}
            </p>

            <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-400">Net Monthly Burn:</span>
              <strong className="text-rose-400 font-bold">{formatCurrency(res.netMonthlyBurn)}/mo</strong>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <span className="text-[11px] font-semibold text-slate-500 block">Usable Cash Runway</span>
              <span className="text-xl font-bold text-slate-900 block mt-1">
                {res.usableRunwayMonths === 'infinite' ? 'Sustainable' : `${res.usableRunwayMonths} mo`}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Excluding {inputs.emergencyBufferPercent}% buffer</span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <span className="text-[11px] font-semibold text-slate-500 block">Zero-Revenue Runway</span>
              <span className="text-xl font-bold text-slate-900 block mt-1">
                {res.grossRunwayMonths} mo
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">If all revenue ceases</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
