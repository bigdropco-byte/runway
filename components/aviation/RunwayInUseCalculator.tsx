'use client';

import React, { useState } from 'react';
import { Compass, Wind, Plane, CheckCircle2, AlertTriangle, ArrowRight, Info } from 'lucide-react';
import { calculateRunwayInUse, RunwayInUseInputs } from '@/lib/aviationCalculator';

const AIRPORT_PRESETS: { name: string; runways: number[] }[] = [
  { name: 'Cross Runways (09/27 & 18/36)', runways: [90, 180] },
  { name: 'Diagonal Runways (04/22 & 13/31)', runways: [40, 130] },
  { name: 'Major Hub (09/27, 18/36, 04/22)', runways: [90, 180, 40] },
  { name: 'Single Strip (08/26)', runways: [80] }
];

export default function RunwayInUseCalculator() {
  const [inputs, setInputs] = useState<RunwayInUseInputs>({
    windDirection: 260,
    windSpeedKnots: 16,
    runwayHeadings: [90, 180]
  });

  const res = calculateRunwayInUse(inputs);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <Wind className="w-4 h-4 mr-1.5 text-indigo-600" />
            Reported Surface Wind &amp; Airport Runways
          </h3>

          {/* Wind Direction Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Wind Direction: <strong className="text-indigo-600">{inputs.windDirection}° Magnetic</strong>
              </label>
            </div>
            <input
              type="range"
              min="1"
              max="360"
              step="5"
              value={inputs.windDirection}
              onChange={(e) => setInputs({ ...inputs, windDirection: parseInt(e.target.value, 10) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>090° (E)</span>
              <span>180° (S)</span>
              <span>270° (W)</span>
              <span>360° (N)</span>
            </div>
          </div>

          {/* Wind Speed Input */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Wind Speed (Knots)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={inputs.windSpeedKnots}
              onChange={(e) => setInputs({ ...inputs, windSpeedKnots: parseFloat(e.target.value) || 0 })}
              className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Runway Configuration Presets */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Select Airport Runway Layout
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AIRPORT_PRESETS.map((p) => {
                const isSelected = JSON.stringify(inputs.runwayHeadings) === JSON.stringify(p.runways);
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setInputs({ ...inputs, runwayHeadings: p.runways })}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-1 ring-indigo-500'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <strong className="text-slate-900 block font-semibold flex items-center">
              <Info className="w-3.5 h-3.5 mr-1 text-indigo-600" />
              How Air Traffic Control (ATC) Selects Runway in Use:
            </strong>
            <p>
              Aircraft always take off and land into the wind to minimize ground rollout distance. The runway end providing the maximum headwind component and lowest crosswind is selected as the primary active runway in use.
            </p>
          </div>
        </div>

        {/* Right Column: Visual Active Runway Verdict */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Recommended Active Runway
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                Runway in Use
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-black tracking-tight text-emerald-400">
              {res.activeRunway.runwayName}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {res.explanation}
            </p>

            <div className="pt-3 border-t border-slate-700/80 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white/5 rounded-xl">
                <span className="text-slate-400 block">Headwind Component:</span>
                <strong className="text-emerald-400 text-base font-bold">
                  {res.activeRunway.headwindKnots} kts
                </strong>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <span className="text-slate-400 block">Crosswind Component:</span>
                <strong className="text-white text-base font-bold">
                  {res.activeRunway.crosswindKnots} kts {res.activeRunway.crosswindDirection}
                </strong>
              </div>
            </div>
          </div>

          {/* All Evaluated Runways Table */}
          <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
            <div className="p-3 bg-slate-50 font-bold text-slate-700 border-b border-slate-200 flex justify-between items-center">
              <span>All Evaluated Runway Approaches</span>
              <span className="text-[10px] text-slate-500 uppercase font-medium">Ranked by Suitability</span>
            </div>
            <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto">
              {res.allRunwaysEvaluated.map((rwy, idx) => (
                <div
                  key={rwy.runwayName}
                  className={`p-3 flex items-center justify-between ${
                    idx === 0 ? 'bg-emerald-50/50 font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="text-slate-900 block font-semibold">{rwy.runwayName}</span>
                    <span className="text-[11px] text-slate-500">
                      Crosswind: {rwy.crosswindKnots} kts ({rwy.crosswindDirection})
                    </span>
                  </div>
                  <div className="text-right">
                    {rwy.isTailwind ? (
                      <span className="text-rose-600 font-bold block">
                        {rwy.headwindKnots} kts Tailwind ⚠️
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-bold block">
                        +{rwy.headwindKnots} kts Headwind
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400">Score: {rwy.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
