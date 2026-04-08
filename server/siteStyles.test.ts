import { describe, it, expect } from 'vitest';
import { DEFAULT_STYLE_TOKENS, clampToCSS, clampToPx, tokensToCSSVars } from '../shared/styleDefaults';
import type { ClampValue, StyleTokens } from '../shared/styleDefaults';

describe('styleDefaults', () => {
  describe('clampToCSS', () => {
    it('should generate a valid CSS clamp() string', () => {
      const value: ClampValue = { min: 1, vw: 2, offset: 0.5, max: 3 };
      const result = clampToCSS(value);
      expect(result).toBe('clamp(1rem, 0.5rem + 2vw, 3rem)');
    });

    it('should handle zero values', () => {
      const value: ClampValue = { min: 0, vw: 0, offset: 0, max: 0 };
      const result = clampToCSS(value);
      expect(result).toBe('clamp(0rem, 0rem + 0vw, 0rem)');
    });

    it('should handle negative offset', () => {
      const value: ClampValue = { min: 1, vw: 3.1, offset: -0.2, max: 5 };
      const result = clampToCSS(value);
      expect(result).toBe('clamp(1rem, -0.2rem + 3.1vw, 5rem)');
    });
  });

  describe('clampToPx', () => {
    it('should calculate correct pixel value at 1920px viewport', () => {
      const value: ClampValue = { min: 0.875, vw: 0.35, offset: 0.74, max: 1.25 };
      const result = clampToPx(value, 1920);
      // preferred = 0.74 * 16 + (0.35/100) * 1920 = 11.84 + 6.72 = 18.56
      // min = 0.875 * 16 = 14, max = 1.25 * 16 = 20
      // result should be clamped between 14 and 20 → 18.56
      expect(result).toBeCloseTo(18.56, 1);
    });

    it('should clamp to min at small viewport', () => {
      const value: ClampValue = { min: 2, vw: 0.1, offset: 0, max: 5 };
      // At 100px viewport: preferred = 0 + 0.1 = 0.1px, min = 32px
      const result = clampToPx(value, 100);
      expect(result).toBe(32); // 2rem * 16 = 32px
    });

    it('should clamp to max at large viewport', () => {
      const value: ClampValue = { min: 1, vw: 10, offset: 0, max: 3 };
      // At 3840px viewport: preferred = 0 + 384 = 384px, max = 48px
      const result = clampToPx(value, 3840);
      expect(result).toBe(48); // 3rem * 16 = 48px
    });
  });

  describe('tokensToCSSVars', () => {
    it('should return all expected CSS variable keys', () => {
      const vars = tokensToCSSVars(DEFAULT_STYLE_TOKENS);
      expect(vars).toHaveProperty('--fs-h1');
      expect(vars).toHaveProperty('--fs-h2');
      expect(vars).toHaveProperty('--fs-body');
      expect(vars).toHaveProperty('--fs-nav');
      expect(vars).toHaveProperty('--nav-height');
      expect(vars).toHaveProperty('--nav-logo');
      expect(vars).toHaveProperty('--hero-diamond-w');
      expect(vars).toHaveProperty('--space-section');
      expect(vars).toHaveProperty('--btn-px');
      expect(vars).toHaveProperty('--container-px');
    });

    it('should generate valid clamp() values for all properties', () => {
      const vars = tokensToCSSVars(DEFAULT_STYLE_TOKENS);
      Object.values(vars).forEach(val => {
        expect(val).toMatch(/^clamp\(.+rem, .+rem \+ .+vw, .+rem\)$/);
      });
    });
  });

  describe('DEFAULT_STYLE_TOKENS', () => {
    it('should have all required token keys', () => {
      expect(DEFAULT_STYLE_TOKENS).toHaveProperty('fsH1');
      expect(DEFAULT_STYLE_TOKENS).toHaveProperty('fsH2');
      expect(DEFAULT_STYLE_TOKENS).toHaveProperty('fsH3');
      expect(DEFAULT_STYLE_TOKENS).toHaveProperty('fsH4');
      expect(DEFAULT_STYLE_TOKENS).toHaveProperty('fsBodyLg');
      expect(DEFAULT_STYLE_TOKENS).toHaveProperty('fsBody');
      expect(DEFAULT_STYLE_TOKENS).toHaveProperty('fsSmall');
      expect(DEFAULT_STYLE_TOKENS).toHaveProperty('fsXs');
      expect(DEFAULT_STYLE_TOKENS).toHaveProperty('fsNav');
      expect(DEFAULT_STYLE_TOKENS).toHaveProperty('navHeight');
      expect(DEFAULT_STYLE_TOKENS).toHaveProperty('navLogo');
      expect(DEFAULT_STYLE_TOKENS).toHaveProperty('heroDiamondW');
      expect(DEFAULT_STYLE_TOKENS).toHaveProperty('sectionColors');
      expect(DEFAULT_STYLE_TOKENS).toHaveProperty('containerMaxWidth');
    });

    it('should have valid section colors', () => {
      expect(DEFAULT_STYLE_TOKENS.sectionColors.length).toBeGreaterThan(0);
      DEFAULT_STYLE_TOKENS.sectionColors.forEach(sc => {
        expect(sc).toHaveProperty('id');
        expect(sc).toHaveProperty('label');
        expect(sc).toHaveProperty('bg');
        expect(sc).toHaveProperty('text');
        expect(sc.bg).toMatch(/^#[0-9a-fA-F]{6}$/);
        expect(sc.text).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });

    it('should have nav font size max capped at 1.0625rem to prevent wrapping', () => {
      expect(DEFAULT_STYLE_TOKENS.fsNav.max).toBeLessThanOrEqual(1.0625);
    });

    it('should have reasonable container max width', () => {
      expect(DEFAULT_STYLE_TOKENS.containerMaxWidth).toBeGreaterThanOrEqual(1200);
      expect(DEFAULT_STYLE_TOKENS.containerMaxWidth).toBeLessThanOrEqual(2400);
    });
  });

  describe('JSON serialization roundtrip', () => {
    it('should survive JSON stringify/parse without data loss', () => {
      const json = JSON.stringify(DEFAULT_STYLE_TOKENS);
      const parsed = JSON.parse(json) as StyleTokens;
      expect(parsed.fsH1).toEqual(DEFAULT_STYLE_TOKENS.fsH1);
      expect(parsed.sectionColors).toEqual(DEFAULT_STYLE_TOKENS.sectionColors);
      expect(parsed.containerMaxWidth).toBe(DEFAULT_STYLE_TOKENS.containerMaxWidth);
    });
  });
});
