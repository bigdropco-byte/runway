'use client';

import React, { useEffect } from 'react';

interface DirectionProviderProps {
  children: React.ReactNode;
  dir: 'ltr' | 'rtl';
  lang: string;
}

export default function DirectionProvider({ children, dir, lang }: DirectionProviderProps) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = dir;
      document.documentElement.lang = lang;
    }
  }, [dir, lang]);

  return <>{children}</>;
}
