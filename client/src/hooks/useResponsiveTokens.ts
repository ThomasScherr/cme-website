// CME Responsive Design Tokens – per-breakpoint values for all design properties
// Breakpoints: desktop (>=1024px), tablet (768-1023px), mobile (<768px)
// Stored in localStorage, applied via CSS custom properties with media-query-like approach

import { useState, useEffect, useCallback } from 'react';
import {
  DesignTokens, DEFAULT_TOKENS, loadTokens, saveTokens, applyTokensToRoot,
  DiamondConfig, DiamondId, DEFAULT_DIAMOND_CONFIGS, loadDiamondConfigs, saveDiamondConfigs, applyDiamondConfigsToRoot,
  SectionHeightConfig, SectionId, DEFAULT_SECTION_HEIGHTS, loadSectionHeights, saveSectionHeights, applySectionHeightsToRoot,
} from './useDesignTokens';

// ── Types ──────────────────────────────────────────────────────────────

export type Breakpoint = 'desktop' | 'tablet' | 'mobile';

export interface ResponsiveTokens {
  tokens: DesignTokens;
  diamonds: Record<DiamondId, DiamondConfig>;
  sectionHeights: Record<SectionId, SectionHeightConfig>;
}

export interface FullResponsiveConfig {
  desktop: ResponsiveTokens;
  tablet: ResponsiveTokens;
  mobile: ResponsiveTokens;
}

// ── Defaults ──────────────────────────────────────────────────────────

function scaleTokens(base: DesignTokens, factor: number): DesignTokens {
  return {
    ...base,
    fontSizeH1: Math.round(base.fontSizeH1 * factor),
    fontSizeH2: Math.round(base.fontSizeH2 * factor),
    fontSizeH3: Math.round(base.fontSizeH3 * factor),
    fontSizeH4: Math.round(base.fontSizeH4 * factor),
    fontSizeBody: Math.round(base.fontSizeBody * factor),
    fontSizeSmall: Math.round(base.fontSizeSmall * factor),
    logoHeightDesktop: base.logoHeightDesktop,
    logoHeightTablet: base.logoHeightTablet,
    logoHeightMobile: base.logoHeightMobile,
    headerPaddingTop: Math.round(base.headerPaddingTop * factor),
    headerPaddingBottom: Math.round(base.headerPaddingBottom * factor),
    sectionPadding: Math.round(base.sectionPadding * factor),
  };
}

function scaleDiamonds(base: Record<DiamondId, DiamondConfig>, factor: number): Record<DiamondId, DiamondConfig> {
  const result = {} as Record<DiamondId, DiamondConfig>;
  for (const id of Object.keys(base) as DiamondId[]) {
    result[id] = {
      ...base[id],
      size: Math.round(base[id].size * factor),
    };
  }
  return result;
}

function scaleSectionHeights(base: Record<SectionId, SectionHeightConfig>, factor: number): Record<SectionId, SectionHeightConfig> {
  const result = {} as Record<SectionId, SectionHeightConfig>;
  for (const id of Object.keys(base) as SectionId[]) {
    result[id] = {
      paddingTop: Math.round(base[id].paddingTop * factor),
      paddingBottom: Math.round(base[id].paddingBottom * factor),
    };
  }
  return result;
}

export function getDefaultResponsiveConfig(): FullResponsiveConfig {
  return {
    desktop: {
      tokens: { ...DEFAULT_TOKENS },
      diamonds: { ...DEFAULT_DIAMOND_CONFIGS },
      sectionHeights: { ...DEFAULT_SECTION_HEIGHTS },
    },
    tablet: {
      tokens: scaleTokens(DEFAULT_TOKENS, 0.85),
      diamonds: scaleDiamonds(DEFAULT_DIAMOND_CONFIGS, 0.8),
      sectionHeights: scaleSectionHeights(DEFAULT_SECTION_HEIGHTS, 0.75),
    },
    mobile: {
      tokens: scaleTokens(DEFAULT_TOKENS, 0.7),
      diamonds: scaleDiamonds(DEFAULT_DIAMOND_CONFIGS, 0.6),
      sectionHeights: scaleSectionHeights(DEFAULT_SECTION_HEIGHTS, 0.6),
    },
  };
}

