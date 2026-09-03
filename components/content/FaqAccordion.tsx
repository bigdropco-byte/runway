'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  title?: string;
  description?: string;
}

export default function FaqAccordion({
  faqs,
  title = 'Frequently Asked Questions',
  description = 'Everything you need to know about cash runway, burn rates, and financial planning.'
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div id="faq" className="space-y-6 scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>

      <div className="max-w-3xl mx-auto divide-y divide-slate-200 rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="group">
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full text-left py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30 animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
