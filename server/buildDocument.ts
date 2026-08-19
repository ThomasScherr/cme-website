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
 *
 * ── Warum die Kopfdaten aus dem Markup geholt werden ──
 *
 * Das Projekt läuft auf React 19. Dort hebt React <title>, <meta> und <link>
 * selbst in den <head> – react-helmet-async 3 reicht auf React 19 nur noch
 * durch und füllt sein context-Objekt nicht mehr.
 *
 * Beim Rendern eines Teilbaums (wir rendern nur die Anwendung, nicht das ganze
 * Dokument) kann React nicht heben. Die Tags landen deshalb dort, wo sie im
 * Baum stehen: mitten im Körper. Genau das stand bis hierher in jeder der 67
 * ausgelieferten Seiten – ein zweiter Titel und eine zweite Beschreibung im
 * <body>, inhaltlich abweichend von denen im <head>.
 *
 * Sichtbar wurde es erst im Browser: beim Hydratisieren holt React die Tags in
 * den Kopf und überschreibt die dort stehenden. Der rohe Abruf und die
 * gerenderte Seite sagten also Unterschiedliches – und Google vergleicht beides.
 *
 * liftHead() macht hier das, was React im Browser tut: die Tags aus dem Markup
 * nehmen und in den Kopf setzen. Danach stimmen beide Fassungen überein, und
 * die Texte aus den Seitenkomponenten gewinnen. seoHead.ts füllt nur noch die
 * Lücken – Canonical, og:url und Keywords stehen bewusst nicht im Helmet-Block.
 */
export function buildDocument(
  template: string,
  route: string,
  appHtml: string,
  headOverride?: { tags: string; lang: "de" | "en" }
): string {
  const { tags: fallbackTags, lang } = headOverride ?? buildHead(route);

  const { body, tags: pageTags } = liftHead(appHtml);
  const tags = mergeHead(pageTags, fallbackTags);

  let doc = template;

  // Sprache des Dokuments
  doc = doc.replace(/<html\s+lang="[^"]*"/, `<html lang="${lang}"`);

  // Titel und Beschreibung der Hülle entfernen – sie kommen jetzt aus dem Block
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
  doc = doc.slice(0, start + rootTag.length) + body + doc.slice(end);

  return doc;
}

/**
 * Genau die Elemente, die React 19 im Browser in den <head> hebt.
 *
 * <script type="application/ld+json"> steht bewusst NICHT dabei: die
 * strukturierten Daten sollen im Körper bleiben (siehe Kommentar in SEO.tsx),
 * und React hebt sie auch nicht.
 */
const HOISTABLE = /<title[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*?>|<link\b[^>]*?>/gi;

/** Kopfdaten aus dem gerenderten Markup nehmen. Gibt Körper und Tags zurück. */
export function liftHead(appHtml: string): { body: string; tags: string[] } {
  const tags: string[] = [];
  const body = appHtml.replace(HOISTABLE, match => {
    tags.push(match.trim());
    return "";
  });
  return { body, tags };
}

/**
 * Kennung eines Kopf-Tags. Zwei Tags mit derselben Kennung beschreiben dasselbe
 * und dürfen nicht beide im Dokument stehen.
 */
export function headKey(tag: string): string {
  if (/^<title/i.test(tag)) return "title";

  const name = tag.match(/\bname="([^"]+)"/i)?.[1];
  if (name) return `meta:${name.toLowerCase()}`;

  const property = tag.match(/\bproperty="([^"]+)"/i)?.[1];
  if (property) return `meta:${property.toLowerCase()}`;

  const rel = tag.match(/\brel="([^"]+)"/i)?.[1];
  if (rel) {
    const hreflang = tag.match(/\bhreflang="([^"]+)"/i)?.[1];
    return `link:${rel.toLowerCase()}${hreflang ? `:${hreflang.toLowerCase()}` : ""}`;
  }

  return tag;
}

/**
 * Tags aus der Seite gewinnen, seoHead füllt die Lücken.
 *
 * Der Titel steht immer zuerst – nicht aus technischen Gründen, sondern damit
 * der Quelltext lesbar bleibt.
 */
export function mergeHead(pageTags: string[], fallbackTags: string): string {
  const seen = new Set(pageTags.map(headKey));

  const fallback = fallbackTags
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .filter(tag => !seen.has(headKey(tag)));

  const all = [...pageTags, ...fallback];
  const title = all.filter(t => headKey(t) === "title");
  const rest = all.filter(t => headKey(t) !== "title");

  return [...title, ...rest].join("\n    ");
}