// ── Storage ──────────────────────────────────────────────────────────

const RESPONSIVE_STORAGE_KEY = 'cme-responsive-tokens';

// Guard flag to prevent feedback loops: when we save from within the hook,
// we set this to true so our own event listener ignores the resulting event.
let _isSavingFromHook = false;

function notifySameTab() {
  window.dispatchEvent(new CustomEvent('cme-token-change', { detail: { key: RESPONSIVE_STORAGE_KEY } }));
}

export function loadResponsiveConfig(): FullResponsiveConfig {
  try {
    const raw = localStorage.getItem(RESPONSIVE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const defaults = getDefaultResponsiveConfig();
      return {
        desktop: {
          tokens: { ...defaults.desktop.tokens, ...(parsed.desktop?.tokens || {}) },
          diamonds: { ...defaults.desktop.diamonds, ...(parsed.desktop?.diamonds || {}) },
          sectionHeights: { ...defaults.desktop.sectionHeights, ...(parsed.desktop?.sectionHeights || {}) },
        },
        tablet: {
          tokens: { ...defaults.tablet.tokens, ...(parsed.tablet?.tokens || {}) },
          diamonds: { ...defaults.tablet.diamonds, ...(parsed.tablet?.diamonds || {}) },
          sectionHeights: { ...defaults.tablet.sectionHeights, ...(parsed.tablet?.sectionHeights || {}) },
        },
        mobile: {
          tokens: { ...defaults.mobile.tokens, ...(parsed.mobile?.tokens || {}) },
          diamonds: { ...defaults.mobile.diamonds, ...(parsed.mobile?.diamonds || {}) },
          sectionHeights: { ...defaults.mobile.sectionHeights, ...(parsed.mobile?.sectionHeights || {}) },
        },
      };
    }
  } catch { /* ignore */ }
  
  // Migration: if old single-breakpoint tokens exist, use them as desktop
  const oldTokens = loadTokens();
  const oldDiamonds = loadDiamondConfigs();
  const oldSectionHeights = loadSectionHeights();
  const defaults = getDefaultResponsiveConfig();
  
  const hasOldData = localStorage.getItem('cme-design-tokens') || 
                     localStorage.getItem('cme-diamond-configs') || 
                     localStorage.getItem('cme-section-heights');
  
  if (hasOldData) {
    return {
      desktop: { tokens: oldTokens, diamonds: oldDiamonds, sectionHeights: oldSectionHeights },
      tablet: { 
        tokens: scaleTokens(oldTokens, 0.85),
        diamonds: scaleDiamonds(oldDiamonds, 0.8),
        sectionHeights: scaleSectionHeights(oldSectionHeights, 0.75),
      },
      mobile: {
        tokens: scaleTokens(oldTokens, 0.7),
        diamonds: scaleDiamonds(oldDiamonds, 0.6),
        sectionHeights: scaleSectionHeights(oldSectionHeights, 0.6),
      },
    };
  }
  
  return defaults;
}

export function saveResponsiveConfig(config: FullResponsiveConfig, fromHook = false) {
  if (fromHook) _isSavingFromHook = true;
  localStorage.setItem(RESPONSIVE_STORAGE_KEY, JSON.stringify(config));
  // Also sync to old keys for backward compatibility (desktop values)
  // Use silent saves to avoid triggering redundant event cascades
  localStorage.setItem('cme-design-tokens', JSON.stringify(config.desktop.tokens));
  localStorage.setItem('cme-diamond-configs', JSON.stringify(config.desktop.diamonds));
  localStorage.setItem('cme-section-heights', JSON.stringify(config.desktop.sectionHeights));
  // Only dispatch one event (not 4 separate ones)
  notifySameTab();
  if (fromHook) {
    // Reset guard after a microtask so the event listener has time to check it
    Promise.resolve().then(() => { _isSavingFromHook = false; });
  }
}

// ── Apply to :root with breakpoint-specific CSS variables ──────────────

