'use client';

import React, { useState } from 'react';
import { Compass, ArrowRightLeft, CheckCircle2, Info } from 'lucide-react';
import { calculateRunwayNumber, RunwayNumberInputs } from '@/lib/aviationCalculator';

export default function RunwayNumberCalculator() {
  const [inputs, setInputs] = useState<RunwayNumberInputs>({
    magneticHeading: 88,
    parallelDesignation: 'L'
  });

  const res = calculateRunwayNumber(inputs);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <Compass className="w-4 h-4 mr-1.5 text-indigo-600" />
            Magnetic Heading &amp; Parallel Inputs
          </h3>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Runway Magnetic Centerline Heading: <strong className="text-indigo-600">{inputs.magneticHeading}°</strong>
              </label>
            </div>
            <input
              type="range"
              min="1"
              max="360"
              step="1"
              value={inputs.magneticHeading}
              onChange={(e) => setInputs({ ...inputs, magneticHeading: parseInt(e.target.value, 10) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Parallel Runway Identifier (Optional)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['None', 'L', 'C', 'R'] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setInputs({ ...inputs, parallelDesignation: opt })}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    inputs.parallelDesignation === opt
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt === 'None' ? 'Single' : opt}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <strong className="text-slate-900 block font-semibold flex items-center">
              <Info className="w-3.5 h-3.5 mr-1 text-indigo-600" />
              FAA / ICAO Numbering Methodology:
            </strong>
            <p>
              Runways are designated according to their magnetic heading rounded to the nearest 10 degrees, with the trailing zero dropped. A runway with a heading of 088° becomes Runway 09.
            </p>
            <p>
              The opposite end (reciprocal) is exactly 180° opposite. Runway 09’s reciprocal is Runway 27 (268° rounded to 270°).
            </p>
          </div>
        </div>

        {/* Right Column: Visual Runway Strip */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-md space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Runway Designation Pair
            </span>

            {/* Visual Runway Pill */}
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center justify-between">
              <div className="text-center">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">Approach Heading {inputs.magneticHeading}°</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                  {res.runwayNumber}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-slate-500">
                <div className="h-0.5 w-12 bg-slate-600 border-dashed border-t border-slate-400" />
                <ArrowRightLeft className="w-4 h-4 text-indigo-400" />
                <div className="h-0.5 w-12 bg-slate-600 border-dashed border-t border-slate-400" />
              </div>

              <div className="text-center">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">Reciprocal {res.reciprocalHeading}°</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-mono">
                  {res.reciprocalRunwayNumber}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                <span className="text-slate-400 block">Primary Heading:</span>
                <strong className="text-white font-mono">{inputs.magneticHeading}° Mag (rnd: {res.roundedHeading}°)</strong>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                <span className="text-slate-400 block">Reciprocal Heading:</span>
                <strong className="text-white font-mono">{res.reciprocalHeading}° Magnetic</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
