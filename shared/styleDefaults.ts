/**
 * Default style tokens for the CME website.
 * These are the CSS custom property values that the Stylesheet Editor controls.
 * Each value is a CSS clamp() expression or a color string.
 *
 * Structure mirrors the CSS variables in index.css.
 * When the DB has no saved styles, these defaults are used.
 */

// ── Type definitions ────────────────────────────────────────────

export interface ClampValue {
  /** Minimum value in rem */
  min: number;
  /** vw coefficient (e.g. 2.8 means 2.8vw) */
  vw: number;
  /** rem offset added to the vw part */
  offset: number;
  /** Maximum value in rem */
  max: number;
}

export interface SectionColor {
  /** Section identifier */
  id: string;
  /** Display label */
  label: string;
  /** Background color (any CSS color) */
  bg: string;
  /** Text color (any CSS color) */
  text: string;
}

export interface StyleTokens {
  // ── Typography ──
  fsH1: ClampValue;
  fsH2: ClampValue;
  fsH3: ClampValue;
  fsH4: ClampValue;
  fsBodyLg: ClampValue;
  fsBody: ClampValue;
  fsSmall: ClampValue;
  fsXs: ClampValue;
  fsNav: ClampValue;
  fsNavDropdown: ClampValue;
  fsFooter: ClampValue;
  fsFooterHeading: ClampValue;

  // ── Navigation ──
  navHeight: ClampValue;
  navLogo: ClampValue;
  navGap: ClampValue;
  navItemPx: ClampValue;
  navItemPy: ClampValue;
  navDropdownMinW: ClampValue;
  navDropdownItemPx: ClampValue;
  navDropdownItemPy: ClampValue;

  // ── Footer ──
  footerPadY: ClampValue;
  footerLogo: ClampValue;
  footerMaxW: number; // px value
  footerColGap: ClampValue;
  footerRowGap: ClampValue;
  footerBottomPadY: ClampValue;

  // ── Hero ──
  heroDiamondW: ClampValue;
  heroDiamondH: ClampValue;
  heroAccentDiamond: ClampValue;
  heroImageDiamond: ClampValue;
  heroContentPadTop: ClampValue;
  heroContentPadBottom: ClampValue;
  heroDiamondMarginTop: ClampValue;
  heroDiamondMarginRight: ClampValue;
  heroDiamondMarginLeft: ClampValue;
  heroDiamondBorderRadius: ClampValue;

  // ── Spacing ──
  spaceSection: ClampValue;
  spaceSectionSm: ClampValue;
  spaceSectionHeader: ClampValue;
  spaceGapLg: ClampValue;
  spaceGapMd: ClampValue;
  spaceGapSm: ClampValue;
  spaceGapXs: ClampValue;

  // ── Components ──
  btnPx: ClampValue;
  btnPy: ClampValue;
  cardPad: ClampValue;
  iconBox: ClampValue;
  iconSize: ClampValue;

  // ── Container ──
  containerPx: ClampValue;
  containerMaxWidth: number; // px value

  // ── Section Colors ──
  sectionColors: SectionColor[];
}

// ── Default values (matching current index.css) ─────────────────

