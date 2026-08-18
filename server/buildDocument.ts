import { buildHead } from "./seoHead";

/**
 * Setzt Kopfdaten und gerendertes Markup in die gebaute Hülle ein.
 *
 * Wird an zwei Stellen gebraucht und liegt deshalb hier:
 *   - scripts/prerender.ts beim Build für die festen Seiten
 *   - server/dynamicPages.ts zur Laufzeit für die Fachartikel, deren Inhalte
 *     erst aus der Datenbank kommen
 *
 * Die Hülle enthält bereits die richtigen Asset-Verweise mit Inhalts-Hash,
 * deshalb wird sie als Vorlage benutzt statt client/index.html.
 */
export function buildDocument(
  template: string,
  route: string,
  appHtml: string,
  headOverride?: { tags: string; lang: "de" | "en" }
): string {
  const { tags, lang } = headOverride ?? buildHead(route);

  let doc = template;

  // Sprache des Dokuments
  doc = doc.replace(/<html\s+lang="[^"]*"/, `<html lang="${lang}"`);

  // Titel und Beschreibung der Hülle entfernen – sie kommen jetzt aus seoHead
  doc = doc.replace(/\s*<title>[\s\S]*?<\/title>/, "");
  doc = doc.replace(/\s*<meta\s+name="description"[^>]*>/, "");

  // Kopfdaten in den vorgesehenen Block schreiben
  const block = `<!--SEO_BLOCK_START-->\n    ${tags}\n    <!--SEO_BLOCK_END-->`;
  if (doc.includes("<!--SEO_BLOCK_START-->")) {
    doc = doc.replace(/<!--SEO_BLOCK_START-->[\s\S]*?<!--SEO_BLOCK_END-->/, block);
  } else {
    doc = doc.replace("</head>", `  ${block}\n  </head>`);
  }

  // Gerendertes Markup einsetzen
  const rootTag = '<div id="root">';
  const start = doc.indexOf(rootTag);
  if (start === -1) throw new Error('In der Vorlage fehlt <div id="root">');
  const end = doc.indexOf("</div>", start);
  if (end === -1) throw new Error('In der Vorlage fehlt das schliessende </div> nach #root');
  doc = doc.slice(0, start + rootTag.length) + appHtml + doc.slice(end);

  return doc;
}
