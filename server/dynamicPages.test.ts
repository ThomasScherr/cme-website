import { describe, it, expect } from "vitest";
import { matchArticleRoute, matchInsightsIndex, buildArticleHead } from "./dynamicPages";

const artikel = {
  slug: "sic-und-gan",
  title: "SiC und GaN",
  titleEn: "SiC and GaN",
  excerpt: "Kurzfassung",
  excerptEn: "Summary",
  metaTitle: "SiC und GaN | CME",
  metaTitleEn: "SiC and GaN | CME",
  metaDescription: "Deutsche Beschreibung",
  metaDescriptionEn: "English description",
  coverImage: "https://ventspire-cdn.b-cdn.net/cme/cover.jpg",
  status: "published",
};

describe("matchArticleRoute", () => {
  it("erkennt deutsche und englische Artikelpfade", () => {
    expect(matchArticleRoute("/insights/sic-und-gan/")).toEqual({ slug: "sic-und-gan", lang: "de" });
    expect(matchArticleRoute("/insights/sic-und-gan")).toEqual({ slug: "sic-und-gan", lang: "de" });
    expect(matchArticleRoute("/en/insights/sic-und-gan/")).toEqual({ slug: "sic-und-gan", lang: "en" });
  });

  it("ignoriert die Uebersicht und fremde Pfade", () => {
    expect(matchArticleRoute("/insights/")).toBeNull();
    expect(matchArticleRoute("/fertigung/leiterplatten/")).toBeNull();
    expect(matchArticleRoute("/insights/a/b/")).toBeNull();
  });

  it("laesst keine Pfadwechsel durch", () => {
    expect(matchArticleRoute("/insights/../../etc/passwd")).toBeNull();
    expect(matchArticleRoute("/insights/Gross")).toBeNull();
  });
});

describe("matchInsightsIndex", () => {
  it("erkennt beide Sprachfassungen", () => {
    expect(matchInsightsIndex("/insights/")).toBe("de");
    expect(matchInsightsIndex("/en/insights")).toBe("en");
    expect(matchInsightsIndex("/insights/sic-und-gan/")).toBeNull();
  });
});

describe("buildArticleHead", () => {
  it("setzt Canonical auf die eigene Sprachfassung", () => {
    expect(buildArticleHead(artikel, "de").tags).toContain(
      'rel="canonical" href="https://control-motion.de/insights/sic-und-gan/"'
    );
    expect(buildArticleHead(artikel, "en").tags).toContain(
      'rel="canonical" href="https://control-motion.de/en/insights/sic-und-gan/"'
    );
  });

  it("nimmt Titel und Beschreibung der jeweiligen Sprache", () => {
    expect(buildArticleHead(artikel, "de").tags).toContain("<title>SiC und GaN | CME</title>");
    expect(buildArticleHead(artikel, "en").tags).toContain("<title>SiC and GaN | CME</title>");
    expect(buildArticleHead(artikel, "en").tags).toContain('content="English description"');
  });

  it("faellt auf die deutschen Angaben zurueck, wenn englische fehlen", () => {
    const ohneEn = { ...artikel, metaTitleEn: null, titleEn: null, metaDescriptionEn: null, excerptEn: null };
    expect(buildArticleHead(ohneEn, "en").tags).toContain("<title>SiC und GaN | CME</title>");
  });

  it("verweist in beide Sprachrichtungen", () => {
    const tags = buildArticleHead(artikel, "de").tags;
    expect(tags).toContain('hreflang="de" href="https://control-motion.de/insights/sic-und-gan/"');
    expect(tags).toContain('hreflang="en" href="https://control-motion.de/en/insights/sic-und-gan/"');
  });

  it("kennzeichnet die Seite als Artikel und nutzt das Titelbild", () => {
    const tags = buildArticleHead(artikel, "de").tags;
    expect(tags).toContain('property="og:type" content="article"');
    expect(tags).toContain('content="https://ventspire-cdn.b-cdn.net/cme/cover.jpg"');
  });

  it("laesst die Beschreibung weg, statt sie leer zu setzen", () => {
    const leer = { ...artikel, metaDescription: null, excerpt: null };
    expect(buildArticleHead(leer, "de").tags).not.toContain('name="description"');
  });
});
