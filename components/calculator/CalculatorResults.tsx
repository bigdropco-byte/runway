'use client';

import React from 'react';
import { 
  Flame, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Clock, 
  TrendingDown 
} from 'lucide-react';
import { RunwayMetrics, formatCurrency } from '@/lib/runwayCalculator';
import { useTranslation } from '@/i18n/useTranslation';
import { formatLocalizedCurrency } from '@/lib/format-utils';

interface CalculatorResultsProps {
  metrics: RunwayMetrics;
  startingCash: number;
}

export default function CalculatorResults({ metrics, startingCash }: CalculatorResultsProps) {
  const { locale, t } = useTranslation();
  const isInfinite = metrics.runwayMonths === 'infinite';

  // Format currency localized helper
  const fc = (amount: number) => formatLocalizedCurrency(amount, locale || 'en', 'USD');

  // Determine theme based on status
  let statusBadgeColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  let statusIcon = <Clock className="w-4 h-4 text-indigo-600" />;
  let statusLabel = t('calculator.results.heading');

  if (metrics.runwayStatus === 'profitable' || metrics.runwayStatus === 'zero-burn') {
    statusBadgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    statusIcon = <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    statusLabel = metrics.isBreakEven ? t('calculator.results.breakEvenStatus') : t('calculator.results.profitableStatus');
  } else if (metrics.runwayStatus === 'critical') {
    statusBadgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
    statusIcon = <AlertTriangle className="w-4 h-4 text-rose-600" />;
    statusLabel = t('calculator.results.criticalAlert');
  } else if (metrics.runwayStatus === 'moderate') {
    statusBadgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
    statusIcon = <AlertTriangle className="w-4 h-4 text-amber-600" />;
    statusLabel = t('calculator.results.moderateAlert');
  } else if (metrics.runwayStatus === 'zero-cash') {
    statusBadgeColor = 'bg-slate-100 text-slate-700 border-slate-300';
    statusIcon = <HelpCircle className="w-4 h-4 text-slate-500" />;
    statusLabel = t('calculator.results.zeroCash');
  }

  // Localized runway display
  let runwayDisplay = metrics.runwayMonthsFormatted;
  if (isInfinite) {
    runwayDisplay = t('calculator.results.sustainable');
  } else if (metrics.runwayMonths === 0) {
    runwayDisplay = t('calculator.results.zeroCash');
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7 space-y-6">
      {/* Primary Hero Result Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 text-white shadow-md">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            {t('calculator.results.estimatedRunway')}
          </span>
          <div className={`inline-flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusBadgeColor} bg-white/10 backdrop-blur-xs text-white border-white/20`}>
            {statusIcon}
            <span>{statusLabel}</span>
          </div>
        </div>

        {/* Big Runway Value */}
        <div className="flex items-baseline space-x-3 mb-2">
          <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            {runwayDisplay}
          </span>
        </div>

        {/* Narrative Context */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
          {metrics.statusMessage}
        </p>

        {/* Depletion Date Banner */}
        <div className="mt-4 pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-300">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>{t('calculator.results.projectedDepletionDate')}:</span>
            <strong className="text-white font-semibold">{metrics.depletionDateFormatted}</strong>
          </div>
          {metrics.netBurn > 0 && (
            <div className="flex items-center space-x-1 text-slate-300">
              <span>{t('calculator.results.netMonthlyBurn')}:</span>
              <strong className="text-rose-400 font-semibold">{fc(metrics.netBurn)}/mo</strong>
            </div>
          )}
        </div>
      </div>

      {/* Burn Rate & Cash Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Net Monthly Burn */}
        <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500">{t('calculator.results.netMonthlyBurn')}</span>
            <Flame className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-slate-900">
            {metrics.netBurn <= 0 ? '$0' : fc(metrics.netBurn)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Expenses − Revenue
          </div>
        </div>

        {/* Gross Monthly Burn */}
        <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500">{t('calculator.results.grossMonthlyBurn')}</span>
            <TrendingDown className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-slate-900">
            {fc(metrics.grossBurn)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Total monthly outlays
          </div>
        </div>

        {/* Current Cash */}
        <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500">{t('calculator.inputs.cashBalance')}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-slate-900">
            {fc(startingCash)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Liquid reserves balance
          </div>
        </div>
      </div>

      {/* Break-Even Analysis */}
      <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <div className="font-semibold text-indigo-950 flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
            {t('calculator.results.breakEvenStatus')}
          </div>
          <div className="text-slate-600 text-[11px] mt-0.5">
            Monthly sales required to eliminate cash burn entirely: <strong className="text-slate-900">{fc(metrics.requiredBreakEvenRevenue)}/month</strong>
          </div>
        </div>
        {metrics.breakEvenRevenueGap > 0 ? (
          <div className="shrink-0 bg-white px-3 py-1.5 rounded-lg border border-indigo-200 text-indigo-700 font-semibold text-xs text-right">
            {t('calculator.results.gapToBreakEven')}: +{fc(metrics.breakEvenRevenueGap)}/mo
          </div>
        ) : (
          <div className="shrink-0 bg-emerald-100 px-3 py-1.5 rounded-lg text-emerald-800 font-semibold text-xs">
            {t('calculator.results.profitableStatus')}
          </div>
        )}
      </div>

      {/* Cash Milestones: +3, +6, +12 Months */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Projected Cash Remaining
          </div>
          <span className="text-[11px] text-slate-600">Based on trajectory</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/40">
            <span className="text-[11px] font-semibold text-slate-600 block">After 3 Months</span>
            <span className={`text-sm sm:text-base font-bold block mt-1 ${metrics.cashAt3Months <= 0 ? 'text-rose-700' : 'text-slate-900'}`}>
              {fc(metrics.cashAt3Months)}
            </span>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/40">
            <span className="text-[11px] font-semibold text-slate-600 block">After 6 Months</span>
            <span className={`text-sm sm:text-base font-bold block mt-1 ${metrics.cashAt6Months <= 0 ? 'text-rose-700' : 'text-slate-900'}`}>
              {fc(metrics.cashAt6Months)}
            </span>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/40">
            <span className="text-[11px] font-semibold text-slate-600 block">After 12 Months</span>
            <span className={`text-sm sm:text-base font-bold block mt-1 ${metrics.cashAt12Months <= 0 ? 'text-rose-700' : 'text-slate-900'}`}>
              {fc(metrics.cashAt12Months)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
