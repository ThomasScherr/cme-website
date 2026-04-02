// CME Design Tokens – persisted via LocalStorage, applied to :root CSS Custom Properties
// This hook is the single source of truth for all design tokens.
// Changing a token immediately updates the live website via document.documentElement.style.setProperty.
// BroadcastChannel syncs changes across all open tabs in real time.

import { useState, useEffect, useCallback } from 'react';

// ── BroadcastChannel setup ────────────────────────────────────────────────

const BROADCAST_CHANNEL_NAME = 'cme-design-sync';

function getBroadcastChannel(): BroadcastChannel | null {
  if (typeof BroadcastChannel !== 'undefined') {
    return new BroadcastChannel(BROADCAST_CHANNEL_NAME);
  }
  return null;
}

// ── Per-Diamond Configuration ─────────────────────────────────────────────

export interface DiamondConfig {
  /** Size as vw value, e.g. 55 = 55vw */
  size: number;
  /** Horizontal offset in vw – positive = shift right (more bleed right), negative = shift left */
  offsetX: number;
  /** Vertical offset in vh – positive = shift down, negative = shift up */
  offsetY: number;
  /** Rotation in degrees (on top of base 45deg) */
  rotate: number;
}

export type DiamondId =
  | 'hero'
  | 'service1'
  | 'service2'
  | 'service3'
  | 'markets';

export const DEFAULT_DIAMOND_CONFIGS: Record<DiamondId, DiamondConfig> = {
  hero:     { size: 58, offsetX: 18,  offsetY: 0,  rotate: 0 },
  service1: { size: 46, offsetX: -18, offsetY: 0,  rotate: 0 },
  service2: { size: 46, offsetX: 18,  offsetY: 0,  rotate: 0 },
  service3: { size: 46, offsetX: -18, offsetY: 0,  rotate: 0 },
  markets:  { size: 50, offsetX: 18,  offsetY: 0,  rotate: 0 },
};

export const DIAMOND_LABELS: Record<DiamondId, string> = {
  hero:     'Hero (Startseite)',
  service1: 'Leistung 1 – Entwicklung',
  service2: 'Leistung 2 – Fertigung',
  service3: 'Leistung 3 – Lifecycle',
  markets:  'Märkte / EMV-Kammer',
};

const DIAMOND_STORAGE_KEY = 'cme-diamond-configs';

export function loadDiamondConfigs(): Record<DiamondId, DiamondConfig> {
  try {
    const raw = localStorage.getItem(DIAMOND_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_DIAMOND_CONFIGS, ...parsed };
    }
  } catch { /* ignore */ }
  return { ...DEFAULT_DIAMOND_CONFIGS };
}

export function saveDiamondConfigs(configs: Record<DiamondId, DiamondConfig>) {
  localStorage.setItem(DIAMOND_STORAGE_KEY, JSON.stringify(configs));
}

export function applyDiamondConfigsToRoot(configs: Record<DiamondId, DiamondConfig>) {
  const el = document.documentElement;
  (Object.keys(configs) as DiamondId[]).forEach(id => {
    const c = configs[id];
    el.style.setProperty(`--cme-diamond-${id}-size`, `${c.size}vw`);
    el.style.setProperty(`--cme-diamond-${id}-offset-x`, `${c.offsetX}vw`);
    el.style.setProperty(`--cme-diamond-${id}-offset-y`, `${c.offsetY}vh`);
    el.style.setProperty(`--cme-diamond-${id}-rotate`, `${c.rotate}deg`);
  });
}

export function resetDiamondConfigs() {
  localStorage.removeItem(DIAMOND_STORAGE_KEY);
  applyDiamondConfigsToRoot(DEFAULT_DIAMOND_CONFIGS);
}

// ── useDiamondConfigs Hook ────────────────────────────────────────────────

