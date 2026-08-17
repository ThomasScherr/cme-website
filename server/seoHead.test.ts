import { describe, it, expect } from "vitest";
import { buildHead, canonicalUrl, escapeHtml } from "./seoHead";

describe("canonicalUrl", () => {
  it("haengt einen Schrägstrich an, passend zu sitemap.xml", () => {
    expect(canonicalUrl("/kontakt")).toBe("https://control-motion.de/kontakt/");
    expect(canonicalUrl("/kontakt/")).toBe("https://control-motion.de/kontakt/");
  });
  it("laesst die Wurzel unveraendert", () => {
    expect(canonicalUrl("/")).toBe("https://control-motion.de/");
  });
  it("wirft Query und Fragment weg", () => {
    expect(canonicalUrl("/kontakt?utm_source=ads#form")).toBe(
      "https://control-motion.de/kontakt/"
    );
  });
});

describe("buildHead", () => {
  it("setzt Titel, Beschreibung und Canonical fuer eine bekannte Route", () => {
    const { tags, lang, notFound } = buildHead("/kontakt");
    expect(notFound).toBe(false);
    expect(lang).toBe("de");
    expect(tags).toContain("<title>Kontakt | CME Control Motion Electronics</title>");
    expect(tags).toContain('<link rel="canonical" href="https://control-motion.de/kontakt/" />');
    expect(tags).toContain('name="description"');
  });

  it("setzt og:url auf dieselbe URL wie canonical", () => {
    const { tags } = buildHead("/fertigung/leiterplatten");
    const canonical = tags.match(/rel="canonical" href="([^"]+)"/)?.[1];
    const ogUrl = tags.match(/property="og:url" content="([^"]+)"/)?.[1];
    expect(canonical).toBeDefined();
    expect(ogUrl).toBe(canonical);
  });

  it("verweist bei zweisprachigen Seiten wechselseitig per hreflang", () => {
    const { tags } = buildHead("/entwicklung");
    expect(tags).toContain('hreflang="de" href="https://control-motion.de/entwicklung/"');
    expect(tags).toContain('hreflang="en" href="https://control-motion.de/en/development/"');
    expect(tags).toContain('hreflang="x-default"');
  });

  it("nimmt fuer EN-Pfade Titel und Beschreibung auf Englisch", () => {
    const { tags, lang } = buildHead("/en/development");
    expect(lang).toBe("en");
    expect(tags).toContain("Electronics Development Dortmund");
    expect(tags).toContain('content="en_US"');
    expect(tags).toContain('<link rel="canonical" href="https://control-motion.de/en/development/" />');
  });

  it("liefert noindex fuer unbekannte Routen", () => {
    const { tags, notFound } = buildHead("/gibt-es-nicht");
    expect(notFound).toBe(true);
    expect(tags).toContain('content="noindex, follow"');
    expect(tags).not.toContain('rel="canonical"');
  });

  it("maskiert Sonderzeichen in Titeln", () => {
    expect(escapeHtml('A & B "C" <D>')).toBe("A &amp; B &quot;C&quot; &lt;D&gt;");
    const { tags } = buildHead("/");
    expect(tags).not.toMatch(/<title>[^<]*&(?!amp;|quot;|lt;|gt;)/);
  });

  it("setzt fuer jede Route in der Sitemap ein Canonical", () => {
    const routen = ["/", "/entwicklung", "/fertigung", "/kontakt", "/karriere", "/insights", "/impressum"];
    for (const r of routen) {
      const { tags, notFound } = buildHead(r);
      expect(notFound, r).toBe(false);
      expect(tags, r).toContain('rel="canonical"');
    }
  });
});
