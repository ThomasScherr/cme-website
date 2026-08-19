import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

/* ── Consent Categories ──────────────────────────────────────────── */
export interface ConsentState {
  necessary: true;        // always true, cannot be toggled
  analytics: boolean;     // GA4, GTM
  marketing: boolean;     // Google Ads, Leadinfo
  chat: boolean;          // Crisp Live-Chat
}

export type ConsentCategory = keyof ConsentState;

interface ConsentContextValue {
  consent: ConsentState | null;       // null = not yet decided
  hasDecided: boolean;
  acceptAll: () => void;
  acceptNecessaryOnly: () => void;
  acceptChatOnly: () => void;         // only necessary + chat
  acceptCustom: (analytics: boolean, marketing: boolean, chat: boolean) => void;
  resetConsent: () => void;           // re-open banner
  showBanner: boolean;
  showSettings: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

const STORAGE_KEY = 'cme-cookie-consent';
const CONSENT_VERSION = '2';  // bumped: added chat category

const ConsentContext = createContext<ConsentContextValue | null>(null);

/* ── Helper: read persisted consent ─────────────────────────────── */
function readStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== CONSENT_VERSION) return null;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      chat: !!parsed.chat,
    };
  } catch {
    return null;
  }
}

function persistConsent(state: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    version: CONSENT_VERSION,
    analytics: state.analytics,
    marketing: state.marketing,
    chat: state.chat,
    timestamp: new Date().toISOString(),
  }));
}

/* ── Provider ────────────────────────────────────────────────────── */
export function ConsentProvider({ children }: { children: ReactNode }) {
  /*
   * Der Anfangszustand darf NICHT aus dem Speicher gelesen werden.
   *
   * Seit dem Vorrendern gibt es zwei Durchlaeufe: einen auf dem Server beim
   * Bauen und einen im Browser beim Hydratisieren. Der Server kennt kein
   * localStorage, dort kam immer null heraus - also stand der Banner in allen
   * 55 vorgerenderten Seiten. Wer schon einmal entschieden hatte, bekam im
   * Browser dagegen einen Baum ohne Banner. React fand an dieser Stelle etwas
   * anderes vor als erwartet und uebernahm die Knoten aus dem HTML nicht: der
   * Banner blieb sichtbar, gehoerte aber keiner Komponente mehr. Kein Knopf
   * reagierte, und weggehen konnte er auch nicht.
   *
   * Deshalb starten Server und Browser jetzt gleich - ohne Entscheidung und
   * ohne Banner. Gelesen wird erst nach dem Hydratisieren.
   */
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setConsent(readStoredConsent());
    setHydrated(true);
  }, []);

  const hasDecided = consent !== null;
  // Vor dem Hydratisieren wissen wir nichts - dann zeigen wir auch nichts.
  const showBanner = hydrated && !hasDecided;

  const applyConsent = useCallback((state: ConsentState) => {
    setConsent(state);
    persistConsent(state);
    setShowSettings(false);
    // Dispatch custom event so tracking scripts can react
    window.dispatchEvent(new CustomEvent('consent-updated', { detail: state }));
  }, []);

  const acceptAll = useCallback(() => {
    applyConsent({ necessary: true, analytics: true, marketing: true, chat: true });
  }, [applyConsent]);

  const acceptNecessaryOnly = useCallback(() => {
    applyConsent({ necessary: true, analytics: false, marketing: false, chat: false });
  }, [applyConsent]);

  const acceptChatOnly = useCallback(() => {
    applyConsent({ necessary: true, analytics: false, marketing: false, chat: true });
  }, [applyConsent]);

  const acceptCustom = useCallback((analytics: boolean, marketing: boolean, chat: boolean) => {
    applyConsent({ necessary: true, analytics, marketing, chat });
  }, [applyConsent]);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setConsent(null);
    setShowSettings(false);
    window.dispatchEvent(new CustomEvent('consent-updated', { detail: null }));
  }, []);

  const openSettings = useCallback(() => setShowSettings(true), []);
  const closeSettings = useCallback(() => setShowSettings(false), []);

  return (
    <ConsentContext.Provider value={{
      consent,
      hasDecided,
      acceptAll,
      acceptNecessaryOnly,
      acceptChatOnly,
      acceptCustom,
      resetConsent,
      showBanner,
      showSettings,
      openSettings,
      closeSettings,
    }}>
      {children}
    </ConsentContext.Provider>
  );
}

/* ── Hook ────────────────────────────────────────────────────────── */
export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider');
  return ctx;
}
