import { describe, it, expect } from "vitest";
import { localizeHref, localizedHrefs, localizeHtmlHrefs } from "./localizedRouting";

describe("localizeHref", () => {
  it("uebersetzt deutsche Ziele im englischen Teil", () => {
    expect(localizeHref("/fertigung", "en")).toBe("/en/manufacturing");
    expect(localizeHref("/fertigung/leiterplatten", "en")).toBe(
      "/en/manufacturing/printed-circuit-boards"
    );
    expect(localizeHref("/", "en")).toBe("/en");
  });

  it("laesst deutsche Ziele im deutschen Teil unveraendert", () => {
    expect(localizeHref("/fertigung", "de")).toBe("/fertigung");
    expect(localizeHref("/", "de")).toBe("/");
  });

  it("fasst bereits englische Ziele nicht an", () => {
    // Sonst wuerde der Sprachumschalter sein eigenes Ziel zurueckuebersetzen.
    expect(localizeHref("/en/manufacturing", "de")).toBe("/en/manufacturing");
    expect(localizeHref("/en/manufacturing", "en")).toBe("/en/manufacturing");
    expect(localizeHref("/en", "de")).toBe("/en");
  });

  it("laesst Seiten ohne englische Fassung deutsch", () => {
    expect(localizeHref("/media-center", "en")).toBe("/media-center");
    expect(localizeHref("/elektronikentwicklung-muenchen", "en")).toBe(
      "/elektronikentwicklung-muenchen"
    );
  });

  it("laesst externe Ziele und Anker in Ruhe", () => {
    expect(localizeHref("https://control-motion.de/fertigung", "en")).toBe(
      "https://control-motion.de/fertigung"
    );
    expect(localizeHref("mailto:info@control-motion.de", "en")).toBe(
      "mailto:info@control-motion.de"
    );
    expect(localizeHref("tel:+49231286676960", "en")).toBe("tel:+49231286676960");
    expect(localizeHref("#kontaktformular", "en")).toBe("#kontaktformular");
  });

  it("laesst die Verwaltung einsprachig", () => {
    expect(localizeHref("/admin/insights", "en")).toBe("/admin/insights");
  });

  it("erhaelt Abfrage, Anker und abschliessenden Schraegstrich", () => {
    expect(localizeHref("/kontakt?thema=emv", "en")).toBe("/en/contact?thema=emv");
    expect(localizeHref("/kontakt#formular", "en")).toBe("/en/contact#formular");
    expect(localizeHref("/kontakt/", "en")).toBe("/en/contact/");
  });

  it("uebersetzt Artikelpfade", () => {
    expect(localizeHref("/insights/sic-und-gan", "en")).toBe("/en/insights/sic-und-gan");
  });
});

describe("localizedHrefs beim Vorrendern", () => {
  it("nimmt die Sprache aus ssrPath, wenn es kein window gibt", () => {
    // Im Node-Prozess ohne DOM: der Router liefert ssrPath.
    expect(localizedHrefs("/fertigung", { ssrPath: "/en/development" })).toBe(
      "/en/manufacturing"
    );
    expect(localizedHrefs("/fertigung", { ssrPath: "/entwicklung" })).toBe("/fertigung");
  });

  it("faellt ohne ssrPath auf Deutsch zurueck", () => {
    expect(localizedHrefs("/fertigung", {})).toBe("/fertigung");
    expect(localizedHrefs("/fertigung")).toBe("/fertigung");
  });
});

describe("localizeHtmlHrefs", () => {
  const html =
    'Ich stimme der <a href="/datenschutz" target="_blank">Datenschutzerklaerung</a> zu.';

  it("uebersetzt Verweise in redaktionellem HTML", () => {
    expect(localizeHtmlHrefs(html, "en")).toContain('href="/en/privacy-policy"');
  });

  it("laesst deutsches HTML unveraendert", () => {
    expect(localizeHtmlHrefs(html, "de")).toBe(html);
  });

  it("fasst externe Verweise nicht an", () => {
    const ext = '<a href="https://control-motion.de/datenschutz">extern</a>';
    expect(localizeHtmlHrefs(ext, "en")).toBe(ext);
  });

  it("kommt mit Text ohne Verweise zurecht", () => {
    expect(localizeHtmlHrefs("Nur Text", "en")).toBe("Nur Text");
    expect(localizeHtmlHrefs("", "en")).toBe("");
  });
});
