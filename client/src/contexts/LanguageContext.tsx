// CME Website – Language Context
// Provides language switching functionality and translation access

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Lang, translations, Translations } from '@/lib/i18n';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('de');

  const value: LanguageContextType = {
    lang,
    setLang,
    t: translations[lang] as Translations,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
