import { describe, it, expect } from "vitest";
import { buildDocument, collectRoutes } from "./prerender";
import { SEO_PAGES } from "../server/seoPageData";
import { EN_PATHS } from "../shared/routes";

const TEMPLATE = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <title>Platzhalter</title>
    <meta name="description" content="Platzhalter" />
    <!--SEO_BLOCK_START-->
    <meta property="og:title" content="alt" />
    <!--SEO_BLOCK_END-->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index-abc.js"></script>
  </body>
</html>`;

describe("collectRoutes", () => {
  it("enthaelt jede Seite aus den SEO-Daten", () => {
    const routes = collectRoutes();
    for (const de of Object.keys(SEO_PAGES)) {
      expect(routes, `${de} fehlt`).toContain(de);
    }
  });

  it("enthaelt jede englische Seite", () => {
    const routes = collectRoutes();
    for (const en of EN_PATHS) {
      expect(routes, `${en} fehlt`).toContain(en);
    }
  });

  it("enthaelt keine Route doppelt", () => {
    const routes = collectRoutes();
    expect(new Set(routes).size).toBe(routes.length);
  });
});

describe("buildDocument", () => {
  it("setzt Titel, Canonical und hreflang aus seoHead", () => {
    const doc = buildDocument(TEMPLATE, "/fertigung/leiterplatten", "<p>Inhalt</p>");
    expect(doc).toContain("<title>Leiterplatten bestücken – SMD &amp; THT | CME Dortmund</title>");
    expect(doc).toContain('rel="canonical" href="https://control-motion.de/fertigung/leiterplatten/"');
    expect(doc).toContain('hreflang="en" href="https://control-motion.de/en/manufacturing/printed-circuit-boards/"');
  });

  it("entfernt Titel und Beschreibung der Huelle", () => {
    const doc = buildDocument(TEMPLATE, "/kontakt", "<p>x</p>");
    expect(doc).not.toContain("<title>Platzhalter</title>");
    expect(doc).not.toContain('content="Platzhalter"');
    expect(doc.match(/<title>/g)?.length).toBe(1);
  });

  it("ersetzt den alten SEO-Block vollstaendig", () => {
    const doc = buildDocument(TEMPLATE, "/kontakt", "<p>x</p>");
    expect(doc).not.toContain('content="alt"');
  });

  it("setzt die Sprache des Dokuments", () => {
    expect(buildDocument(TEMPLATE, "/fertigung", "<p>x</p>")).toContain('<html lang="de"');
    expect(buildDocument(TEMPLATE, "/en/manufacturing", "<p>x</p>")).toContain('<html lang="en"');
  });

  it("setzt den gerenderten Inhalt in #root", () => {
    const doc = buildDocument(TEMPLATE, "/kontakt", "<main><h1>Hallo</h1></main>");
    expect(doc).toContain('<div id="root"><main><h1>Hallo</h1></main></div>');
  });

  it("laesst die Asset-Verweise der Huelle unberuehrt", () => {
    const doc = buildDocument(TEMPLATE, "/kontakt", "<p>x</p>");
    expect(doc).toContain('src="/assets/index-abc.js"');
  });

  it("kennzeichnet unbekannte Routen als noindex", () => {
    const doc = buildDocument(TEMPLATE, "/gibtsnicht", "<p>x</p>");
    expect(doc).toContain('content="noindex, follow"');
    expect(doc).not.toContain('rel="canonical"');
  });
});
