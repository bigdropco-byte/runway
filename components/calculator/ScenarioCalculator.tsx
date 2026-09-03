'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  Check, 
  SlidersHorizontal 
} from 'lucide-react';
import { 
  RunwayInputs, 
  RunwayMetrics, 
  ScenarioResults, 
  calculateScenarios,
  formatCurrency 
} from '@/lib/runwayCalculator';

interface ScenarioCalculatorProps {
  inputs: RunwayInputs;
  baseMetrics: RunwayMetrics;
  onApplyScenario?: (updatedInputs: Partial<RunwayInputs>) => void;
}

export default function ScenarioCalculator({
  inputs,
  baseMetrics,
  onApplyScenario
}: ScenarioCalculatorProps) {
  const [activeTab, setActiveTab] = useState<'expenses' | 'revenue' | 'funding'>('expenses');
  const scenarios: ScenarioResults = calculateScenarios(inputs, baseMetrics);

  const handleApply = (category: 'expense_reduction' | 'revenue_increase' | 'funding', value: number) => {
    if (!onApplyScenario) return;
    if (category === 'expense_reduction') {
      onApplyScenario({
        monthlyExpenses: Math.round(inputs.monthlyExpenses * (1 - value / 100))
      });
    } else if (category === 'revenue_increase') {
      onApplyScenario({
        monthlyRevenue: Math.round(inputs.monthlyRevenue * (1 + value / 100))
      });
    } else if (category === 'funding') {
      onApplyScenario({
        cashBalance: inputs.cashBalance + value
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <SlidersHorizontal className="w-4 h-4 mr-2 text-indigo-600" />
            “What If?” Scenario Modeling
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Test how cutting burn, expanding sales, or raising capital extends your survival timeline.
          </p>
        </div>

        {/* Tab pills */}
        <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl text-xs font-medium self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('expenses')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'expenses'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cut Expenses
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('revenue')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'revenue'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Boost Revenue
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('funding')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'funding'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Add Capital
          </button>
        </div>
      </div>

      {/* Scenario Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {activeTab === 'expenses' &&
          scenarios.expenseReductions.map((item, idx) => {
            const pct = [5, 10, 20][idx];
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-800 flex items-center">
                      <TrendingDown className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      {item.title}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100/70 text-emerald-800">
                      {item.deltaFormatted}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-200/60">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400">Runway:</span>
                    <div className="flex items-center space-x-1.5 font-bold">
                      <span className="text-slate-500 line-through">
                        {typeof baseMetrics.runwayMonths === 'number' ? `${baseMetrics.runwayMonths.toFixed(1)} mo` : 'Sustainable'}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span className="text-indigo-600 font-extrabold">{item.newRunwayFormatted}</span>
                    </div>
                  </div>
                  {onApplyScenario && (
                    <button
                      type="button"
                      onClick={() => handleApply('expense_reduction', pct)}
                      className="w-full text-center py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-indigo-50 hover:border-indigo-400 text-[11px] font-semibold text-slate-700 hover:text-indigo-700 transition-colors"
                    >
                      Apply Scenario
                    </button>
                  )}
                </div>
              </div>
            );
          })}

        {activeTab === 'revenue' &&
          scenarios.revenueIncreases.map((item, idx) => {
            const pct = [10, 25, 50][idx];
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-800 flex items-center">
                      <TrendingUp className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      {item.title}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100/70 text-emerald-800">
                      {item.deltaFormatted}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-200/60">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400">Runway:</span>
                    <div className="flex items-center space-x-1.5 font-bold">
                      <span className="text-slate-500 line-through">
                        {typeof baseMetrics.runwayMonths === 'number' ? `${baseMetrics.runwayMonths.toFixed(1)} mo` : 'Sustainable'}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span className="text-indigo-600 font-extrabold">{item.newRunwayFormatted}</span>
                    </div>
                  </div>
                  {onApplyScenario && (
                    <button
                      type="button"
                      onClick={() => handleApply('revenue_increase', pct)}
                      className="w-full text-center py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-indigo-50 hover:border-indigo-400 text-[11px] font-semibold text-slate-700 hover:text-indigo-700 transition-colors"
                    >
                      Apply Scenario
                    </button>
                  )}
                </div>
              </div>
            );
          })}

        {activeTab === 'funding' &&
          scenarios.fundingAdditions.map((item, idx) => {
            const amount = [25_000, 50_000, 100_000][idx];
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-800 flex items-center">
                      <DollarSign className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                      {item.title}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                      {item.deltaFormatted}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-200/60">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400">Runway:</span>
                    <div className="flex items-center space-x-1.5 font-bold">
                      <span className="text-slate-500 line-through">
                        {typeof baseMetrics.runwayMonths === 'number' ? `${baseMetrics.runwayMonths.toFixed(1)} mo` : 'Sustainable'}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span className="text-indigo-600 font-extrabold">{item.newRunwayFormatted}</span>
                    </div>
                  </div>
                  {onApplyScenario && (
                    <button
                      type="button"
                      onClick={() => handleApply('funding', amount)}
                      className="w-full text-center py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-indigo-50 hover:border-indigo-400 text-[11px] font-semibold text-slate-700 hover:text-indigo-700 transition-colors"
                    >
                      Apply Scenario
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
