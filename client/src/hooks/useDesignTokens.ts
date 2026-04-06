// CME Design Tokens – persisted via LocalStorage, applied to :root CSS Custom Properties
// Cross-tab sync uses ONLY the native 'storage' event (fires in OTHER tabs automatically).
// Additionally, we dispatch a custom DOM event for same-tab reactivity.

import { useState, useEffect, useCallback } from 'react';

// ── Same-tab notification ──────────────────────────────────────────────
// localStorage 'storage' event only fires in OTHER tabs.
// For same-tab reactivity we use a custom DOM event.

function notifySameTab(key: string) {
  window.dispatchEvent(new CustomEvent('cme-token-change', { detail: { key } }));
}

// ── Per-Diamond Configuration ────────────────────────────────────────────

export interface DiamondConfig {
  size: number;
  offsetX: number;
  offsetY: number;
  rotate: number;
}

export type DiamondId = 'hero' | 'service1' | 'service2' | 'service3' | 'markets';

export const DEFAULT_DIAMOND_CONFIGS: Record<DiamondId, DiamondConfig> = {
  hero:     { size: 58, offsetX: 18,  offsetY: 0, rotate: 0 },
  service1: { size: 46, offsetX: -18, offsetY: 0, rotate: 0 },
  service2: { size: 46, offsetX: 18,  offsetY: 0, rotate: 0 },
  service3: { size: 46, offsetX: -18, offsetY: 0, rotate: 0 },
  markets:  { size: 50, offsetX: 18,  offsetY: 0, rotate: 0 },
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
    if (raw) return { ...DEFAULT_DIAMOND_CONFIGS, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_DIAMOND_CONFIGS };
}

export function saveDiamondConfigs(configs: Record<DiamondId, DiamondConfig>) {
  localStorage.setItem(DIAMOND_STORAGE_KEY, JSON.stringify(configs));
  notifySameTab(DIAMOND_STORAGE_KEY);
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
  notifySameTab(DIAMOND_STORAGE_KEY);
}

// ── useDiamondConfigs Hook ───────────────────────────────────────────────

