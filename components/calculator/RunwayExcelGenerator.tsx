'use client';

import React, { useState } from 'react';
import { FileSpreadsheet, Download, Table, Check, Copy } from 'lucide-react';
import { generateRunwayCsv } from '@/lib/financialTools';
import { formatCurrency } from '@/lib/runwayCalculator';

export default function RunwayExcelGenerator() {
  const [cash, setCash] = useState(100_000);
  const [revenue, setRevenue] = useState(20_000);
  const [expenses, setExpenses] = useState(35_000);
  const [revGrowth, setRevGrowth] = useState(5);
  const [expGrowth, setExpGrowth] = useState(2);
  const [copiedFormula, setCopiedFormula] = useState(false);

  const handleDownloadCsv = () => {
    const csvContent = generateRunwayCsv(cash, revenue, expenses, revGrowth, expGrowth, 24);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `runway-calculator-model-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyFormula = (formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(true);
    setTimeout(() => setCopiedFormula(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Inputs */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <FileSpreadsheet className="w-4 h-4 mr-1.5 text-emerald-600" />
            Excel Financial Model Parameters
          </h3>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Starting Cash ($)
            </label>
            <input
              type="number"
              min="0"
              step="5000"
              value={cash}
              onChange={(e) => setCash(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-slate-200 py-2 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Monthly Revenue ($)
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={revenue}
                onChange={(e) => setRevenue(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 py-2 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
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
                value={expenses}
                onChange={(e) => setExpenses(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 py-2 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Rev Growth (%/mo)
              </label>
              <input
                type="number"
                step="0.5"
                value={revGrowth}
                onChange={(e) => setRevGrowth(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 py-2 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Exp Growth (%/mo)
              </label>
              <input
                type="number"
                step="0.5"
                value={expGrowth}
                onChange={(e) => setExpGrowth(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 py-2 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownloadCsv}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-colors mt-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Excel (.CSV) Model</span>
          </button>
        </div>

        {/* Right: Formulas & Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Native Excel / Google Sheets Formulas
              </span>
              <button
                type="button"
                onClick={() => handleCopyFormula('=B2/(B4-B3)')}
                className="text-xs text-indigo-300 hover:text-white flex items-center space-x-1"
              >
                {copiedFormula ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFormula ? 'Copied!' : 'Copy Formula'}</span>
              </button>
            </div>

            <div className="font-mono text-xs bg-slate-800 p-3 rounded-xl space-y-1.5 text-emerald-400 border border-slate-700">
              <div className="text-slate-400">// Cell B2: Cash | Cell B3: Revenue | Cell B4: Expenses</div>
              <div>=IF((B4-B3)&lt;=0, &quot;Sustainable&quot;, B2/(B4-B3))</div>
            </div>
            <p className="text-[11px] text-slate-400">
              Copy this formula directly into cell B5 in your Excel sheet to calculate static runway months.
            </p>
          </div>

          {/* Model Table Snapshot */}
          <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
            <div className="bg-slate-100 px-3 py-2 font-semibold text-slate-700 flex items-center justify-between border-b border-slate-200">
              <span className="flex items-center">
                <Table className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                Live Generated Model Preview (First 4 Months)
              </span>
              <span className="text-[11px] text-slate-500">24-month full export</span>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[11px] text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-2 px-3">Month</th>
                  <th className="py-2 px-3">Start Cash</th>
                  <th className="py-2 px-3">Revenue</th>
                  <th className="py-2 px-3">Expenses</th>
                  <th className="py-2 px-3">End Cash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[1, 2, 3, 4].map((m) => {
                  const mRev = revenue * Math.pow(1 + revGrowth / 100, m - 1);
                  const mExp = expenses * Math.pow(1 + expGrowth / 100, m - 1);
                  return (
                    <tr key={m} className="hover:bg-slate-50/60">
                      <td className="py-2 px-3 font-semibold text-slate-800">Month {m}</td>
                      <td className="py-2 px-3">{formatCurrency(cash - (m - 1) * (expenses - revenue))}</td>
                      <td className="py-2 px-3 text-emerald-700 font-medium">{formatCurrency(mRev)}</td>
                      <td className="py-2 px-3 text-rose-700 font-medium">{formatCurrency(mExp)}</td>
                      <td className="py-2 px-3 font-bold text-slate-900">{formatCurrency(cash - m * (expenses - revenue))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