export function useDiamondConfigs() {
  const [configs, setConfigs] = useState<Record<DiamondId, DiamondConfig>>(() => loadDiamondConfigs());

  useEffect(() => {
    applyDiamondConfigsToRoot(configs);

    // Listen for changes from other tabs
    const channel = getBroadcastChannel();
    if (channel) {
      channel.onmessage = (event) => {
        if (event.data?.type === 'diamond-update') {
          const incoming = event.data.configs as Record<DiamondId, DiamondConfig>;
          setConfigs(incoming);
          applyDiamondConfigsToRoot(incoming);
        }
      };
      return () => channel.close();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateDiamond = useCallback((id: DiamondId, key: keyof DiamondConfig, value: number) => {
    setConfigs(prev => {
      const next = {
        ...prev,
        [id]: { ...prev[id], [key]: value },
      };
      applyDiamondConfigsToRoot(next);
      saveDiamondConfigs(next);
      // Broadcast to other tabs
      const channel = getBroadcastChannel();
      if (channel) {
        channel.postMessage({ type: 'diamond-update', configs: next });
        channel.close();
      }
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setConfigs({ ...DEFAULT_DIAMOND_CONFIGS });
    resetDiamondConfigs();
    const channel = getBroadcastChannel();
    if (channel) {
      channel.postMessage({ type: 'diamond-update', configs: DEFAULT_DIAMOND_CONFIGS });
      channel.close();
    }
  }, []);

  return { configs, updateDiamond, resetAll };
}

// ── Global Design Tokens ──────────────────────────────────────────────────

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
  // Diamond (global radius)
  diamondRadius: number;
  // Layout
  borderRadius: number;
  sectionPadding: number;
  containerMaxWidth: number;
  // Logo (clamp-based: min px, ideal vw, max px)
  logoHeightMin: number;
  logoHeightIdeal: number;
  logoHeightMax: number;
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
  logoHeightMin: 28,
  logoHeightIdeal: 3.5,
  logoHeightMax: 56,
};

const STORAGE_KEY = 'cme-design-tokens';

/** Helper: parse hex color to r,g,b */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

/** Helper: lighten a hex color */
function lightenHex(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const lr = Math.min(255, Math.round(r + (255 - r) * amount));
  const lg = Math.min(255, Math.round(g + (255 - g) * amount));
  const lb = Math.min(255, Math.round(b + (255 - b) * amount));
  return `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`;
}

/** Apply a full token set to :root CSS Custom Properties */
export function applyTokensToRoot(tokens: DesignTokens) {
  const el = document.documentElement;
  // Core colors
  el.style.setProperty('--cme-color-primary', tokens.colorPrimary);
  el.style.setProperty('--cme-color-dark', tokens.colorDark);
  el.style.setProperty('--cme-color-gray', tokens.colorGray);
  el.style.setProperty('--cme-color-accent', tokens.colorAccent);
  el.style.setProperty('--cme-color-bg', tokens.colorBg);
  // Derived colors (auto-computed from primary / bg)
  const pRgb = hexToRgb(tokens.colorPrimary);
  el.style.setProperty('--cme-color-primary-40', `rgba(${pRgb.r}, ${pRgb.g}, ${pRgb.b}, 0.4)`);
  el.style.setProperty('--cme-color-primary-50', `rgba(${pRgb.r}, ${pRgb.g}, ${pRgb.b}, 0.5)`);
  el.style.setProperty('--cme-color-bg-alt', lightenHex(tokens.colorGray, 0.92));
  el.style.setProperty('--cme-color-border', lightenHex(tokens.colorGray, 0.82));
  // Typography
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
  // Diamond
  el.style.setProperty('--cme-diamond-radius', String(tokens.diamondRadius));
  // Layout
  el.style.setProperty('--cme-border-radius', `${tokens.borderRadius}px`);
  el.style.setProperty('--cme-section-padding', `${tokens.sectionPadding}px`);
  el.style.setProperty('--cme-container-max-width', `${tokens.containerMaxWidth}px`);
  // Logo
  el.style.setProperty('--cme-logo-height', `clamp(${tokens.logoHeightMin}px, ${tokens.logoHeightIdeal}vw, ${tokens.logoHeightMax}px)`);
}

/** Load tokens from LocalStorage (falls back to defaults) */
export function loadTokens(): DesignTokens {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_TOKENS, ...JSON.parse(raw) };
    }
  } catch { /* ignore */ }
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

// ── useDesignTokens Hook ──────────────────────────────────────────────────

export function useDesignTokens() {
  const [tokens, setTokens] = useState<DesignTokens>(() => loadTokens());

  useEffect(() => {
    applyTokensToRoot(tokens);

    // Listen for changes broadcast from other tabs (e.g. Style Guide)
    const channel = getBroadcastChannel();
    if (channel) {
      channel.onmessage = (event) => {
        if (event.data?.type === 'token-update') {
          const incoming = event.data.tokens as DesignTokens;
          setTokens(incoming);
          applyTokensToRoot(incoming);
        }
        if (event.data?.type === 'diamond-update') {
          const incoming = event.data.configs as Record<DiamondId, DiamondConfig>;
          applyDiamondConfigsToRoot(incoming);
        }
      };
      return () => channel.close();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateToken = useCallback(<K extends keyof DesignTokens>(key: K, value: DesignTokens[K]) => {
    setTokens(prev => {
      const next = { ...prev, [key]: value };
      applyTokensToRoot(next);
      saveTokens(next);
      // Broadcast to other tabs
      const channel = getBroadcastChannel();
      if (channel) {
        channel.postMessage({ type: 'token-update', tokens: next });
        channel.close();
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setTokens({ ...DEFAULT_TOKENS });
    resetTokens();
    const channel = getBroadcastChannel();
    if (channel) {
      channel.postMessage({ type: 'token-update', tokens: DEFAULT_TOKENS });
      channel.close();
    }
  }, []);

  return { tokens, updateToken, reset };
}
