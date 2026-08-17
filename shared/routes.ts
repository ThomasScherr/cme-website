/**
 * Zuordnung deutscher zu englischer Seitenpfade – die einzige Quelle dafür.
 *
 * HINTERGRUND
 * Die englischen Pfade standen bisher an zwei Stellen: als `enPath` in
 * server/seoPageData.ts und als EN_TO_DE_MAP in LegacyRedirects.tsx. Im Router
 * standen sie überhaupt nicht. Wer /en/manufacturing aufrief, landete in der
 * 404-Seite; nur clientseitig wurde er anschließend per JavaScript auf
 * /fertigung umgeleitet. Für Crawler ohne JavaScript – also praktisch alle
 * KI-Crawler – existierten die 23 englischen Seiten damit nicht, obwohl sie in
 * der sitemap.xml und in den hreflang-Angaben stehen.
 *
 * Diese Datei macht die Zuordnung zur gemeinsamen Grundlage von Router,
 * SEO-Daten und Sprachumschalter. Wer eine Seite hinzufügt, trägt sie hier ein
 * – shared/routes.test.ts schlägt fehl, sobald Route und SEO-Daten auseinander
 * laufen.
 */

export interface RoutePair {
  /** Deutscher Pfad, ohne abschließenden Schrägstrich (Wurzel bleibt "/") */
  de: string;
  /** Englischer Pfad */
  en: string;
}

/** Präfix aller englischen Pfade. */
export const EN_PREFIX = "/en";

/**
 * Seiten, die es in beiden Sprachen gibt.
 *
 * Nicht enthalten und bewusst nur deutsch:
 *   /elektronikentwicklung          – lokale Landingpage, kein englischer Inhalt
 *   /elektronikentwicklung-muenchen – lokale Landingpage, kein englischer Inhalt
 *   /media-center                   – Pressebereich, englischer Inhalt fehlt noch
 * Für diese drei liefert seoHead.ts hreflang nur mit "de" und "x-default".
 */
export const ROUTE_PAIRS: RoutePair[] = [
  { de: "/", en: "/en" },
  { de: "/entwicklung", en: "/en/development" },
  { de: "/entwicklung/hardware-software", en: "/en/development/hardware-software" },
  { de: "/entwicklung/simulation", en: "/en/development/simulation" },
  { de: "/entwicklung/test-verifikation", en: "/en/development/test-verification" },
  { de: "/entwicklung/ux-interface-engineering", en: "/en/development/ux-interface-engineering" },
  { de: "/entwicklung/software-digitale-systeme", en: "/en/development/software-digital-systems" },
  { de: "/entwicklung/e-motor-design", en: "/en/development/e-motor-design" },
  { de: "/entwicklung/control-design", en: "/en/development/control-design" },
  { de: "/entwicklung/validierung-emv", en: "/en/development/emc-validation" },
  { de: "/entwicklung/ki-entwicklung", en: "/en/development/ai-development" },
  { de: "/fertigung", en: "/en/manufacturing" },
  { de: "/fertigung/leiterplatten", en: "/en/manufacturing/printed-circuit-boards" },
  { de: "/fertigung/baugruppen", en: "/en/manufacturing/assemblies" },
  { de: "/fertigung/qualitaet", en: "/en/manufacturing/quality" },
  { de: "/fertigung/smd-bestueckung", en: "/en/manufacturing/smd-assembly" },
  { de: "/fertigung/prototypen", en: "/en/manufacturing/prototypes" },
  { de: "/lifecycle", en: "/en/lifecycle" },
  { de: "/maerkte", en: "/en/markets" },
  { de: "/unternehmen", en: "/en/company" },
  { de: "/kontakt", en: "/en/contact" },
  { de: "/karriere", en: "/en/careers" },
  { de: "/insights", en: "/en/insights" },
  { de: "/impressum", en: "/en/imprint" },
  { de: "/datenschutz", en: "/en/privacy-policy" },
  { de: "/agb", en: "/en/terms-and-conditions" },
];

/**
 * Pfade mit einem dynamischen Teil. Der Platzhalter bleibt in beiden Sprachen
 * gleich, übersetzt wird nur das Pfadgerüst.
 */
export const DYNAMIC_ROUTE_PAIRS: RoutePair[] = [
  { de: "/insights/:slug", en: "/en/insights/:slug" },
];

export const DE_TO_EN: Record<string, string> = {};
export const EN_TO_DE: Record<string, string> = {};
for (const { de, en } of ROUTE_PAIRS) {
  DE_TO_EN[de] = en;
  EN_TO_DE[en] = de;
}

/** Entfernt einen abschließenden Schrägstrich; die Wurzel bleibt "/". */
export function normalizePath(path: string): string {
  const clean = path.split("?")[0].split("#")[0];
  if (clean.length > 1 && clean.endsWith("/")) return clean.slice(0, -1);
  return clean || "/";
}

/** true, wenn der Pfad zum englischen Teil der Seite gehört. */
export function isEnglishPath(path: string): boolean {
  const p = normalizePath(path);
  return p === EN_PREFIX || p.startsWith(`${EN_PREFIX}/`);
}

/** Sprache aus dem Pfad ableiten. Der Pfad ist die einzige Quelle dafür. */
export function langFromPath(path: string): "de" | "en" {
  return isEnglishPath(path) ? "en" : "de";
}

/**
 * Deutsche Entsprechung eines Pfads. Für unbekannte englische Pfade wird das
 * Präfix abgeschnitten, damit Artikel und Admin-Seiten nicht ins Leere laufen.
 */
export function toDePath(path: string): string {
  const p = normalizePath(path);
  if (!isEnglishPath(p)) return p;
  const mapped = EN_TO_DE[p];
  if (mapped) return mapped;
  const stripped = p.slice(EN_PREFIX.length);
  return stripped || "/";
}

/**
 * Englische Entsprechung eines Pfads – oder null, wenn es die Seite nur auf
 * Deutsch gibt. Artikel unter /insights/<slug> bekommen /en/insights/<slug>.
 */
export function toEnPath(path: string): string | null {
  const p = normalizePath(path);
  if (isEnglishPath(p)) return p;
  const mapped = DE_TO_EN[p];
  if (mapped) return mapped;
  if (p.startsWith("/insights/")) return `${EN_PREFIX}${p}`;
  return null;
}

/**
 * Pfad in die gewünschte Sprache übersetzen. Gibt es keine Entsprechung,
 * bleibt der Pfad unverändert – lieber die deutsche Seite als ein Sprung auf
 * die Startseite.
 */
export function localizePath(path: string, lang: "de" | "en"): string {
  if (lang === "de") return toDePath(path);
  return toEnPath(path) ?? normalizePath(path);
}

/** Alle englischen Pfade – für Router und Prerender-Skript. */
export const EN_PATHS: string[] = ROUTE_PAIRS.map(p => p.en);

/** Alle deutschen Pfade, die eine englische Entsprechung haben. */
export const DE_PATHS_WITH_EN: string[] = ROUTE_PAIRS.map(p => p.de);