export const DEFAULT_STYLE_TOKENS: StyleTokens = {
  // Typography
  fsH1:     { min: 1.875, vw: 2.8,  offset: 0.8,  max: 5 },
  fsH2:     { min: 1.5,   vw: 1.8,  offset: 0.8,  max: 3.5 },
  fsH3:     { min: 1.25,  vw: 1.2,  offset: 0.8,  max: 2.5 },
  fsH4:     { min: 1.0625, vw: 0.75, offset: 0.78, max: 1.875 },
  fsBodyLg: { min: 0.9375, vw: 0.55, offset: 0.73, max: 1.5 },
  fsBody:   { min: 0.875, vw: 0.35, offset: 0.74, max: 1.25 },
  fsSmall:  { min: 0.75,  vw: 0.28, offset: 0.64, max: 1.0625 },
  fsXs:     { min: 0.6875, vw: 0.23, offset: 0.6,  max: 0.9375 },
  fsNav:    { min: 0.8125, vw: 0.35, offset: 0.6,  max: 1.0625 },
  fsNavDropdown: { min: 0.75, vw: 0.28, offset: 0.58, max: 1 },
  fsFooter:       { min: 0.75, vw: 0.28, offset: 0.64, max: 1.0625 },
  fsFooterHeading: { min: 0.6875, vw: 0.23, offset: 0.6, max: 0.9375 },

  // Navigation
  navHeight:  { min: 4,    vw: 5.2,  offset: 2,    max: 8.75 },
  navLogo:    { min: 2.5,  vw: 5.2,  offset: 0.5,  max: 7.5 },
  navGap:     { min: 0.25, vw: 0.8,  offset: 0.1,  max: 1.5 },
  navItemPx:  { min: 0.5,  vw: 0.4,  offset: 0.3,  max: 1.25 },
  navItemPy:  { min: 0.375, vw: 0.2, offset: 0.3,  max: 0.75 },
  navDropdownMinW: { min: 12, vw: 2, offset: 10, max: 20 },
  navDropdownItemPx: { min: 0.75, vw: 0.3, offset: 0.5, max: 1.5 },
  navDropdownItemPy: { min: 0.5,  vw: 0.2, offset: 0.4, max: 1 },

  // Footer
  footerPadY:      { min: 3,    vw: 5.7,  offset: 0.8,  max: 10 },
  footerLogo:      { min: 2.5,  vw: 5.2,  offset: 0.5,  max: 7.5 },
  footerMaxW:      1200,
  footerColGap:    { min: 1.5,  vw: 3.9,  offset: 0,    max: 6 },
  footerRowGap:    { min: 0.25, vw: 0.3,  offset: 0.15, max: 0.625 },
  footerBottomPadY: { min: 0.75, vw: 1.2, offset: 0.3,  max: 2 },

  // Hero
  heroDiamondW:     { min: 17.5,  vw: 24,  offset: 8,  max: 37.5 },
  heroDiamondH:     { min: 23.75, vw: 34,  offset: 10, max: 46.875 },
  heroAccentDiamond: { min: 12.5, vw: 19,  offset: 5,  max: 26.25 },
  heroImageDiamond:  { min: 13.75, vw: 20, offset: 6,  max: 28.125 },
  heroContentPadTop:     { min: 4,   vw: 5.2,  offset: 2,    max: 8.75 },
  heroContentPadBottom:  { min: 3,   vw: 5.7,  offset: 0.8,  max: 10 },
  heroDiamondMarginTop:  { min: -1.5, vw: 0,   offset: -0.8125, max: 0 },
  heroDiamondMarginRight: { min: 0,   vw: 0.3, offset: 0.1,  max: 0.5 },
  heroDiamondMarginLeft:  { min: 1,   vw: 0.5, offset: 1,    max: 2.5 },
  heroDiamondBorderRadius: { min: 0.5, vw: 0.3, offset: 0.3, max: 1.25 },

  // Spacing
  spaceSection:       { min: 3,    vw: 5.7,  offset: 0.8,  max: 10 },
  spaceSectionSm:     { min: 2,    vw: 3.6,  offset: 0.6,  max: 6 },
  spaceSectionHeader: { min: 2,    vw: 3.6,  offset: 0.6,  max: 6 },
  spaceGapLg:         { min: 1.5,  vw: 3.9,  offset: 0,    max: 6 },
  spaceGapMd:         { min: 1,    vw: 1.8,  offset: 0.3,  max: 3 },
  spaceGapSm:         { min: 0.75, vw: 1.2,  offset: 0.3,  max: 2 },
  spaceGapXs:         { min: 0.5,  vw: 0.9,  offset: 0.15, max: 1.5 },

  // Components
  btnPx:    { min: 1.25,  vw: 1.2,  offset: 0.8,  max: 2.5 },
  btnPy:    { min: 0.625, vw: 0.45, offset: 0.45, max: 1.125 },
  cardPad:  { min: 1,     vw: 1.8,  offset: 0.3,  max: 3 },
  iconBox:  { min: 2.25,  vw: 1.7,  offset: 1.6,  max: 4 },
  iconSize: { min: 1.125, vw: 0.85, offset: 0.8,  max: 2 },

  // Container
  containerPx:       { min: 1,  vw: 3.1,  offset: -0.2, max: 5 },
  containerMaxWidth: 1800,

  // Section Colors
  sectionColors: [
    { id: "hero",     label: "Hero",              bg: "#ffffff", text: "#1a1a2e" },
    { id: "stats",    label: "Statistiken",        bg: "#f8f9fa", text: "#1a1a2e" },
    { id: "services", label: "Leistungen",         bg: "#ffffff", text: "#1a1a2e" },
    { id: "usp",      label: "Warum CME?",         bg: "#1a1a2e", text: "#ffffff" },
    { id: "process",  label: "Unser Prozess",      bg: "#f8f9fa", text: "#1a1a2e" },
    { id: "markets",  label: "Märkte",             bg: "#ffffff", text: "#1a1a2e" },
    { id: "contact",  label: "Kontakt",            bg: "#f8f9fa", text: "#1a1a2e" },
    { id: "footer",   label: "Footer",             bg: "#0a0a1a", text: "#e0e0e0" },
    { id: "nav",      label: "Navigation",         bg: "#ffffff", text: "#1a1a2e" },
  ],
};

