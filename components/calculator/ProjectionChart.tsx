'use client';

import React, { useState } from 'react';
import { MonthlyProjectionPoint, formatCurrency, formatRunway } from '@/lib/runwayCalculator';
import { LineChart as LineChartIcon, Info } from 'lucide-react';

interface ProjectionChartProps {
  projections: MonthlyProjectionPoint[];
  startingCash: number;
  runwayMonths: number | 'infinite';
}

export default function ProjectionChart({
  projections,
  startingCash,
  runwayMonths
}: ProjectionChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!projections || projections.length === 0) {
    return null;
  }

  // Slice chart to display up to 24 months
  const chartData = projections.slice(0, 24);

  // Chart dimensions
  const width = 760;
  const height = 300;
  const padding = { top: 30, right: 30, bottom: 40, left: 65 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Find max cash value to scale Y axis
  const maxCash = Math.max(
    startingCash * 1.05,
    ...chartData.map((d) => d.endingCash),
    10_000
  );

  // Scalers
  const getX = (index: number) => {
    return padding.left + (index / (chartData.length - 1)) * innerWidth;
  };

  const getY = (val: number) => {
    const clamped = Math.max(0, Math.min(val, maxCash));
    return padding.top + innerHeight - (clamped / maxCash) * innerHeight;
  };

  // Build SVG Path
  const points = chartData.map((d, i) => `${getX(i)},${getY(d.endingCash)}`);
  const linePath = `M ${points.join(' L ')}`;
  const areaPath = `${linePath} L ${getX(chartData.length - 1)},${getY(0)} L ${getX(0)},${getY(0)} Z`;

  // Grid tick lines for Y-axis (4 levels)
  const yTicks = [0, maxCash * 0.33, maxCash * 0.66, maxCash];

  const hoveredPoint = hoveredIndex !== null ? chartData[hoveredIndex] : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center">
            <LineChartIcon className="w-4 h-4 mr-2 text-indigo-600" />
            Projected Cash Trajectory (24-Month Horizon)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time projection showing monthly cash reserves over time.
          </p>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-0.5 bg-indigo-600 rounded-full" />
            <span className="text-slate-600 font-medium">Cash Balance</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-0.5 bg-rose-400 border-dashed border-t border-rose-500" />
            <span className="text-slate-600 font-medium">Zero Cash Threshold</span>
          </div>
        </div>
      </div>

      {/* Responsive SVG Chart Container */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none"
          role="img"
          aria-label="Projected Cash Trajectory Line Chart"
        >
          <defs>
            <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Background Grid Lines & Y-Labels */}
          {yTicks.map((tick, i) => {
            const yPos = getY(tick);
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={yPos}
                  x2={width - padding.right}
                  y2={yPos}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 10}
                  y={yPos + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#94a3b8"
                  fontWeight="500"
                >
                  {formatCurrency(tick, true)}
                </text>
              </g>
            );
          })}

          {/* Zero Line (highlighted) */}
          <line
            x1={padding.left}
            y1={getY(0)}
            x2={width - padding.right}
            y2={getY(0)}
            stroke="#f43f5e"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Area Fill */}
          <path d={areaPath} fill="url(#cashGradient)" />

          {/* Trajectory Stroke */}
          <path
            d={linePath}
            fill="none"
            stroke="#4f46e5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {chartData.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.endingCash);
            const isHovered = hoveredIndex === i;
            return (
              <g key={i} className="cursor-pointer">
                {/* Invisible wide hover target */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="12"
                  fill="transparent"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? '5' : '3'}
                  fill={d.endingCash <= 0 ? '#f43f5e' : '#4f46e5'}
                  stroke="#ffffff"
                  strokeWidth={isHovered ? '2' : '1.5'}
                  className="transition-all duration-150"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            );
          })}

          {/* Month X-Axis Labels (every 3 months) */}
          {chartData.map((d, i) => {
            if (i % 3 === 0 || i === chartData.length - 1) {
              const xPos = getX(i);
              return (
                <text
                  key={i}
                  x={xPos}
                  y={height - padding.bottom + 20}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#64748b"
                  fontWeight="500"
                >
                  M{d.month}
                </text>
              );
            }
            return null;
          })}
        </svg>

        {/* Hover Tooltip Box */}
        {hoveredPoint && (
          <div
            className="absolute top-3 right-3 bg-slate-900/95 backdrop-blur-xs text-white p-3 rounded-xl shadow-lg border border-slate-700 text-xs pointer-events-none transition-all duration-150 animate-in fade-in"
          >
            <div className="font-semibold text-slate-200 border-b border-slate-700/80 pb-1 mb-1.5 flex items-center justify-between gap-3">
              <span>Month {hoveredPoint.month}</span>
              <span className="text-slate-400 font-normal">{hoveredPoint.dateLabel}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Cash Balance:</span>
                <span className={`font-bold ${hoveredPoint.endingCash <= 0 ? 'text-rose-400' : 'text-white'}`}>
                  {formatCurrency(hoveredPoint.endingCash)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Net Flow:</span>
                <span className={`font-medium ${hoveredPoint.netCashFlow >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {hoveredPoint.netCashFlow >= 0 ? '+' : ''}{formatCurrency(hoveredPoint.netCashFlow)}
                </span>
              </div>
              <div className="flex justify-between gap-4 text-[11px] text-slate-400">
                <span>Rev / Exp:</span>
                <span>{formatCurrency(hoveredPoint.revenue, true)} / {formatCurrency(hoveredPoint.expenses, true)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>
          Hover or tap any month marker to inspect exact projected cash balance, revenue, and burn for that period.
        </span>
      </div>
    </div>
  );
}
