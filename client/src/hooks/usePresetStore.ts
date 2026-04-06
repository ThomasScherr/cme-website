/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  CME Preset Store – Separate, persistente Entity                   ║
 * ║                                                                     ║
 * ║  Diese Datei verwaltet Design-Presets unabhängig vom restlichen     ║
 * ║  Token-System. Presets werden im localStorage gespeichert und       ║
 * ║  bleiben über Code-Änderungen hinweg erhalten.                      ║
 * ║                                                                     ║
 * ║  NICHT ÄNDERN, es sei denn der Benutzer fordert es explizit an.    ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

import { useState, useEffect, useCallback } from 'react';
import type { DesignTokens, DiamondConfig, DiamondId, SectionHeightConfig, SectionId } from './useDesignTokens';
import type { FullResponsiveConfig } from './useResponsiveTokens';

// ── Preset Interface ──────────────────────────────────────────────────────

export interface DesignPreset {
  id: string;
  name: string;
  createdAt: string;       // ISO date string
  isDefault: boolean;      // if true, this preset is loaded on startup
  /** @deprecated Use responsiveConfig instead */
  tokens?: DesignTokens;
  /** @deprecated Use responsiveConfig instead */
  diamonds?: Record<DiamondId, DiamondConfig>;
  /** @deprecated Use responsiveConfig instead */
  sectionHeights?: Record<SectionId, SectionHeightConfig>;
  /** Full responsive config with all breakpoints (desktop, tablet, mobile) */
  responsiveConfig?: FullResponsiveConfig;
}

// ── Storage Keys ──────────────────────────────────────────────────────────
// These keys are ONLY used by the preset store and should never be touched
// by other parts of the codebase.

const PRESETS_STORAGE_KEY = 'cme-design-presets';
const DEFAULT_PRESET_ID_KEY = 'cme-default-preset-id';

// ── Helpers ───────────────────────────────────────────────────────────────

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}

function notifySameTab(key: string) {
  window.dispatchEvent(new CustomEvent('cme-preset-change', { detail: { key } }));
}

// ── CRUD Functions ────────────────────────────────────────────────────────

/** Load all saved presets from localStorage */
export function loadPresets(): DesignPreset[] {
  try {
    const raw = localStorage.getItem(PRESETS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [];
}

/** Save all presets to localStorage */
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

/** Create a new preset from the current responsive config */
export function createPreset(name: string, responsiveConfig: FullResponsiveConfig): DesignPreset {
  const preset: DesignPreset = {
    id: generateId(),
    name,
    createdAt: new Date().toISOString(),
    isDefault: false,
    responsiveConfig,
    // Also store desktop tokens for backward compatibility display
    tokens: responsiveConfig.desktop.tokens,
    diamonds: responsiveConfig.desktop.diamonds,
    sectionHeights: responsiveConfig.desktop.sectionHeights,
  };

  const presets = loadPresets();
  presets.push(preset);
  savePresets(presets);
  return preset;
}

/** Update an existing preset with current responsive config */
export function updatePreset(id: string, responsiveConfig: FullResponsiveConfig, name?: string): DesignPreset | null {
  const presets = loadPresets();
  const idx = presets.findIndex(p => p.id === id);
  if (idx === -1) return null;

  presets[idx] = {
    ...presets[idx],
    name: name ?? presets[idx].name,
    createdAt: new Date().toISOString(),
    responsiveConfig,
    tokens: responsiveConfig.desktop.tokens,
    diamonds: responsiveConfig.desktop.diamonds,
    sectionHeights: responsiveConfig.desktop.sectionHeights,
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

/** Get the full responsive config from a preset (with migration support) */
export function getPresetConfig(preset: DesignPreset): FullResponsiveConfig | null {
  if (preset.responsiveConfig) {
    return preset.responsiveConfig;
  }
  // Legacy preset: only has desktop-level tokens – return null to indicate migration needed
  return null;
}

/** Load the default preset on startup (if one is set) */
export function loadDefaultPreset(): DesignPreset | null {
  const defaultId = getDefaultPresetId();
  if (!defaultId) return null;

  const presets = loadPresets();
  return presets.find(p => p.id === defaultId) ?? null;
}

// ── React Hook ────────────────────────────────────────────────────────────

export function usePresetStore() {
  const [presets, setPresets] = useState<DesignPreset[]>(() => loadPresets());
  const [defaultId, setDefaultIdState] = useState<string | null>(() => getDefaultPresetId());

  // Listen for changes from other tabs or same-tab events
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === PRESETS_STORAGE_KEY) {
        setPresets(loadPresets());
      }
      if (e.key === DEFAULT_PRESET_ID_KEY) {
        setDefaultIdState(getDefaultPresetId());
      }
    };
    const onCustom = ((e: CustomEvent) => {
      if (e.detail?.key === PRESETS_STORAGE_KEY) {
        setPresets(loadPresets());
      }
      if (e.detail?.key === DEFAULT_PRESET_ID_KEY) {
        setDefaultIdState(getDefaultPresetId());
      }
    }) as EventListener;

    window.addEventListener('storage', onStorage);
    window.addEventListener('cme-preset-change', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cme-preset-change', onCustom);
    };
  }, []);

  const create = useCallback((name: string, responsiveConfig: FullResponsiveConfig) => {
    const preset = createPreset(name, responsiveConfig);
    setPresets(loadPresets());
    return preset;
  }, []);

  const update = useCallback((id: string, responsiveConfig: FullResponsiveConfig, name?: string) => {
    const preset = updatePreset(id, responsiveConfig, name);
    setPresets(loadPresets());
    return preset;
  }, []);

  const remove = useCallback((id: string) => {
    deletePreset(id);
    setPresets(loadPresets());
    setDefaultIdState(getDefaultPresetId());
  }, []);

  const setAsDefault = useCallback((id: string | null) => {
    setDefaultPresetId(id);
    setDefaultIdState(id);
  }, []);

  return { presets, defaultId, create, update, remove, setAsDefault };
}
