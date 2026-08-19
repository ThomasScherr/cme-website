import { describe, it, expect } from "vitest";
import { buildDocument, liftHead, headKey, mergeHead } from "./buildDocument";

const HUELLE = `<!doctype html>
<html lang="de">
  <head>
    <title>Platzhalter</title>
    <meta name="description" content="Platzhalter" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

describe("liftHead", () => {
  it("nimmt Titel, Meta und Link aus dem Markup", () => {
    const { body, tags } = liftHead(
      '<div>Text<title>Seite</title><meta name="description" content="Kurz"/><link rel="alternate" hreflang="en" href="/en/"/></div>'
    );
    expect(body).toBe("<div>Text</div>");
    expect(tags).toEqual([
      "<title>Seite</title>",
      '<meta name="description" content="Kurz"/>',
      '<link rel="alternate" hreflang="en" href="/en/"/>',
    ]);
  });

  it("laesst strukturierte Daten im Koerper stehen", () => {
    const markup = '<script type="application/ld+json">{"@type":"FAQPage"}</script><p>Text</p>';
    const { body, tags } = liftHead(markup);
    expect(body).toBe(markup);
    expect(tags).toEqual([]);
  });

  it("laesst Markup ohne Kopfdaten unveraendert", () => {
    const markup = "<main><h1>Kontakt</h1><p>Alter Hellweg 48</p></main>";
    expect(liftHead(markup).body).toBe(markup);
  });
});

describe("headKey", () => {
  it("erkennt gleiche Angaben unabhaengig von der Schreibweise", () => {
    expect(headKey("<title>A</title>")).toBe(headKey("<title>B</title>"));
    expect(headKey('<meta name="description" content="A" />')).toBe(
      headKey('<meta name="description" content="B"/>')
    );
    expect(headKey('<meta property="og:title" content="A" />')).toBe("meta:og:title");
  });

  it("haelt hreflang-Varianten auseinander", () => {
    expect(headKey('<link rel="alternate" hreflang="de" href="/" />')).not.toBe(
      headKey('<link rel="alternate" hreflang="en" href="/en/" />')
    );
  });

  it("unterscheidet canonical von alternate", () => {
    expect(headKey('<link rel="canonical" href="/" />')).toBe("link:canonical");
  });
});

describe("mergeHead", () => {
  it("laesst die Seite gewinnen und ergaenzt nur, was fehlt", () => {
    const merged = mergeHead(
      ["<title>Aus der Seite</title>"],
      '<title>Aus seoPageData</title>\n<link rel="canonical" href="https://control-motion.de/x/" />'
    );
    expect(merged).toContain("<title>Aus der Seite</title>");
    expect(merged).not.toContain("Aus seoPageData");
    expect(merged).toContain('rel="canonical"');
  });

  it("stellt den Titel an den Anfang", () => {
    const merged = mergeHead(
      ['<meta name="description" content="Kurz" />', "<title>Seite</title>"],
      ""
    );
    expect(merged.startsWith("<title>Seite</title>")).toBe(true);
  });

  it("nimmt den Rueckfall vollstaendig, wenn die Seite nichts liefert", () => {
    const merged = mergeHead([], '<title>Rueckfall</title>\n<meta name="robots" content="index, follow" />');
    expect(merged).toContain("<title>Rueckfall</title>");
    expect(merged).toContain('name="robots"');
  });
});

describe("buildDocument", () => {
  const markup =
    '<div><title>Kontakt &amp; Anfahrt | CME</title><meta name="description" content="Aus der Seite" /><h1>Kontakt</h1></div>';

  it("setzt die Kopfdaten der Seite in den head und nicht in den body", () => {
    const doc = buildDocument(HUELLE, "/kontakt", markup);
    const kopf = doc.slice(0, doc.indexOf("</head>"));
    const koerper = doc.slice(doc.indexOf("</head>"));

    expect(kopf).toContain("<title>Kontakt &amp; Anfahrt | CME</title>");
    expect(kopf).toContain('content="Aus der Seite"');
    expect(koerper).not.toMatch(/<title/);
    expect(koerper).not.toMatch(/<meta/);
    expect(koerper).toContain("<h1>Kontakt</h1>");
  });

  it("laesst genau einen Titel und eine Beschreibung im Dokument stehen", () => {
    const doc = buildDocument(HUELLE, "/kontakt", markup);
    expect(doc.match(/<title/g)).toHaveLength(1);
    expect(doc.match(/<meta\s+name="description"/g)).toHaveLength(1);
  });

  it("ergaenzt Canonical und og:url, die die Seite selbst nicht setzt", () => {
    const doc = buildDocument(HUELLE, "/kontakt", markup);
    expect(doc).toContain('<link rel="canonical" href="https://control-motion.de/kontakt/" />');
    expect(doc).toContain('property="og:url" content="https://control-motion.de/kontakt/"');
  });

  it("faellt auf seoPageData zurueck, wenn die Seite keine Kopfdaten liefert", () => {
    const doc = buildDocument(HUELLE, "/kontakt", "<div><h1>Kontakt</h1></div>");
    expect(doc).toContain("<title>Kontakt | CME Control Motion Electronics</title>");
  });

  it("setzt die Dokumentsprache aus der Route", () => {
    expect(buildDocument(HUELLE, "/en/contact", markup)).toContain('<html lang="en"');
    expect(buildDocument(HUELLE, "/kontakt", markup)).toContain('<html lang="de"');
  });
});