export function applyResponsiveConfigToRoot(config: FullResponsiveConfig) {
  const el = document.documentElement;
  
  // Apply desktop tokens as the base (they're the default)
  applyTokensToRoot(config.desktop.tokens);
  applyDiamondConfigsToRoot(config.desktop.diamonds);
  applySectionHeightsToRoot(config.desktop.sectionHeights);
  
  // Set tablet-specific variables
  const tb = config.tablet;
  el.style.setProperty('--cme-tablet-font-size-h1', `${tb.tokens.fontSizeH1}px`);
  el.style.setProperty('--cme-tablet-font-size-h2', `${tb.tokens.fontSizeH2}px`);
  el.style.setProperty('--cme-tablet-font-size-h3', `${tb.tokens.fontSizeH3}px`);
  el.style.setProperty('--cme-tablet-font-size-h4', `${tb.tokens.fontSizeH4}px`);
  el.style.setProperty('--cme-tablet-font-size-body', `${tb.tokens.fontSizeBody}px`);
  el.style.setProperty('--cme-tablet-font-size-small', `${tb.tokens.fontSizeSmall}px`);
  el.style.setProperty('--cme-tablet-font-size-xs', `${tb.tokens.fontSizeSmall}px`);
  el.style.setProperty('--cme-tablet-font-size-sm', `${Math.round(tb.tokens.fontSizeSmall + (tb.tokens.fontSizeBody - tb.tokens.fontSizeSmall) * 0.5)}px`);
  el.style.setProperty('--cme-tablet-font-size-base', `${tb.tokens.fontSizeBody}px`);
  el.style.setProperty('--cme-tablet-font-size-lg', `${Math.round(tb.tokens.fontSizeBody * 1.125)}px`);
  el.style.setProperty('--cme-tablet-font-size-xl', `${Math.round(tb.tokens.fontSizeBody * 1.25)}px`);
  el.style.setProperty('--cme-tablet-font-size-2xl', `${Math.round(tb.tokens.fontSizeBody * 1.5)}px`);
  el.style.setProperty('--cme-tablet-section-padding', `${tb.tokens.sectionPadding}px`);
  el.style.setProperty('--cme-tablet-line-height-heading', String(tb.tokens.lineHeightHeading));
  el.style.setProperty('--cme-tablet-line-height-body', String(tb.tokens.lineHeightBody));
  el.style.setProperty('--cme-tablet-letter-spacing-heading', `${tb.tokens.letterSpacingHeading}px`);
  // Tablet logo height
  el.style.setProperty('--cme-logo-height-tablet', `${tb.tokens.logoHeightTablet}px`);
  // Tablet header padding
  el.style.setProperty('--cme-tablet-header-padding-top', `${tb.tokens.headerPaddingTop}px`);
  el.style.setProperty('--cme-tablet-header-padding-bottom', `${tb.tokens.headerPaddingBottom}px`);
  
  // Tablet diamonds
  (Object.keys(tb.diamonds) as DiamondId[]).forEach(id => {
    const c = tb.diamonds[id];
    el.style.setProperty(`--cme-tablet-diamond-${id}-size`, `${c.size}vw`);
    el.style.setProperty(`--cme-tablet-diamond-${id}-offset-x`, `${c.offsetX}vw`);
    el.style.setProperty(`--cme-tablet-diamond-${id}-offset-y`, `${c.offsetY}vh`);
  });
  
  // Tablet section heights
  (Object.keys(tb.sectionHeights) as SectionId[]).forEach(id => {
    const c = tb.sectionHeights[id];
    el.style.setProperty(`--cme-tablet-section-${id}-pt`, `${c.paddingTop}px`);
    el.style.setProperty(`--cme-tablet-section-${id}-pb`, `${c.paddingBottom}px`);
  });
  
  // Set mobile-specific variables
  const mb = config.mobile;
  el.style.setProperty('--cme-mobile-font-size-h1', `${mb.tokens.fontSizeH1}px`);
  el.style.setProperty('--cme-mobile-font-size-h2', `${mb.tokens.fontSizeH2}px`);
  el.style.setProperty('--cme-mobile-font-size-h3', `${mb.tokens.fontSizeH3}px`);
  el.style.setProperty('--cme-mobile-font-size-h4', `${mb.tokens.fontSizeH4}px`);
  el.style.setProperty('--cme-mobile-font-size-body', `${mb.tokens.fontSizeBody}px`);
  el.style.setProperty('--cme-mobile-font-size-small', `${mb.tokens.fontSizeSmall}px`);
  el.style.setProperty('--cme-mobile-font-size-xs', `${mb.tokens.fontSizeSmall}px`);
  el.style.setProperty('--cme-mobile-font-size-sm', `${Math.round(mb.tokens.fontSizeSmall + (mb.tokens.fontSizeBody - mb.tokens.fontSizeSmall) * 0.5)}px`);
  el.style.setProperty('--cme-mobile-font-size-base', `${mb.tokens.fontSizeBody}px`);
  el.style.setProperty('--cme-mobile-font-size-lg', `${Math.round(mb.tokens.fontSizeBody * 1.125)}px`);
  el.style.setProperty('--cme-mobile-font-size-xl', `${Math.round(mb.tokens.fontSizeBody * 1.25)}px`);
  el.style.setProperty('--cme-mobile-font-size-2xl', `${Math.round(mb.tokens.fontSizeBody * 1.5)}px`);
  el.style.setProperty('--cme-mobile-section-padding', `${mb.tokens.sectionPadding}px`);
  el.style.setProperty('--cme-mobile-line-height-heading', String(mb.tokens.lineHeightHeading));
  el.style.setProperty('--cme-mobile-line-height-body', String(mb.tokens.lineHeightBody));
  el.style.setProperty('--cme-mobile-letter-spacing-heading', `${mb.tokens.letterSpacingHeading}px`);
  // Mobile logo height
  el.style.setProperty('--cme-logo-height-mobile', `${mb.tokens.logoHeightMobile}px`);
  // Mobile header padding
  el.style.setProperty('--cme-mobile-header-padding-top', `${mb.tokens.headerPaddingTop}px`);
  el.style.setProperty('--cme-mobile-header-padding-bottom', `${mb.tokens.headerPaddingBottom}px`);
  
  // Mobile diamonds
  (Object.keys(mb.diamonds) as DiamondId[]).forEach(id => {
    const c = mb.diamonds[id];
    el.style.setProperty(`--cme-mobile-diamond-${id}-size`, `${c.size}vw`);
    el.style.setProperty(`--cme-mobile-diamond-${id}-offset-x`, `${c.offsetX}vw`);
    el.style.setProperty(`--cme-mobile-diamond-${id}-offset-y`, `${c.offsetY}vh`);
  });
  
  // Mobile section heights
  (Object.keys(mb.sectionHeights) as SectionId[]).forEach(id => {
    const c = mb.sectionHeights[id];
    el.style.setProperty(`--cme-mobile-section-${id}-pt`, `${c.paddingTop}px`);
    el.style.setProperty(`--cme-mobile-section-${id}-pb`, `${c.paddingBottom}px`);
  });
}

