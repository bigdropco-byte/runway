'use client';

import React, { useState } from 'react';
import { Users, Plus, Trash2, ArrowRight, DollarSign, Clock, AlertTriangle } from 'lucide-react';
import { calculateHiringRunway, HireRole, HiringRunwayInputs } from '@/lib/advancedFinancialTools';
import { formatCurrency } from '@/lib/runwayCalculator';

const INITIAL_HIRES: HireRole[] = [
  { id: '1', title: 'Senior Software Engineer', count: 2, annualSalary: 140_000, benefitsMultiplier: 1.25 },
  { id: '2', title: 'Account Executive (Sales)', count: 1, annualSalary: 90_000, benefitsMultiplier: 1.20 }
];

export default function HiringRunwayCalculator() {
  const [cashBalance, setCashBalance] = useState(450_000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(25_000);
  const [currentMonthlyExpenses, setCurrentMonthlyExpenses] = useState(55_000);
  const [hires, setHires] = useState<HireRole[]>(INITIAL_HIRES);

  const res = calculateHiringRunway({
    cashBalance,
    monthlyRevenue,
    currentMonthlyExpenses,
    hires
  });

  const handleAddHire = () => {
    const newHire: HireRole = {
      id: Date.now().toString(),
      title: 'New Team Member',
      count: 1,
      annualSalary: 100_000,
      benefitsMultiplier: 1.25
    };
    setHires([...hires, newHire]);
  };

  const handleRemoveHire = (id: string) => {
    setHires(hires.filter((h) => h.id !== id));
  };

  const handleUpdateHire = (id: string, field: keyof HireRole, value: any) => {
    setHires(hires.map((h) => (h.id === id ? { ...h, [field]: value } : h)));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs & Headcount Builder */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Cash Balance</label>
              <input
                type="number"
                min="0"
                step="10000"
                value={cashBalance}
                onChange={(e) => setCashBalance(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 py-2 px-3 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Monthly Revenue</label>
              <input
                type="number"
                min="0"
                step="1000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 py-2 px-3 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Current Expenses</label>
              <input
                type="number"
                min="0"
                step="1000"
                value={currentMonthlyExpenses}
                onChange={(e) => setCurrentMonthlyExpenses(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 py-2 px-3 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Headcount Roster */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center">
                <Users className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                Planned New Hires Roster
              </h4>
              <button
                type="button"
                onClick={handleAddHire}
                className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="w-3.5 h-3.5 mr-0.5" />
                Add Role
              </button>
            </div>

            <div className="space-y-2.5">
              {hires.map((hire) => (
                <div
                  key={hire.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-wrap sm:flex-nowrap items-center gap-3"
                >
                  <div className="flex-1 min-w-[140px]">
                    <span className="text-[10px] text-slate-500 block">Job Title</span>
                    <input
                      type="text"
                      value={hire.title}
                      onChange={(e) => handleUpdateHire(hire.id, 'title', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 text-xs font-semibold text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="w-16">
                    <span className="text-[10px] text-slate-500 block">Headcount</span>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={hire.count}
                      onChange={(e) => handleUpdateHire(hire.id, 'count', parseInt(e.target.value, 10) || 1)}
                      className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 text-xs font-semibold text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="w-28">
                    <span className="text-[10px] text-slate-500 block">Annual Base ($)</span>
                    <input
                      type="number"
                      step="5000"
                      value={hire.annualSalary}
                      onChange={(e) => handleUpdateHire(hire.id, 'annualSalary', parseFloat(e.target.value) || 0)}
                      className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 text-xs font-semibold text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="w-20">
                    <span className="text-[10px] text-slate-500 block">Taxes/Perks</span>
                    <select
                      value={hire.benefitsMultiplier}
                      onChange={(e) => handleUpdateHire(hire.id, 'benefitsMultiplier', parseFloat(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-lg py-1 px-1.5 text-xs font-medium text-slate-900 focus:outline-none"
                    >
                      <option value={1.15}>+15%</option>
                      <option value={1.20}>+20%</option>
                      <option value={1.25}>+25%</option>
                      <option value={1.30}>+30%</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveHire(hire.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors shrink-0"
                    title="Remove Role"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Runway Impact Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Runway Impact Analysis
            </span>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-xs text-slate-400 block">Before Hires</span>
                <span className="text-2xl font-bold text-slate-300">
                  {typeof res.baselineRunwayMonths === 'number' ? `${res.baselineRunwayMonths} mo` : 'Sustainable'}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-indigo-400" />
              <div>
                <span className="text-xs text-slate-400 block">After Hires</span>
                <span className="text-3xl font-extrabold text-amber-400">
                  {typeof res.newRunwayMonths === 'number' ? `${res.newRunwayMonths} mo` : 'Sustainable'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-white/10 rounded-xl text-xs text-slate-200 flex items-center justify-between border border-white/10">
              <span>Runway Shortened By:</span>
              <strong className="text-rose-400 font-bold">-{res.runwayReductionMonths} months</strong>
            </div>

            <div className="pt-2 border-t border-slate-700/80 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Added Monthly Burn:</span>
                <strong className="text-white">+{formatCurrency(res.addedMonthlyBurn)}/mo</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Annual Loaded Cost:</span>
                <strong className="text-white">{formatCurrency(res.totalAnnualHiringCost)}/yr</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>New Net Monthly Burn:</span>
                <strong className="text-rose-400 font-bold">{formatCurrency(res.newNetBurn)}/mo</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
