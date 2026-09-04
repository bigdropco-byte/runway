'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, X, Check, Settings2, Lock } from 'lucide-react';

export type CookieConsentChoice = 'all' | 'essential' | 'custom';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    // Check if user has already made a consent choice
    const saved = localStorage.getItem('runway_cookie_consent');
    if (!saved) {
      // Small timeout for smooth entrance
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }

    // Allow re-opening from footer or settings button
    const handleReopen = () => {
      setIsVisible(true);
      setShowPreferences(true);
    };
    window.addEventListener('open_cookie_settings', handleReopen);
    return () => window.removeEventListener('open_cookie_settings', handleReopen);
  }, []);

  const handleSaveConsent = (choice: CookieConsentChoice) => {
    const isAnalyticsAllowed = choice === 'all' || analyticsEnabled;
    localStorage.setItem(
      'runway_cookie_consent',
      JSON.stringify({
        choice,
        necessary: true,
        analytics: isAnalyticsAllowed,
        timestamp: new Date().toISOString()
      })
    );

    // Sync with Google Analytics 4 Consent Mode
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: isAnalyticsAllowed ? 'granted' : 'denied'
      });
    }

    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-lg z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-5 sm:p-6 shadow-2xl border border-slate-700/80 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">
                Global Privacy &amp; Cookie Notice
              </h3>
              <span className="text-[11px] text-emerald-400 font-medium flex items-center mt-0.5">
                <ShieldCheck className="w-3 h-3 mr-1" />
                GDPR &amp; CCPA Privacy Compliant
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleSaveConsent('essential')}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label="Close and accept essential only"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Text */}
        {!showPreferences ? (
          <p className="text-xs text-slate-300 leading-relaxed">
            We use strictly necessary cookies and browser local storage to save your calculator preferences and guarantee 100% client-side privacy. We do not sell your personal data or track financial numbers across third-party networks.
          </p>
        ) : (
          /* Granular Preferences Panel */
          <div className="space-y-3 pt-1 border-t border-slate-800 text-xs">
            {/* Strictly Necessary */}
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
              <div className="pr-2">
                <div className="flex items-center space-x-1.5 font-bold text-white">
                  <Lock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Strictly Necessary (Always Active)</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Maintains client-side calculator computations, session memory, and privacy preferences.
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 shrink-0">
                Required
              </span>
            </div>

            {/* Performance / Anonymous Analytics */}
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
              <div className="pr-2">
                <div className="flex items-center space-x-1.5 font-bold text-white">
                  <span>Anonymous Performance Metrics</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Helps us monitor server uptime and page load speed without user identification.
                </p>
              </div>
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                className="rounded border-slate-600 bg-slate-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                aria-label="Toggle anonymous performance metrics"
              />
            </div>
          </div>
        )}

        {/* Links & Buttons */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3 text-[11px] text-slate-400">
            <Link
              href="/privacy"
              className="hover:text-indigo-300 underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <button
              type="button"
              onClick={() => setShowPreferences(!showPreferences)}
              className="hover:text-indigo-300 underline underline-offset-2 transition-colors flex items-center"
            >
              <Settings2 className="w-3 h-3 mr-1" />
              {showPreferences ? 'Hide Options' : 'Preferences'}
            </button>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={() => handleSaveConsent('essential')}
              className="px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={() => handleSaveConsent('all')}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white transition-colors shadow-sm"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
