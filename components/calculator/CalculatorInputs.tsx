'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, DollarSign, Percent, Sparkles } from 'lucide-react';
import { RunwayInputs } from '@/lib/runwayCalculator';

interface CalculatorInputsProps {
  inputs: RunwayInputs;
  onChange: (inputs: RunwayInputs) => void;
  onPresetSelect?: (preset: RunwayInputs) => void;
}

export default function CalculatorInputs({ inputs, onChange, onPresetSelect }: CalculatorInputsProps) {
  const [showAdvanced, setShowAdvanced] = useState(
    Boolean(
      (inputs.revenueGrowthRate && inputs.revenueGrowthRate !== 0) ||
      (inputs.expenseGrowthRate && inputs.expenseGrowthRate !== 0) ||
      (inputs.oneTimeExpense && inputs.oneTimeExpense > 0) ||
      (inputs.additionalFunding && inputs.additionalFunding > 0)
    )
  );

  const handleFieldChange = (field: keyof RunwayInputs, value: number) => {
    onChange({
      ...inputs,
      [field]: isNaN(value) ? 0 : value
    });
  };

  const presets: { name: string; badge: string; data: RunwayInputs }[] = [
    {
      name: 'Seed Startup',
      badge: 'High Growth',
      data: {
        cashBalance: 500_000,
        monthlyRevenue: 15_000,
        monthlyExpenses: 50_000,
        revenueGrowthRate: 8,
        expenseGrowthRate: 3,
        oneTimeExpense: 0,
        additionalFunding: 0
      }
    },
    {
      name: 'Bootstrapped SaaS',
      badge: 'Lean Tech',
      data: {
        cashBalance: 120_000,
        monthlyRevenue: 25_000,
        monthlyExpenses: 35_000,
        revenueGrowthRate: 5,
        expenseGrowthRate: 1,
        oneTimeExpense: 0,
        additionalFunding: 0
      }
    },
    {
      name: 'Agency / Studio',
      badge: 'Services',
      data: {
        cashBalance: 160_000,
        monthlyRevenue: 60_000,
        monthlyExpenses: 75_000,
        revenueGrowthRate: 2,
        expenseGrowthRate: 1,
        oneTimeExpense: 0,
        additionalFunding: 0
      }
    },
    {
      name: 'Freelancer',
      badge: 'Solo',
      data: {
        cashBalance: 25_000,
        monthlyRevenue: 6_000,
        monthlyExpenses: 4_500,
        revenueGrowthRate: 0,
        expenseGrowthRate: 0,
        oneTimeExpense: 0,
        additionalFunding: 0
      }
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7 space-y-6">
      {/* Quick preset pills */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-500" />
            Quick Presets
          </label>
          <span className="text-[11px] text-slate-400">Click to test scenario</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => {
                if (onPresetSelect) {
                  onPresetSelect(preset.data);
                } else {
                  onChange(preset.data);
                }
              }}
              className="text-left px-3 py-2 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all focus:outline-none focus:ring-1 focus:ring-indigo-500 group"
            >
              <div className="text-xs font-semibold text-slate-800 group-hover:text-indigo-700 truncate">
                {preset.name}
              </div>
              <div className="text-[10px] text-slate-400">{preset.badge}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-5 space-y-5">
        {/* Current Cash Balance */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="cashBalance" className="text-sm font-semibold text-slate-800 flex items-center">
              Current Available Cash
              <span className="group relative ml-1.5 cursor-pointer text-slate-400 hover:text-slate-600">
                <HelpCircle className="w-3.5 h-3.5" />
                <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden w-48 rounded bg-slate-800 p-2 text-[11px] text-white shadow-md group-hover:block z-20">
                  Total liquid cash balance in business bank accounts, money market funds, and short-term deposits.
                </span>
              </span>
            </label>
            <span className="text-xs font-medium text-slate-400">Liquid reserves</span>
          </div>
          <div className="relative rounded-xl shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <DollarSign className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="number"
              id="cashBalance"
              name="cashBalance"
              min="0"
              step="1000"
              value={inputs.cashBalance === 0 ? '' : inputs.cashBalance}
              onChange={(e) => handleFieldChange('cashBalance', parseFloat(e.target.value))}
              placeholder="e.g. 100000"
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-9 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Monthly Revenue & Monthly Expenses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Monthly Revenue */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="monthlyRevenue" className="text-sm font-semibold text-slate-800 flex items-center">
                Monthly Revenue
                <span className="group relative ml-1.5 cursor-pointer text-slate-400 hover:text-slate-600">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden w-48 rounded bg-slate-800 p-2 text-[11px] text-white shadow-md group-hover:block z-20">
                    Actual average monthly cash receipts from customer invoices, subscriptions (MRR), or sales.
                  </span>
                </span>
              </label>
            </div>
            <div className="relative rounded-xl shadow-xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <DollarSign className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="number"
                id="monthlyRevenue"
                name="monthlyRevenue"
                min="0"
                step="500"
                value={inputs.monthlyRevenue === 0 ? '' : inputs.monthlyRevenue}
                onChange={(e) => handleFieldChange('monthlyRevenue', parseFloat(e.target.value))}
                placeholder="e.g. 20000"
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-9 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Monthly Expenses (Gross Burn) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="monthlyExpenses" className="text-sm font-semibold text-slate-800 flex items-center">
                Monthly Expenses
                <span className="group relative ml-1.5 cursor-pointer text-slate-400 hover:text-slate-600">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden w-48 rounded bg-slate-800 p-2 text-[11px] text-white shadow-md group-hover:block z-20">
                    Total monthly operating costs (Gross Burn): payroll, contractor fees, cloud servers, software, rent, and overhead.
                  </span>
                </span>
              </label>
              <span className="text-[11px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Gross Burn</span>
            </div>
            <div className="relative rounded-xl shadow-xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <DollarSign className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="number"
                id="monthlyExpenses"
                name="monthlyExpenses"
                min="0"
                step="500"
                value={inputs.monthlyExpenses === 0 ? '' : inputs.monthlyExpenses}
                onChange={(e) => handleFieldChange('monthlyExpenses', parseFloat(e.target.value))}
                placeholder="e.g. 35000"
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-9 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </div>

        {/* Expandable Advanced Growth & Timing Inputs */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors focus:outline-none"
          >
            <span className="flex items-center space-x-2">
              <span>Growth Rates & One-Time Events</span>
              {(inputs.revenueGrowthRate || inputs.expenseGrowthRate || inputs.oneTimeExpense || inputs.additionalFunding) ? (
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
              ) : null}
            </span>
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {showAdvanced && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-4 animate-in fade-in duration-200">
              {/* Growth Rates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="revenueGrowthRate" className="text-xs font-semibold text-slate-700 flex items-center mb-1">
                    Monthly Revenue Growth
                    <span className="group relative ml-1.5 cursor-pointer text-slate-400 hover:text-slate-600">
                      <HelpCircle className="w-3 h-3" />
                      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden w-44 rounded bg-slate-800 p-2 text-[10px] text-white shadow-md group-hover:block z-20">
                        Compounded month-over-month increase in recurring revenue.
                      </span>
                    </span>
                  </label>
                  <div className="relative rounded-lg shadow-xs">
                    <input
                      type="number"
                      id="revenueGrowthRate"
                      name="revenueGrowthRate"
                      step="0.5"
                      value={inputs.revenueGrowthRate ?? 0}
                      onChange={(e) => handleFieldChange('revenueGrowthRate', parseFloat(e.target.value))}
                      className="block w-full rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <Percent className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="expenseGrowthRate" className="text-xs font-semibold text-slate-700 flex items-center mb-1">
                    Monthly Expense Growth
                    <span className="group relative ml-1.5 cursor-pointer text-slate-400 hover:text-slate-600">
                      <HelpCircle className="w-3 h-3" />
                      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden w-44 rounded bg-slate-800 p-2 text-[10px] text-white shadow-md group-hover:block z-20">
                        Monthly cost inflation or hiring pace compounding over time.
                      </span>
                    </span>
                  </label>
                  <div className="relative rounded-lg shadow-xs">
                    <input
                      type="number"
                      id="expenseGrowthRate"
                      name="expenseGrowthRate"
                      step="0.5"
                      value={inputs.expenseGrowthRate ?? 0}
                      onChange={(e) => handleFieldChange('expenseGrowthRate', parseFloat(e.target.value))}
                      className="block w-full rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <Percent className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* One-Time Expense & Month */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label htmlFor="oneTimeExpense" className="text-xs font-semibold text-slate-700 flex items-center mb-1">
                    One-Time Upcoming Expense
                  </label>
                  <div className="relative rounded-lg shadow-xs">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
                      <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <input
                      type="number"
                      id="oneTimeExpense"
                      name="oneTimeExpense"
                      min="0"
                      step="1000"
                      value={inputs.oneTimeExpense || ''}
                      onChange={(e) => handleFieldChange('oneTimeExpense', parseFloat(e.target.value))}
                      placeholder="e.g. 10000 (tax, audit, legal)"
                      className="block w-full rounded-lg border border-slate-200 bg-white py-2 pl-8 pr-3 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="oneTimeExpenseMonth" className="text-xs font-semibold text-slate-700 flex items-center mb-1">
                    Occurs in Month
                  </label>
                  <select
                    id="oneTimeExpenseMonth"
                    name="oneTimeExpenseMonth"
                    value={inputs.oneTimeExpenseMonth || 1}
                    onChange={(e) => handleFieldChange('oneTimeExpenseMonth', parseInt(e.target.value, 10))}
                    className="block w-full rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value={1}>Month 1 (Immediate)</option>
                    <option value={2}>Month 2</option>
                    <option value={3}>Month 3</option>
                    <option value={6}>Month 6</option>
                    <option value={12}>Month 12</option>
                  </select>
                </div>
              </div>

              {/* Additional Funding Cushion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label htmlFor="additionalFunding" className="text-xs font-semibold text-slate-700 flex items-center mb-1">
                    Additional Funding Cushion
                  </label>
                  <div className="relative rounded-lg shadow-xs">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
                      <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <input
                      type="number"
                      id="additionalFunding"
                      name="additionalFunding"
                      min="0"
                      step="5000"
                      value={inputs.additionalFunding || ''}
                      onChange={(e) => handleFieldChange('additionalFunding', parseFloat(e.target.value))}
                      placeholder="e.g. 50000 (SAFE, loan, grant)"
                      className="block w-full rounded-lg border border-slate-200 bg-white py-2 pl-8 pr-3 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="additionalFundingMonth" className="text-xs font-semibold text-slate-700 flex items-center mb-1">
                    Arrives in Month
                  </label>
                  <select
                    id="additionalFundingMonth"
                    name="additionalFundingMonth"
                    value={inputs.additionalFundingMonth || 1}
                    onChange={(e) => handleFieldChange('additionalFundingMonth', parseInt(e.target.value, 10))}
                    className="block w-full rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value={1}>Month 1</option>
                    <option value={2}>Month 2</option>
                    <option value={3}>Month 3</option>
                    <option value={6}>Month 6</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