export function useDiamondConfigs() {
  const [configs, setConfigs] = useState<Record<DiamondId, DiamondConfig>>(() => loadDiamondConfigs());

  // Listen for cross-tab (storage event) and same-tab (custom event) updates
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === DIAMOND_STORAGE_KEY && e.newValue) {
        try {
          const incoming = { ...DEFAULT_DIAMOND_CONFIGS, ...JSON.parse(e.newValue) };
          setConfigs(incoming);
          applyDiamondConfigsToRoot(incoming);
        } catch { /* ignore */ }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const updateDiamond = useCallback((id: DiamondId, key: keyof DiamondConfig, value: number) => {
    setConfigs(prev => {
      const next = { ...prev, [id]: { ...prev[id], [key]: value } };
      applyDiamondConfigsToRoot(next);
      saveDiamondConfigs(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    const def = { ...DEFAULT_DIAMOND_CONFIGS };
    setConfigs(def);
    resetDiamondConfigs();
  }, []);

  return { configs, updateDiamond, resetAll };
}

// ── Per-Section Height Configuration ─────────────────────────────────────

export interface SectionHeightConfig {
  paddingTop: number;   // px
  paddingBottom: number; // px
}

export type SectionId = 'hero' | 'stats' | 'service1' | 'service2' | 'service3' | 'usp' | 'process' | 'markets' | 'contact';

export const DEFAULT_SECTION_HEIGHTS: Record<SectionId, SectionHeightConfig> = {
  hero:     { paddingTop: 80, paddingBottom: 80 },
  stats:    { paddingTop: 40, paddingBottom: 40 },
  service1: { paddingTop: 80, paddingBottom: 80 },
  service2: { paddingTop: 80, paddingBottom: 80 },
  service3: { paddingTop: 80, paddingBottom: 80 },
  usp:      { paddingTop: 80, paddingBottom: 80 },
  process:  { paddingTop: 80, paddingBottom: 80 },
  markets:  { paddingTop: 80, paddingBottom: 80 },
  contact:  { paddingTop: 80, paddingBottom: 80 },
};

export const SECTION_LABELS: Record<SectionId, string> = {
  hero:     'Hero (Startseite)',
  stats:    'Kennzahlen-Leiste',
  service1: 'Leistung 1 – Entwicklung',
  service2: 'Leistung 2 – Fertigung',
  service3: 'Leistung 3 – Lifecycle',
  usp:      'Warum CME?',
  process:  'Unser Prozess',
  markets:  'Märkte & Anwendungen',
  contact:  'Kontakt',
};

const SECTION_HEIGHT_STORAGE_KEY = 'cme-section-heights';

export function loadSectionHeights(): Record<SectionId, SectionHeightConfig> {
  try {
    const raw = localStorage.getItem(SECTION_HEIGHT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const merged = { ...DEFAULT_SECTION_HEIGHTS };
      for (const id of Object.keys(DEFAULT_SECTION_HEIGHTS) as SectionId[]) {
        if (parsed[id]) merged[id] = { ...DEFAULT_SECTION_HEIGHTS[id], ...parsed[id] };
      }
      return merged;
    }
  } catch { /* ignore */ }
  return { ...DEFAULT_SECTION_HEIGHTS };
}

export function saveSectionHeights(configs: Record<SectionId, SectionHeightConfig>) {
  localStorage.setItem(SECTION_HEIGHT_STORAGE_KEY, JSON.stringify(configs));
  notifySameTab(SECTION_HEIGHT_STORAGE_KEY);
}

export function applySectionHeightsToRoot(configs: Record<SectionId, SectionHeightConfig>) {
  const el = document.documentElement;
  (Object.keys(configs) as SectionId[]).forEach(id => {
    const c = configs[id];
    el.style.setProperty(`--cme-section-${id}-pt`, `${c.paddingTop}px`);
    el.style.setProperty(`--cme-section-${id}-pb`, `${c.paddingBottom}px`);
  });
}

export function resetSectionHeights() {
  localStorage.removeItem(SECTION_HEIGHT_STORAGE_KEY);
  applySectionHeightsToRoot(DEFAULT_SECTION_HEIGHTS);
  notifySameTab(SECTION_HEIGHT_STORAGE_KEY);
}

// ── useSectionHeights Hook ──────────────────────────────────────────────

export function useSectionHeights() {
  const [configs, setConfigs] = useState<Record<SectionId, SectionHeightConfig>>(() => loadSectionHeights());

  useEffect(() => {
    applySectionHeightsToRoot(configs);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === SECTION_HEIGHT_STORAGE_KEY && e.newValue) {
        try {
          const incoming = loadSectionHeights();
          setConfigs(incoming);
          applySectionHeightsToRoot(incoming);
        } catch { /* ignore */ }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const updateSection = useCallback((id: SectionId, key: keyof SectionHeightConfig, value: number) => {
    setConfigs(prev => {
      const next = { ...prev, [id]: { ...prev[id], [key]: value } };
      applySectionHeightsToRoot(next);
      saveSectionHeights(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    const def = { ...DEFAULT_SECTION_HEIGHTS };
    setConfigs(def);
    resetSectionHeights();
  }, []);

  return { configs, updateSection, resetAll };
}

// ── Global Design Tokens ─────────────────────────────────────────────────

export interface DesignTokens {
  colorPrimary: string;
  colorDark: string;
  colorGray: string;
  colorAccent: string;
  colorBg: string;
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
  diamondRadius: number;
  borderRadius: number;
  sectionPadding: number;
  containerMaxWidth: number;
  logoHeightDesktop: number;
  logoHeightTablet: number;
  logoHeightMobile: number;
  headerPaddingTop: number;
  headerPaddingBottom: number;
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
  logoHeightDesktop: 48,
  logoHeightTablet: 40,
  logoHeightMobile: 32,
  headerPaddingTop: 12,
  headerPaddingBottom: 12,
};

const STORAGE_KEY = 'cme-design-tokens';

/** Helper: parse hex color to r,g,b */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16) || 0,
    g: parseInt(h.substring(2, 4), 16) || 0,
    b: parseInt(h.substring(4, 6), 16) || 0,
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
  // Derived colors
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
  // Derived inline sizes (proportional to body/small)
  el.style.setProperty('--cme-font-size-xs', `${tokens.fontSizeSmall}px`);
  el.style.setProperty('--cme-font-size-sm', `${Math.round(tokens.fontSizeSmall + (tokens.fontSizeBody - tokens.fontSizeSmall) * 0.5)}px`);
  el.style.setProperty('--cme-font-size-base', `${tokens.fontSizeBody}px`);
  el.style.setProperty('--cme-font-size-lg', `${Math.round(tokens.fontSizeBody * 1.125)}px`);
  el.style.setProperty('--cme-font-size-xl', `${Math.round(tokens.fontSizeBody * 1.25)}px`);
  el.style.setProperty('--cme-font-size-2xl', `${Math.round(tokens.fontSizeBody * 1.5)}px`);
  el.style.setProperty('--cme-font-weight-heading', String(tokens.fontWeightHeading));
  el.style.setProperty('--cme-font-weight-body', String(tokens.fontWeightBody));
  el.style.setProperty('--cme-line-height-heading', String(tokens.lineHeightHeading));
  el.style.setProperty('--cme-line-height-body', String(tokens.lineHeightBody));
  el.style.setProperty('--cme-letter-spacing-heading', `${tokens.letterSpacingHeading}px`);
  // Diamond
  el.style.setProperty('--cme-diamond-radius', String(tokens.diamondRadius));
  // Layout
  el.style.setProperty('--cme-border-radius', `${tokens.borderRadius}px`);
  el.style.setProperty('--radius', `${tokens.borderRadius / 16}rem`);
  el.style.setProperty('--cme-section-padding', `${tokens.sectionPadding}px`);
  el.style.setProperty('--cme-container-max-width', `${tokens.containerMaxWidth}px`);
  // Logo – responsive per breakpoint
  el.style.setProperty('--cme-logo-height-desktop', `${tokens.logoHeightDesktop}px`);
  el.style.setProperty('--cme-logo-height-tablet', `${tokens.logoHeightTablet}px`);
  el.style.setProperty('--cme-logo-height-mobile', `${tokens.logoHeightMobile}px`);
  // Header padding
  el.style.setProperty('--cme-header-padding-top', `${tokens.headerPaddingTop}px`);
  el.style.setProperty('--cme-header-padding-bottom', `${tokens.headerPaddingBottom}px`);
}

/** Load tokens from LocalStorage (falls back to defaults) */
export function loadTokens(): DesignTokens {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_TOKENS, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_TOKENS };
}

/** Save tokens to LocalStorage */
export function saveTokens(tokens: DesignTokens) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  notifySameTab(STORAGE_KEY);
}

/** Reset tokens to defaults */
export function resetTokens() {
  localStorage.removeItem(STORAGE_KEY);
  applyTokensToRoot(DEFAULT_TOKENS);
  notifySameTab(STORAGE_KEY);
}

// ── useDesignTokens Hook ─────────────────────────────────────────────────

export function useDesignTokens() {
  const [tokens, setTokens] = useState<DesignTokens>(() => loadTokens());

  // Apply on mount
  useEffect(() => {
    applyTokensToRoot(tokens);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for cross-tab updates (storage event fires in OTHER tabs)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const incoming = { ...DEFAULT_TOKENS, ...JSON.parse(e.newValue) };
          setTokens(incoming);
          applyTokensToRoot(incoming);
        } catch { /* ignore */ }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const updateToken = useCallback(<K extends keyof DesignTokens>(key: K, value: DesignTokens[K]) => {
    setTokens(prev => {
      const next = { ...prev, [key]: value };
      applyTokensToRoot(next);
      saveTokens(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    const def = { ...DEFAULT_TOKENS };
    setTokens(def);
    resetTokens();
  }, []);

  return { tokens, updateToken, reset };
}

// ── Preset / Versioning System ──────────────────────────────────────────────

export interface DesignPreset {
  id: string;
  name: string;
  createdAt: string;       // ISO date string
  isDefault: boolean;      // if true, this preset is loaded on startup
  tokens: DesignTokens;
  diamonds: Record<DiamondId, DiamondConfig>;
  sectionHeights: Record<SectionId, SectionHeightConfig>;
}

const PRESETS_STORAGE_KEY = 'cme-design-presets';
const DEFAULT_PRESET_ID_KEY = 'cme-default-preset-id';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}

/** Load all saved presets */
export function loadPresets(): DesignPreset[] {
  try {
    const raw = localStorage.getItem(PRESETS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [];
}

/** Save all presets */
export function savePresets(presets: DesignPreset[]) {
  localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(presets));
  notifySameTab(PRESETS_STORAGE_KEY);
}

/** Get the default preset ID */
export function getDefaultPresetId(): string | null {
  return localStorage.getItem(DEFAULT_PRESET_ID_KEY);
}

/** Set a preset as the default (loaded on startup) */
export function setDefaultPresetId(id: string | null) {
  if (id) {
    localStorage.setItem(DEFAULT_PRESET_ID_KEY, id);
  } else {
    localStorage.removeItem(DEFAULT_PRESET_ID_KEY);
  }
  notifySameTab(DEFAULT_PRESET_ID_KEY);
}

/** Create a new preset from the current state */
export function createPreset(name: string): DesignPreset {
  const preset: DesignPreset = {
    id: generateId(),
    name,
    createdAt: new Date().toISOString(),
    isDefault: false,
    tokens: loadTokens(),
    diamonds: loadDiamondConfigs(),
    sectionHeights: loadSectionHeights(),
  };

  const presets = loadPresets();
  presets.push(preset);
  savePresets(presets);
  return preset;
}

/** Update an existing preset with current values */
export function updatePreset(id: string, name?: string): DesignPreset | null {
  const presets = loadPresets();
  const idx = presets.findIndex(p => p.id === id);
  if (idx === -1) return null;

  presets[idx] = {
    ...presets[idx],
    name: name ?? presets[idx].name,
    createdAt: new Date().toISOString(),
    tokens: loadTokens(),
    diamonds: loadDiamondConfigs(),
    sectionHeights: loadSectionHeights(),
  };

  savePresets(presets);
  return presets[idx];
}

/** Delete a preset */
export function deletePreset(id: string) {
  const presets = loadPresets().filter(p => p.id !== id);
  savePresets(presets);

  // If this was the default, clear it
  if (getDefaultPresetId() === id) {
    setDefaultPresetId(null);
  }
}

/** Apply a preset (loads all its values into localStorage and :root) */
export function applyPreset(preset: DesignPreset) {
  // Save to localStorage
  saveTokens(preset.tokens);
  saveDiamondConfigs(preset.diamonds);
  saveSectionHeights(preset.sectionHeights);

  // Apply to :root
  applyTokensToRoot(preset.tokens);
  applyDiamondConfigsToRoot(preset.diamonds);
  applySectionHeightsToRoot(preset.sectionHeights);
}

/** Load the default preset on startup (if one is set) */
export function loadDefaultPreset(): DesignPreset | null {
  const defaultId = getDefaultPresetId();
  if (!defaultId) return null;

  const presets = loadPresets();
  return presets.find(p => p.id === defaultId) ?? null;
}

// ── usePresets Hook ──────────────────────────────────────────────────────────

export function usePresets() {
  const [presets, setPresets] = useState<DesignPreset[]>(() => loadPresets());
  const [defaultId, setDefaultId] = useState<string | null>(() => getDefaultPresetId());

  // Listen for changes from other tabs or same-tab events
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === PRESETS_STORAGE_KEY) {
        setPresets(loadPresets());
      }
      if (e.key === DEFAULT_PRESET_ID_KEY) {
        setDefaultId(getDefaultPresetId());
      }
    };
    const onCustom = ((e: CustomEvent) => {
      if (e.detail?.key === PRESETS_STORAGE_KEY) {
        setPresets(loadPresets());
      }
      if (e.detail?.key === DEFAULT_PRESET_ID_KEY) {
        setDefaultId(getDefaultPresetId());
      }
    }) as EventListener;

    window.addEventListener('storage', onStorage);
    window.addEventListener('cme-token-change', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cme-token-change', onCustom);
    };
  }, []);

  const create = useCallback((name: string) => {
    const preset = createPreset(name);
    setPresets(loadPresets());
    return preset;
  }, []);

  const update = useCallback((id: string, name?: string) => {
    const preset = updatePreset(id, name);
    setPresets(loadPresets());
    return preset;
  }, []);

  const remove = useCallback((id: string) => {
    deletePreset(id);
    setPresets(loadPresets());
    setDefaultId(getDefaultPresetId());
  }, []);

  const apply = useCallback((preset: DesignPreset) => {
    applyPreset(preset);
  }, []);

  const setAsDefault = useCallback((id: string | null) => {
    setDefaultPresetId(id);
    setDefaultId(id);
  }, []);

  return { presets, defaultId, create, update, remove, apply, setAsDefault };
}