/**
 * Convert a ClampValue to a CSS clamp() string
 */
export function clampToCSS(v: ClampValue): string {
  return `clamp(${v.min}rem, ${v.offset}rem + ${v.vw}vw, ${v.max}rem)`;
}

/**
 * Convert a full StyleTokens object to a flat CSS variable map
 */
export function tokensToCSSVars(tokens: StyleTokens): Record<string, string> {
  return {
    "--fs-h1": clampToCSS(tokens.fsH1),
    "--fs-h2": clampToCSS(tokens.fsH2),
    "--fs-h3": clampToCSS(tokens.fsH3),
    "--fs-h4": clampToCSS(tokens.fsH4),
    "--fs-body-lg": clampToCSS(tokens.fsBodyLg),
    "--fs-body": clampToCSS(tokens.fsBody),
    "--fs-small": clampToCSS(tokens.fsSmall),
    "--fs-xs": clampToCSS(tokens.fsXs),
    "--fs-nav": clampToCSS(tokens.fsNav),
    "--fs-nav-dropdown": clampToCSS(tokens.fsNavDropdown),
    "--fs-footer": clampToCSS(tokens.fsFooter),
    "--fs-footer-heading": clampToCSS(tokens.fsFooterHeading),
    "--nav-height": clampToCSS(tokens.navHeight),
    "--nav-logo": clampToCSS(tokens.navLogo),
    "--nav-gap": clampToCSS(tokens.navGap),
    "--nav-item-px": clampToCSS(tokens.navItemPx),
    "--nav-item-py": clampToCSS(tokens.navItemPy),
    "--nav-dd-min-w": clampToCSS(tokens.navDropdownMinW),
    "--nav-dd-item-px": clampToCSS(tokens.navDropdownItemPx),
    "--nav-dd-item-py": clampToCSS(tokens.navDropdownItemPy),
    "--footer-pad-y": clampToCSS(tokens.footerPadY),
    "--footer-logo": clampToCSS(tokens.footerLogo),
    "--footer-col-gap": clampToCSS(tokens.footerColGap),
    "--footer-row-gap": clampToCSS(tokens.footerRowGap),
    "--footer-bottom-pad-y": clampToCSS(tokens.footerBottomPadY),
    "--hero-diamond-w": clampToCSS(tokens.heroDiamondW),
    "--hero-diamond-h": clampToCSS(tokens.heroDiamondH),
    "--hero-accent-diamond": clampToCSS(tokens.heroAccentDiamond),
    "--hero-image-diamond": clampToCSS(tokens.heroImageDiamond),
    "--hero-content-pad-top": clampToCSS(tokens.heroContentPadTop),
    "--hero-content-pad-bottom": clampToCSS(tokens.heroContentPadBottom),
    "--hero-diamond-mt": clampToCSS(tokens.heroDiamondMarginTop),
    "--hero-diamond-mr": clampToCSS(tokens.heroDiamondMarginRight),
    "--hero-diamond-ml": clampToCSS(tokens.heroDiamondMarginLeft),
    "--hero-diamond-radius": clampToCSS(tokens.heroDiamondBorderRadius),
    "--space-section": clampToCSS(tokens.spaceSection),
    "--space-section-sm": clampToCSS(tokens.spaceSectionSm),
    "--space-section-header": clampToCSS(tokens.spaceSectionHeader),
    "--space-gap-lg": clampToCSS(tokens.spaceGapLg),
    "--space-gap-md": clampToCSS(tokens.spaceGapMd),
    "--space-gap-sm": clampToCSS(tokens.spaceGapSm),
    "--space-gap-xs": clampToCSS(tokens.spaceGapXs),
    "--btn-px": clampToCSS(tokens.btnPx),
    "--btn-py": clampToCSS(tokens.btnPy),
    "--card-pad": clampToCSS(tokens.cardPad),
    "--icon-box": clampToCSS(tokens.iconBox),
    "--icon-size": clampToCSS(tokens.iconSize),
    "--container-px": clampToCSS(tokens.containerPx),
  };
}

/**
 * Calculate what a clamp value resolves to in pixels at a given viewport width
 */
export function clampToPx(v: ClampValue, viewportWidth: number): number {
  const preferred = v.offset * 16 + (v.vw / 100) * viewportWidth;
  return Math.min(v.max * 16, Math.max(v.min * 16, preferred));
}
