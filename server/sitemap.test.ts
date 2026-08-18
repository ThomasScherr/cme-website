import { describe, it, expect } from "vitest";
import { collectSitemapEntries, renderSitemap, escapeXml } from "./sitemap";
import { SEO_PAGES } from "./seoPageData";
import { DE_TO_EN } from "@shared/routes";

const artikel = [
  {
    slug: "sic-und-gan-technologien",
    updatedAt: new Date("2026-03-15T10:00:00Z"),
    publishedAt: new Date("2026-02-01T10:00:00Z"),
    titleEn: "SiC and GaN",
    contentEn: "<p>text</p>",
  },
  {
    slug: "nur-deutsch",
    updatedAt: null,
    publishedAt: new Date("2026-01-05T10:00:00Z"),
    titleEn: null,
    contentEn: null,
  },
];

describe("collectSitemapEntries", () => {
  it("enthaelt jede feste Seite", () => {
    const locs = collectSitemapEntries([]).map(e => e.loc);
    for (const dePath of Object.keys(SEO_PAGES)) {
      const expected = dePath === "/" ? "https://control-motion.de/" : `https://control-motion.de${dePath}/`;
      expect(locs, `${dePath} fehlt`).toContain(expected);
    }
  });

  it("enthaelt jede englische Fassung", () => {
    const locs = collectSitemapEntries([]).map(e => e.loc);
    for (const enPath of Object.values(DE_TO_EN)) {
      expect(locs, `${enPath} fehlt`).toContain(`https://control-motion.de${enPath}/`);
    }
  });

  it("nimmt die frueher fehlenden Seiten mit auf", () => {
    // Diese drei standen nicht in der handgepflegten sitemap.xml.
    const locs = collectSitemapEntries([]).map(e => e.loc);
    expect(locs).toContain("https://control-motion.de/elektronikentwicklung/");
    expect(locs).toContain("https://control-motion.de/elektronikentwicklung-muenchen/");
    expect(locs).toContain("https://control-motion.de/media-center/");
  });

  it("nimmt Fachartikel mit lastmod auf", () => {
    const entries = collectSitemapEntries(artikel);
    const de = entries.find(e => e.loc.endsWith("/insights/sic-und-gan-technologien/"));
    expect(de).toBeTruthy();
    expect(de!.lastmod).toBe("2026-03-15");
  });

  it("faellt fuer lastmod auf das Veroeffentlichungsdatum zurueck", () => {
    const entry = collectSitemapEntries(artikel).find(e => e.loc.endsWith("/insights/nur-deutsch/"));
    expect(entry!.lastmod).toBe("2026-01-05");
  });

  it("nimmt englische Artikel nur auf, wenn es sie inhaltlich gibt", () => {
    const locs = collectSitemapEntries(artikel).map(e => e.loc);
    expect(locs).toContain("https://control-motion.de/en/insights/sic-und-gan-technologien/");
    expect(locs).not.toContain("https://control-motion.de/en/insights/nur-deutsch/");
  });

  it("enthaelt keine URL doppelt", () => {
    const locs = collectSitemapEntries(artikel).map(e => e.loc);
    expect(new Set(locs).size).toBe(locs.length);
  });

  it("gibt der Startseite die hoechste Wichtigkeit", () => {
    const start = collectSitemapEntries([]).find(e => e.loc === "https://control-motion.de/");
    expect(start!.priority).toBe("1.0");
  });
});

describe("renderSitemap", () => {
  it("erzeugt gueltiges XML mit passendem Namensraum", () => {
    const xml = renderSitemap(collectSitemapEntries(artikel));
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml.trimEnd().endsWith("</urlset>")).toBe(true);
    expect((xml.match(/<url>/g) || []).length).toBe((xml.match(/<\/url>/g) || []).length);
  });

  it("schreibt lastmod nur, wenn ein Datum vorliegt", () => {
    const xml = renderSitemap([
      { loc: "https://control-motion.de/", changefreq: "weekly", priority: "1.0" },
    ]);
    expect(xml).not.toContain("<lastmod>");
  });

  it("maskiert Sonderzeichen", () => {
    expect(escapeXml("a&b<c>")).toBe("a&amp;b&lt;c&gt;");
  });
});
