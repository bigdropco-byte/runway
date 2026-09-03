'use client';

import React from 'react';
import { Cookie } from 'lucide-react';

export default function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('open_cookie_settings'));
        }
      }}
      className="hover:text-slate-300 transition-colors flex items-center text-slate-400 text-xs"
    >
      <Cookie className="w-3.5 h-3.5 mr-1" />
      <span>Cookie Preferences</span>
    </button>
  );
}
