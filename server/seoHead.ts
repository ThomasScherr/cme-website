/**
 * Baut den <head>-Block einer vorgerenderten Seite.
 *
 * Einzige Quelle für Titel, Beschreibung, Canonical, Open Graph und hreflang.
 * Nutzt die Daten aus seoPageData.ts.
 *
 * HINTERGRUND
 * Bisher lagen dieselben Angaben in drei Listen: seoPageData.ts,
 * prerenderMiddleware.ts und generate-seo-pages.mjs. Nachgemessen wichen die
 * Titel in 22 von 29 Routen voneinander ab – Googlebot bekam über die
 * Prerender-Ebene teils andere Titel als Besucher. Diese Datei ersetzt die
 * drei Listen; prerenderMiddleware und generate-seo-pages entfallen danach.
 *
 * CANONICAL
 * In SEO.tsx wurden canonical und og:url mit dem Hinweis "Hosting injiziert
 * das" entfernt. Auf Mittwald injiziert das niemand. Beide werden hier wieder
 * gesetzt – mit abschließendem Schrägstrich, passend zu sitemap.xml und
 * trailingSlashMiddleware.
 */

import { lookupSeoMeta, BASE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "./seoPageData";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Kanonische URL: immer mit abschließendem Schrägstrich, Wurzel bleibt "/". */
export function canonicalUrl(path: string): string {
  const clean = path.split("?")[0].split("#")[0];
  const normalized = clean === "/" ? "/" : `${clean.replace(/\/+$/, "")}/`;
  return `${BASE_URL}${normalized}`;
}

export interface HeadResult {
  /** Fertiger HTML-Block für den <head> */
  tags: string;
  /** Sprache für das lang-Attribut */
  lang: "de" | "en";
  /** true, wenn die Route unbekannt ist – dann noindex */
  notFound: boolean;
}

export function buildHead(path: string): HeadResult {
  const { meta, isEnglish, dePath } = lookupSeoMeta(path.split("?")[0]);
  const lang = isEnglish ? "en" : "de";

  if (!meta) {
    return {
      lang,
      notFound: true,
      tags: [
        "<title>Seite nicht gefunden | CME Control Motion Electronics</title>",
        '<meta name="robots" content="noindex, follow" />',
      ].join("\n    "),
    };
  }

  const title = isEnglish ? meta.enTitle ?? meta.title : meta.title;
  const description = isEnglish
    ? meta.enDescription ?? meta.description
    : meta.description;

  const canonical = canonicalUrl(isEnglish ? path : dePath);
  const deUrl = canonicalUrl(dePath);
  const enUrl = meta.enPath ? canonicalUrl(meta.enPath) : "";

  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    meta.keywords ? `<meta name="keywords" content="${escapeHtml(meta.keywords)}" />` : "",
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<meta name="author" content="${escapeHtml(SITE_NAME)}" />`,
    "",
    `<link rel="alternate" hreflang="de" href="${deUrl}" />`,
    enUrl ? `<link rel="alternate" hreflang="en" href="${enUrl}" />` : "",
    `<link rel="alternate" hreflang="x-default" href="${deUrl}" />`,
    "",
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`,
    `<meta property="og:locale" content="${isEnglish ? "en_US" : "de_DE"}" />`,
    "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`,
  ]
    .filter(line => line !== "")
    .join("\n    ");

  return { tags, lang, notFound: false };
}