// ── Apply for a specific breakpoint (used in iframe preview) ──────────

export function applyBreakpointToElement(el: HTMLElement, config: FullResponsiveConfig, breakpoint: Breakpoint) {
  const bp = config[breakpoint];
  
  // Typography
  el.style.setProperty('--cme-font-size-h1', `${bp.tokens.fontSizeH1}px`);
  el.style.setProperty('--cme-font-size-h2', `${bp.tokens.fontSizeH2}px`);
  el.style.setProperty('--cme-font-size-h3', `${bp.tokens.fontSizeH3}px`);
  el.style.setProperty('--cme-font-size-h4', `${bp.tokens.fontSizeH4}px`);
  el.style.setProperty('--cme-font-size-body', `${bp.tokens.fontSizeBody}px`);
  el.style.setProperty('--cme-font-size-small', `${bp.tokens.fontSizeSmall}px`);
  // Derived inline sizes (proportional to body/small)
  el.style.setProperty('--cme-font-size-xs', `${bp.tokens.fontSizeSmall}px`);
  el.style.setProperty('--cme-font-size-sm', `${Math.round(bp.tokens.fontSizeSmall + (bp.tokens.fontSizeBody - bp.tokens.fontSizeSmall) * 0.5)}px`);
  el.style.setProperty('--cme-font-size-base', `${bp.tokens.fontSizeBody}px`);
  el.style.setProperty('--cme-font-size-lg', `${Math.round(bp.tokens.fontSizeBody * 1.125)}px`);
  el.style.setProperty('--cme-font-size-xl', `${Math.round(bp.tokens.fontSizeBody * 1.25)}px`);
  el.style.setProperty('--cme-font-size-2xl', `${Math.round(bp.tokens.fontSizeBody * 1.5)}px`);
  el.style.setProperty('--cme-font-weight-heading', String(bp.tokens.fontWeightHeading));
  el.style.setProperty('--cme-font-weight-body', String(bp.tokens.fontWeightBody));
  el.style.setProperty('--cme-line-height-heading', String(bp.tokens.lineHeightHeading));
  el.style.setProperty('--cme-line-height-body', String(bp.tokens.lineHeightBody));
  el.style.setProperty('--cme-letter-spacing-heading', `${bp.tokens.letterSpacingHeading}px`);
  
  // Colors (shared across breakpoints but still settable)
  el.style.setProperty('--cme-color-primary', bp.tokens.colorPrimary);
  el.style.setProperty('--cme-color-dark', bp.tokens.colorDark);
  el.style.setProperty('--cme-color-gray', bp.tokens.colorGray);
  el.style.setProperty('--cme-color-accent', bp.tokens.colorAccent);
  el.style.setProperty('--cme-color-bg', bp.tokens.colorBg);
  el.style.setProperty('--cme-font-family', `'${bp.tokens.fontFamily}', sans-serif`);
  
  // Layout
  el.style.setProperty('--cme-border-radius', `${bp.tokens.borderRadius}px`);
  el.style.setProperty('--radius', `${bp.tokens.borderRadius / 16}rem`);
  el.style.setProperty('--cme-section-padding', `${bp.tokens.sectionPadding}px`);
  el.style.setProperty('--cme-container-max-width', `${bp.tokens.containerMaxWidth}px`);
  el.style.setProperty('--cme-diamond-radius', String(bp.tokens.diamondRadius));
  
  // Also set the prefixed tablet/mobile variables so CSS media queries in the iframe
  // (which fire based on the iframe's physical width) use the correct breakpoint values
  el.style.setProperty('--cme-tablet-font-size-h1', `${bp.tokens.fontSizeH1}px`);
  el.style.setProperty('--cme-tablet-font-size-h2', `${bp.tokens.fontSizeH2}px`);
  el.style.setProperty('--cme-tablet-font-size-h3', `${bp.tokens.fontSizeH3}px`);
  el.style.setProperty('--cme-tablet-font-size-h4', `${bp.tokens.fontSizeH4}px`);
  el.style.setProperty('--cme-tablet-font-size-body', `${bp.tokens.fontSizeBody}px`);
  el.style.setProperty('--cme-tablet-font-size-small', `${bp.tokens.fontSizeSmall}px`);
  el.style.setProperty('--cme-tablet-font-size-xs', `${bp.tokens.fontSizeSmall}px`);
  el.style.setProperty('--cme-tablet-font-size-sm', `${Math.round(bp.tokens.fontSizeSmall + (bp.tokens.fontSizeBody - bp.tokens.fontSizeSmall) * 0.5)}px`);
  el.style.setProperty('--cme-tablet-font-size-base', `${bp.tokens.fontSizeBody}px`);
  el.style.setProperty('--cme-tablet-font-size-lg', `${Math.round(bp.tokens.fontSizeBody * 1.125)}px`);
  el.style.setProperty('--cme-tablet-font-size-xl', `${Math.round(bp.tokens.fontSizeBody * 1.25)}px`);
  el.style.setProperty('--cme-tablet-font-size-2xl', `${Math.round(bp.tokens.fontSizeBody * 1.5)}px`);
  el.style.setProperty('--cme-tablet-line-height-heading', String(bp.tokens.lineHeightHeading));
  el.style.setProperty('--cme-tablet-line-height-body', String(bp.tokens.lineHeightBody));
  el.style.setProperty('--cme-tablet-letter-spacing-heading', `${bp.tokens.letterSpacingHeading}px`);
  el.style.setProperty('--cme-mobile-font-size-h1', `${bp.tokens.fontSizeH1}px`);
  el.style.setProperty('--cme-mobile-font-size-h2', `${bp.tokens.fontSizeH2}px`);
  el.style.setProperty('--cme-mobile-font-size-h3', `${bp.tokens.fontSizeH3}px`);
  el.style.setProperty('--cme-mobile-font-size-h4', `${bp.tokens.fontSizeH4}px`);
  el.style.setProperty('--cme-mobile-font-size-body', `${bp.tokens.fontSizeBody}px`);
  el.style.setProperty('--cme-mobile-font-size-small', `${bp.tokens.fontSizeSmall}px`);
  el.style.setProperty('--cme-mobile-font-size-xs', `${bp.tokens.fontSizeSmall}px`);
  el.style.setProperty('--cme-mobile-font-size-sm', `${Math.round(bp.tokens.fontSizeSmall + (bp.tokens.fontSizeBody - bp.tokens.fontSizeSmall) * 0.5)}px`);
  el.style.setProperty('--cme-mobile-font-size-base', `${bp.tokens.fontSizeBody}px`);
  el.style.setProperty('--cme-mobile-font-size-lg', `${Math.round(bp.tokens.fontSizeBody * 1.125)}px`);
  el.style.setProperty('--cme-mobile-font-size-xl', `${Math.round(bp.tokens.fontSizeBody * 1.25)}px`);
  el.style.setProperty('--cme-mobile-font-size-2xl', `${Math.round(bp.tokens.fontSizeBody * 1.5)}px`);
  el.style.setProperty('--cme-mobile-line-height-heading', String(bp.tokens.lineHeightHeading));
  el.style.setProperty('--cme-mobile-line-height-body', String(bp.tokens.lineHeightBody));
  el.style.setProperty('--cme-mobile-letter-spacing-heading', `${bp.tokens.letterSpacingHeading}px`);
  
  // Logo – use the breakpoint-specific value
  const logoHeight = breakpoint === 'desktop' ? bp.tokens.logoHeightDesktop
    : breakpoint === 'tablet' ? bp.tokens.logoHeightTablet
    : bp.tokens.logoHeightMobile;
  el.style.setProperty('--cme-logo-height-desktop', `${logoHeight}px`);
  el.style.setProperty('--cme-logo-height-tablet', `${logoHeight}px`);
  el.style.setProperty('--cme-logo-height-mobile', `${logoHeight}px`);
  
  // Header padding – apply for the active breakpoint
  el.style.setProperty('--cme-header-padding-top', `${bp.tokens.headerPaddingTop}px`);
  el.style.setProperty('--cme-header-padding-bottom', `${bp.tokens.headerPaddingBottom}px`);
  el.style.setProperty('--cme-tablet-header-padding-top', `${bp.tokens.headerPaddingTop}px`);
  el.style.setProperty('--cme-tablet-header-padding-bottom', `${bp.tokens.headerPaddingBottom}px`);
  el.style.setProperty('--cme-mobile-header-padding-top', `${bp.tokens.headerPaddingTop}px`);
  el.style.setProperty('--cme-mobile-header-padding-bottom', `${bp.tokens.headerPaddingBottom}px`);
  
  // Diamonds
  (Object.keys(bp.diamonds) as DiamondId[]).forEach(id => {
    const c = bp.diamonds[id];
    el.style.setProperty(`--cme-diamond-${id}-size`, `${c.size}vw`);
    el.style.setProperty(`--cme-diamond-${id}-offset-x`, `${c.offsetX}vw`);
    el.style.setProperty(`--cme-diamond-${id}-offset-y`, `${c.offsetY}vh`);
    el.style.setProperty(`--cme-diamond-${id}-rotate`, `${c.rotate}deg`);
  });
  
  // Section heights
  (Object.keys(bp.sectionHeights) as SectionId[]).forEach(id => {
    const c = bp.sectionHeights[id];
    el.style.setProperty(`--cme-section-${id}-pt`, `${c.paddingTop}px`);
    el.style.setProperty(`--cme-section-${id}-pb`, `${c.paddingBottom}px`);
  });
}

