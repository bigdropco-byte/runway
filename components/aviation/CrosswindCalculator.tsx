'use client';

import React, { useState } from 'react';
import { Wind, Compass, AlertTriangle, ShieldCheck, ArrowUp } from 'lucide-react';
import { calculateCrosswind, CrosswindInputs } from '@/lib/aviationCalculator';

export default function CrosswindCalculator() {
  const [inputs, setInputs] = useState<CrosswindInputs>({
    runwayHeading: 90,
    windDirection: 120,
    windSpeedKnots: 20,
    windGustKnots: 28
  });

  const res = calculateCrosswind(inputs);

  // SVG Compass visualization angles
  const rwyAngle = inputs.runwayHeading;
  const windAngle = inputs.windDirection;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <Wind className="w-4 h-4 mr-1.5 text-indigo-600" />
            Runway &amp; Wind Vector Inputs
          </h3>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Runway Magnetic Heading: <strong className="text-indigo-600">{inputs.runwayHeading}°</strong> (Runway {String(Math.round(inputs.runwayHeading / 10) || 36).padStart(2, '0')})
              </label>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="5"
              value={inputs.runwayHeading}
              onChange={(e) => setInputs({ ...inputs, runwayHeading: parseInt(e.target.value, 10) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Wind Direction (From): <strong className="text-indigo-600">{inputs.windDirection}°</strong>
              </label>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="5"
              value={inputs.windDirection}
              onChange={(e) => setInputs({ ...inputs, windDirection: parseInt(e.target.value, 10) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Wind Speed (Knots)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputs.windSpeedKnots}
                onChange={(e) => setInputs({ ...inputs, windSpeedKnots: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Gust Speed (Knots) — Optional
              </label>
              <input
                type="number"
                min="0"
                max="120"
                value={inputs.windGustKnots || ''}
                onChange={(e) => setInputs({ ...inputs, windGustKnots: parseFloat(e.target.value) || undefined })}
                placeholder="e.g. 28"
                className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Quick presets */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
              Quick Aircraft Max Demo Limits
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">Cessna 172: 15 kts</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">Piper Archer: 17 kts</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">Baron 58: 22 kts</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">Boeing 737: 33 kts</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Compass & Results */}
        <div className="lg:col-span-6 space-y-4">
          {/* Visual Compass Graphic */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-center relative select-none">
            <svg viewBox="0 0 200 200" className="w-48 h-48">
              {/* Outer compass ring */}
              <circle cx="100" cy="100" r="90" fill="none" stroke="#334155" strokeWidth="2" />
              <text x="100" y="22" textAnchor="middle" fontSize="10" fill="#94a3b8" fontWeight="bold">N</text>
              <text x="180" y="103" textAnchor="middle" fontSize="10" fill="#94a3b8" fontWeight="bold">E</text>
              <text x="100" y="185" textAnchor="middle" fontSize="10" fill="#94a3b8" fontWeight="bold">S</text>
              <text x="22" y="103" textAnchor="middle" fontSize="10" fill="#94a3b8" fontWeight="bold">W</text>

              {/* Runway centerline line */}
              <g transform={`rotate(${rwyAngle}, 100, 100)`}>
                <line x1="100" y1="20" x2="100" y2="180" stroke="#cbd5e1" strokeWidth="12" strokeLinecap="round" />
                <line x1="100" y1="25" x2="100" y2="175" stroke="#0f172a" strokeWidth="2" strokeDasharray="6 6" />
                <circle cx="100" cy="30" r="3" fill="#38bdf8" />
              </g>

              {/* Wind Vector Arrow */}
              <g transform={`rotate(${windAngle}, 100, 100)`}>
                <line x1="100" y1="10" x2="100" y2="80" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow)" />
                <polygon points="96,75 104,75 100,90" fill="#f43f5e" />
              </g>

              <circle cx="100" cy="100" r="4" fill="#6366f1" />
            </svg>
            <div className="absolute bottom-2 right-3 text-[10px] text-slate-400">
              <span className="text-slate-200">Gray:</span> Runway | <span className="text-rose-400">Red:</span> Wind
            </div>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <span className="text-[11px] font-semibold text-slate-500 block">Crosswind Component</span>
              <span className="text-2xl font-extrabold text-slate-900 block mt-0.5">
                {res.crosswindKnots} kts
              </span>
              <span className="text-xs text-indigo-600 font-semibold mt-0.5 block">
                From {res.crosswindDirection} ({res.angleDegrees}° angle)
              </span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <span className="text-[11px] font-semibold text-slate-500 block">
                {res.isTailwind ? 'Tailwind Component' : 'Headwind Component'}
              </span>
              <span className={`text-2xl font-extrabold block mt-0.5 ${res.isTailwind ? 'text-rose-600' : 'text-emerald-700'}`}>
                {res.headwindKnots} kts
              </span>
              <span className="text-xs text-slate-500 mt-0.5 block">
                {res.isTailwind ? 'Extends rollout' : 'Aids deceleration'}
              </span>
            </div>
          </div>

          {/* Safety Advisory Banner */}
          <div
            className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start space-x-2.5 ${
              res.safetyAdvisory.level === 'danger'
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : res.safetyAdvisory.level === 'caution'
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            {res.safetyAdvisory.level === 'danger' ? (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            ) : res.safetyAdvisory.level === 'caution' ? (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div>
              <strong className="font-bold block mb-0.5">Safety Advisory:</strong>
              <span>{res.safetyAdvisory.message}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
