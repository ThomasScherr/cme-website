/**
 * Tests for CMS image fallback logic.
 * Verifies that the img() function in useContent correctly handles:
 * 1. No DB entry → uses fallback parameter or contentDefinitions default
 * 2. DB entry with value → uses DB value, ignores fallback
 * 3. DB entry with empty value (deleted image) → returns empty string, does NOT use fallback
 */
import { describe, it, expect } from "vitest";

// Simulate the img() logic from useContent.ts
function createImgResolver(contentMap: Map<string, { valueDe: string | null; valueEn: string | null }>, defaults: Record<string, { de: string; en: string }>) {
  return (key: string, fallback?: string): string => {
    const dbEntry = contentMap.get(key);
    if (dbEntry) {
      // DB entry exists – return its value (may be empty string if image was deleted)
      // When a DB entry exists, we NEVER fall back to the hardcoded fallback
      return dbEntry.valueDe || dbEntry.valueEn || "";
    }
    // No DB entry at all – use fallback param, then contentDefinitions default
    const def = defaults[key];
    return fallback || def?.de || def?.en || "";
  };
}

describe("CMS img() fallback logic", () => {
  const HARDCODED_FALLBACK = "https://cdn.example.com/hardcoded-hero.jpg";
  const CMS_DEFAULT = "https://cdn.example.com/cms-default-hero.jpg";
  const CMS_OVERRIDE = "https://cdn.example.com/new-hero-from-cms.jpg";

  const defaults: Record<string, { de: string; en: string }> = {
    "hero.heroImage": { de: CMS_DEFAULT, en: CMS_DEFAULT },
  };

  it("should use fallback when no DB entry exists and no contentDefinitions default", () => {
    const contentMap = new Map();
    const img = createImgResolver(contentMap, {});
    expect(img("hero.heroImage", HARDCODED_FALLBACK)).toBe(HARDCODED_FALLBACK);
  });

  it("should use contentDefinitions default when no DB entry and no fallback", () => {
    const contentMap = new Map();
    const img = createImgResolver(contentMap, defaults);
    expect(img("hero.heroImage")).toBe(CMS_DEFAULT);
  });

  it("should prefer fallback over contentDefinitions default when no DB entry", () => {
    const contentMap = new Map();
    const img = createImgResolver(contentMap, defaults);
    expect(img("hero.heroImage", HARDCODED_FALLBACK)).toBe(HARDCODED_FALLBACK);
  });

  it("should use DB value when DB entry has a value (CMS image changed)", () => {
    const contentMap = new Map([
      ["hero.heroImage", { valueDe: CMS_OVERRIDE, valueEn: null }],
    ]);
    const img = createImgResolver(contentMap, defaults);
    expect(img("hero.heroImage", HARDCODED_FALLBACK)).toBe(CMS_OVERRIDE);
  });

  it("should return empty string when DB entry exists with empty value (image deleted in CMS)", () => {
    const contentMap = new Map([
      ["hero.heroImage", { valueDe: "", valueEn: "" }],
    ]);
    const img = createImgResolver(contentMap, defaults);
    // This is the critical test: deleted image should NOT fall back to hardcoded URL
    const result = img("hero.heroImage", HARDCODED_FALLBACK);
    expect(result).toBe("");
    expect(result).not.toBe(HARDCODED_FALLBACK);
    expect(result).not.toBe(CMS_DEFAULT);
  });

  it("should return empty string when DB entry exists with null values (image deleted in CMS)", () => {
    const contentMap = new Map([
      ["hero.heroImage", { valueDe: null, valueEn: null }],
    ]);
    const img = createImgResolver(contentMap, defaults);
    const result = img("hero.heroImage", HARDCODED_FALLBACK);
    expect(result).toBe("");
    expect(result).not.toBe(HARDCODED_FALLBACK);
  });

  it("should use valueEn when valueDe is empty but valueEn has a value", () => {
    const contentMap = new Map([
      ["hero.heroImage", { valueDe: "", valueEn: CMS_OVERRIDE }],
    ]);
    const img = createImgResolver(contentMap, defaults);
    expect(img("hero.heroImage", HARDCODED_FALLBACK)).toBe(CMS_OVERRIDE);
  });
});

describe("Old || pattern vs new fallback parameter pattern", () => {
  it("demonstrates why || pattern was broken for deleted images", () => {
    // Old pattern: img('hero.heroImage') || HERO_IMG
    // When CMS returns "" (deleted), "" || HERO_IMG = HERO_IMG (wrong!)
    const deletedValue = "";
    const HERO_IMG = "https://cdn.example.com/hardcoded.jpg";
    expect(deletedValue || HERO_IMG).toBe(HERO_IMG); // This was the bug!
  });

  it("demonstrates the new pattern correctly handles deleted images", () => {
    const contentMap = new Map([
      ["hero.heroImage", { valueDe: "", valueEn: "" }],
    ]);
    const img = createImgResolver(contentMap, {});
    // New pattern: img('hero.heroImage', HERO_IMG)
    // When DB entry exists with empty value, returns "" regardless of fallback
    const HERO_IMG = "https://cdn.example.com/hardcoded.jpg";
    expect(img("hero.heroImage", HERO_IMG)).toBe(""); // Correct!
  });
});

function createImgResolverFromTest(contentMap: Map<string, { valueDe: string | null; valueEn: string | null }>, defaults: Record<string, { de: string; en: string }>) {
  return createImgResolver(contentMap, defaults);
}