// ── Hook ──────────────────────────────────────────────────────────────

export function useResponsiveTokens() {
  const [config, setConfig] = useState<FullResponsiveConfig>(() => loadResponsiveConfig());
  const [activeBreakpoint, setActiveBreakpoint] = useState<Breakpoint>('desktop');

  // Apply on mount
  useEffect(() => {
    applyResponsiveConfigToRoot(config);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for cross-tab updates
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === RESPONSIVE_STORAGE_KEY && e.newValue) {
        try {
          const incoming = loadResponsiveConfig();
          setConfig(incoming);
          applyResponsiveConfigToRoot(incoming);
        } catch { /* ignore */ }
      }
    };
    const onCustom = ((e: CustomEvent) => {
      // Skip if this event was triggered by our own save (prevents feedback loop)
      if (_isSavingFromHook) return;
      if (e.detail?.key === RESPONSIVE_STORAGE_KEY) {
        setConfig(loadResponsiveConfig());
      }
    }) as EventListener;

    window.addEventListener('storage', onStorage);
    window.addEventListener('cme-token-change', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cme-token-change', onCustom);
    };
  }, []);

  const updateTokenForBreakpoint = useCallback(<K extends keyof DesignTokens>(
    breakpoint: Breakpoint, key: K, value: DesignTokens[K]
  ) => {
    setConfig(prev => {
      const next = {
        ...prev,
        [breakpoint]: {
          ...prev[breakpoint],
          tokens: { ...prev[breakpoint].tokens, [key]: value },
        },
      };
      applyResponsiveConfigToRoot(next);
      saveResponsiveConfig(next, true);
      return next;
    });
  }, []);

  const updateDiamondForBreakpoint = useCallback((
    breakpoint: Breakpoint, id: DiamondId, key: keyof DiamondConfig, value: number
  ) => {
    setConfig(prev => {
      const next = {
        ...prev,
        [breakpoint]: {
          ...prev[breakpoint],
          diamonds: {
            ...prev[breakpoint].diamonds,
            [id]: { ...prev[breakpoint].diamonds[id], [key]: value },
          },
        },
      };
      applyResponsiveConfigToRoot(next);
      saveResponsiveConfig(next, true);
      return next;
    });
  }, []);

  const updateSectionHeightForBreakpoint = useCallback((
    breakpoint: Breakpoint, id: SectionId, key: keyof SectionHeightConfig, value: number
  ) => {
    setConfig(prev => {
      const next = {
        ...prev,
        [breakpoint]: {
          ...prev[breakpoint],
          sectionHeights: {
            ...prev[breakpoint].sectionHeights,
            [id]: { ...prev[breakpoint].sectionHeights[id], [key]: value },
          },
        },
      };
      applyResponsiveConfigToRoot(next);
      saveResponsiveConfig(next, true);
      return next;
    });
  }, []);

  const resetBreakpoint = useCallback((breakpoint: Breakpoint) => {
    const defaults = getDefaultResponsiveConfig();
    setConfig(prev => {
      const next = { ...prev, [breakpoint]: defaults[breakpoint] };
      applyResponsiveConfigToRoot(next);
      saveResponsiveConfig(next, true);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    const defaults = getDefaultResponsiveConfig();
    setConfig(defaults);
    localStorage.removeItem(RESPONSIVE_STORAGE_KEY);
    applyResponsiveConfigToRoot(defaults);
  }, []);

  return {
    config,
    activeBreakpoint,
    setActiveBreakpoint,
    updateTokenForBreakpoint,
    updateDiamondForBreakpoint,
    updateSectionHeightForBreakpoint,
    resetBreakpoint,
    resetAll,
    currentTokens: config[activeBreakpoint],
  };
}
