// CME Website – Language Context
// Die Sprache ergibt sich aus der URL, nicht aus dem Zustand einer Komponente.

import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { useLocation } from 'wouter';
import { Lang, translations, Translations } from '@/lib/i18n';
import { langFromPath, localizePath } from '@shared/routes';

/**
 * Warum die URL und nicht useState
 *
 * Vorher hielt dieser Provider die Sprache in useState('de'). Die englischen
 * URLs wurden clientseitig auf die deutschen umgeleitet und dabei die Sprache
 * umgeschaltet. Folgen:
 *   - /en/manufacturing war keine eigene Adresse, sondern eine Weiterleitung.
 *     Google indexiert Weiterleitungsziele, nicht Weiterleitungen – die 23
 *     englischen Seiten der sitemap.xml konnten nie in den Index kommen.
 *   - Ohne JavaScript gab es gar keine englische Fassung. KI-Crawler fuehren
 *     kein JavaScript aus.
 *   - Ein Neuladen oder ein geteilter Link fiel auf Deutsch zurueck, weil die
 *     Sprache nur im Speicher stand.
 *
 * Jetzt ist der Pfad die Quelle: /en/... ist Englisch, alles andere Deutsch.
 * Der Umschalter navigiert auf die Entsprechung, statt Zustand zu setzen.
 */

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const lang = langFromPath(location) as Lang;

  const setLang = useCallback(
    (next: Lang) => {
      const target = localizePath(location, next);
      if (target !== location) setLocation(target);
    },
    [location, setLocation]
  );

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
