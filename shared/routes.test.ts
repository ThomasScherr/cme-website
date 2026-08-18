import { describe, it, expect } from "vitest";
import {
  ROUTE_PAIRS,
  DYNAMIC_ROUTE_PAIRS,
  DE_TO_EN,
  EN_TO_DE,
  EN_PATHS,
  isEnglishPath,
  langFromPath,
  localizePath,
  normalizePath,
  toDePath,
  toEnPath,
} from "./routes";
import { SEO_PAGES, lookupSeoMeta } from "../server/seoPageData";

describe("shared/routes", () => {
  it("jeder englische Pfad beginnt mit /en und ist eindeutig", () => {
    const seen = new Set<string>();
    for (const { en } of ROUTE_PAIRS) {
      expect(en === "/en" || en.startsWith("/en/")).toBe(true);
      expect(seen.has(en)).toBe(false);
      seen.add(en);
    }
    expect(seen.size).toBe(ROUTE_PAIRS.length);
  });

  it("jeder deutsche Pfad ist eindeutig und ohne abschliessenden Schraegstrich", () => {
    const seen = new Set<string>();
    for (const { de } of ROUTE_PAIRS) {
      expect(de === "/" || !de.endsWith("/")).toBe(true);
      expect(seen.has(de)).toBe(false);
      seen.add(de);
    }
  });

  it("Hin- und Rueckrichtung passen zusammen", () => {
    for (const { de, en } of ROUTE_PAIRS) {
      expect(DE_TO_EN[de]).toBe(en);
      expect(EN_TO_DE[en]).toBe(de);
      expect(toDePath(en)).toBe(de);
      expect(toEnPath(de)).toBe(en);
    }
  });

  it("erkennt die Sprache am Pfad", () => {
    expect(langFromPath("/")).toBe("de");
    expect(langFromPath("/fertigung/")).toBe("de");
    expect(langFromPath("/en")).toBe("en");
    expect(langFromPath("/en/")).toBe("en");
    expect(langFromPath("/en/manufacturing/")).toBe("en");
    // Kein Treffer nur wegen der Zeichenfolge "en"
    expect(langFromPath("/entwicklung")).toBe("de");
    expect(isEnglishPath("/entwicklung")).toBe(false);
  });

  it("normalisiert Schraegstrich, Anker und Abfrage", () => {
    expect(normalizePath("/fertigung/")).toBe("/fertigung");
    expect(normalizePath("/fertigung?a=1")).toBe("/fertigung");
    expect(normalizePath("/fertigung#unten")).toBe("/fertigung");
    expect(normalizePath("/")).toBe("/");
  });

  it("laesst Seiten ohne englische Fassung unveraendert", () => {
    expect(toEnPath("/media-center")).toBeNull();
    expect(toEnPath("/elektronikentwicklung-muenchen")).toBeNull();
    expect(localizePath("/media-center", "en")).toBe("/media-center");
  });

  it("uebersetzt Artikelpfade ueber das Geruest", () => {
    expect(toEnPath("/insights/sic-und-gan")).toBe("/en/insights/sic-und-gan");
    expect(toDePath("/en/insights/sic-und-gan")).toBe("/insights/sic-und-gan");
    expect(DYNAMIC_ROUTE_PAIRS.map(p => p.en)).toContain("/en/insights/:slug");
  });

  it("localizePath ist idempotent", () => {
    for (const { de, en } of ROUTE_PAIRS) {
      expect(localizePath(en, "en")).toBe(en);
      expect(localizePath(de, "de")).toBe(de);
      expect(localizePath(localizePath(de, "en"), "de")).toBe(de);
    }
  });
});

describe("routes und seoPageData stimmen ueberein", () => {
  it("jeder zweisprachige deutsche Pfad hat SEO-Daten", () => {
    for (const { de } of ROUTE_PAIRS) {
      expect(SEO_PAGES[de], `SEO-Daten fehlen fuer ${de}`).toBeTruthy();
    }
  });

  it("jeder englische Pfad wird aufgeloest und liefert englische Texte", () => {
    for (const en of EN_PATHS) {
      const { meta, isEnglish, dePath } = lookupSeoMeta(en);
      expect(meta, `lookupSeoMeta findet ${en} nicht`).toBeTruthy();
      expect(isEnglish).toBe(true);
      expect(SEO_PAGES[dePath]).toBe(meta);
      expect(meta!.enTitle, `enTitle fehlt fuer ${en}`).toBeTruthy();
      expect(meta!.enDescription, `enDescription fehlt fuer ${en}`).toBeTruthy();
    }
  });

  it("enPath in den SEO-Daten kommt aus der gemeinsamen Zuordnung", () => {
    for (const [dePath, meta] of Object.entries(SEO_PAGES)) {
      expect(meta.enPath ?? null).toBe(DE_TO_EN[dePath] ?? null);
    }
  });

  it("auch mit abschliessendem Schraegstrich auffindbar", () => {
    for (const en of EN_PATHS) {
      expect(lookupSeoMeta(`${en}/`).meta, `${en}/ nicht gefunden`).toBeTruthy();
    }
  });
});
