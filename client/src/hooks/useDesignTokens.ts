// CME Design Tokens – persisted via LocalStorage, applied to :root CSS Custom Properties
// This hook is the single source of truth for all design tokens.
// Changing a token immediately updates the live website via document.documentElement.style.setProperty.

import { useState, useEffect, useCallback } from 'react';

export interface DesignTokens {
  // Colors (hex)
  colorPrimary: string;
  colorDark: string;
  colorGray: string;
  colorAccent: string;
  colorBg: string;
  // Typography
  fontFamily: string;
  fontSizeH1: number;
  fontSizeH2: number;
  fontSizeH3: number;
  fontSizeH4: number;
  fontSizeBody: number;
  fontSizeSmall: number;
  fontWeightHeading: number;
  fontWeightBody: number;
  lineHeightHeading: number;
  lineHeightBody: number;
  letterSpacingHeading: number;
  // Diamond
  diamondRadius: number;
  // Layout
  borderRadius: number;
  sectionPadding: number;
  containerMaxWidth: number;
}

export const DEFAULT_TOKENS: DesignTokens = {
  colorPrimary: '#2196D3',
  colorDark: '#1a1a2e',
  colorGray: '#4a5568',
  colorAccent: '#00b4d8',
  colorBg: '#ffffff',
  fontFamily: 'Roboto',
  fontSizeH1: 56,
  fontSizeH2: 40,
  fontSizeH3: 28,
  fontSizeH4: 20,
  fontSizeBody: 16,
  fontSizeSmall: 13,
  fontWeightHeading: 700,
  fontWeightBody: 400,
  lineHeightHeading: 1.15,
  lineHeightBody: 1.65,
  letterSpacingHeading: -0.5,
  diamondRadius: 0.036,
  borderRadius: 4,
  sectionPadding: 80,
  containerMaxWidth: 1280,
};

const STORAGE_KEY = 'cme-design-tokens';

/** Apply a full token set to :root CSS Custom Properties */
export function applyTokensToRoot(tokens: DesignTokens) {
  const el = document.documentElement;
  el.style.setProperty('--cme-color-primary', tokens.colorPrimary);
  el.style.setProperty('--cme-color-dark', tokens.colorDark);
  el.style.setProperty('--cme-color-gray', tokens.colorGray);
  el.style.setProperty('--cme-color-accent', tokens.colorAccent);
  el.style.setProperty('--cme-color-bg', tokens.colorBg);
  el.style.setProperty('--cme-font-family', `'${tokens.fontFamily}', sans-serif`);
  el.style.setProperty('--cme-font-size-h1', `${tokens.fontSizeH1}px`);
  el.style.setProperty('--cme-font-size-h2', `${tokens.fontSizeH2}px`);
  el.style.setProperty('--cme-font-size-h3', `${tokens.fontSizeH3}px`);
  el.style.setProperty('--cme-font-size-h4', `${tokens.fontSizeH4}px`);
  el.style.setProperty('--cme-font-size-body', `${tokens.fontSizeBody}px`);
  el.style.setProperty('--cme-font-size-small', `${tokens.fontSizeSmall}px`);
  el.style.setProperty('--cme-font-weight-heading', String(tokens.fontWeightHeading));
  el.style.setProperty('--cme-font-weight-body', String(tokens.fontWeightBody));
  el.style.setProperty('--cme-line-height-heading', String(tokens.lineHeightHeading));
  el.style.setProperty('--cme-line-height-body', String(tokens.lineHeightBody));
  el.style.setProperty('--cme-letter-spacing-heading', `${tokens.letterSpacingHeading}px`);
  el.style.setProperty('--cme-diamond-radius', String(tokens.diamondRadius));
  el.style.setProperty('--cme-border-radius', `${tokens.borderRadius}px`);
  el.style.setProperty('--cme-section-padding', `${tokens.sectionPadding}px`);
  el.style.setProperty('--cme-container-max-width', `${tokens.containerMaxWidth}px`);
}

/** Load tokens from LocalStorage (falls back to defaults) */
export function loadTokens(): DesignTokens {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_TOKENS, ...JSON.parse(raw) };
    }
  } catch {
    // ignore
  }
  return { ...DEFAULT_TOKENS };
}

/** Save tokens to LocalStorage */
export function saveTokens(tokens: DesignTokens) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
}

/** Reset tokens to defaults */
export function resetTokens() {
  localStorage.removeItem(STORAGE_KEY);
  applyTokensToRoot(DEFAULT_TOKENS);
}

// ── React Hook ─────────────────────────────────────────────────────────────

export function useDesignTokens() {
  const [tokens, setTokens] = useState<DesignTokens>(() => loadTokens());

  // Apply on mount
  useEffect(() => {
    applyTokensToRoot(tokens);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateToken = useCallback(<K extends keyof DesignTokens>(key: K, value: DesignTokens[K]) => {
    setTokens(prev => {
      const next = { ...prev, [key]: value };
      applyTokensToRoot(next);
      saveTokens(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setTokens({ ...DEFAULT_TOKENS });
    resetTokens();
  }, []);

  return { tokens, updateToken, reset };
}
