/**
 * Rendert jede Seite einmal zu fertigem HTML.
 *
 * Ablauf im Build:
 *   1. vite build                          → dist/public/index.html + Assets
 *   2. vite build --config vite.config.ssr → dist/server-entry/entry-server.js
 *   3. tsx scripts/prerender.ts            → dist/public/<pfad>/index.html
 *
 * Ergebnis: Mensch und Maschine bekommen dieselbe Datei. Das ersetzt die
 * bisherige Ersatzseite nur für Crawler (prerenderMiddleware), die technisch
 * Cloaking war, im Schnitt 70 Wörter pro Seite lieferte und für die Fachartikel
 * mit 404 antwortete.
 *
 * Die Kopfdaten kommen aus server/seoHead.ts – eine Quelle für Titel,
 * Beschreibung, Canonical, Open Graph und hreflang.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { ROUTE_PAIRS, DE_PATHS_WITH_EN } from "../shared/routes";
import { SEO_PAGES } from "../server/seoPageData";
import { buildHead } from "../server/seoHead";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST_DIR = path.resolve(ROOT, "dist");
const PUBLIC_DIR = path.resolve(DIST_DIR, "public");
const ENTRY = path.resolve(DIST_DIR, "server-entry", "entry-server.js");

/**
 * Die gebaute Hülle. Sie wird beiseitegelegt, bevor die Startseite
 * dist/public/index.html überschreibt – zum einen, damit ein zweiter Lauf nicht
 * die bereits gerenderte Startseite als Vorlage nimmt, zum anderen, weil
 * Express sie für Routen ohne vorgerenderte Datei braucht (Verwaltung).
 *
 * Der Ablageort liegt bewusst außerhalb von dist/public, damit die Hülle nicht
 * als eigene URL abrufbar ist.
 */
const SHELL = path.resolve(DIST_DIR, "spa-shell.html");

/**
 * Alle Seiten, die vorgerendert werden.
 *
 * Grundlage sind die SEO-Daten – dieselbe Liste, die in vite.ts darüber
 * entscheidet, ob eine URL überhaupt existiert. Dazu die englischen
 * Entsprechungen aus shared/routes.ts. Die Fachartikel aus der Datenbank
 * kommen im nächsten Schritt dazu.
 */
export function collectRoutes(): string[] {
  const de = Object.keys(SEO_PAGES);
  const en = ROUTE_PAIRS.filter(p => DE_PATHS_WITH_EN.includes(p.de)).map(p => p.en);
  return [...de, ...en];
}

/** Zielpfad einer Route: "/" → index.html, "/fertigung" → fertigung/index.html */
function outputPathFor(route: string): string {
  const clean = route === "/" ? "" : route.replace(/^\/+/, "");
  return path.join(PUBLIC_DIR, clean, "index.html");
}

/**
 * Setzt Kopfdaten und Inhalt in die gebaute Hülle ein.
 *
 * Die Hülle enthält bereits die richtigen Asset-Verweise mit Inhalts-Hash,
 * deshalb wird sie als Vorlage benutzt statt client/index.html.
 */
export function buildDocument(template: string, route: string, appHtml: string): string {
  const { tags, lang } = buildHead(route);

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

/** Vorlage lesen: bevorzugt die beiseitegelegte Hülle, sonst der frische Build. */
async function readTemplate(): Promise<string> {
  try {
    return await fs.readFile(SHELL, "utf8");
  } catch {
    const template = await fs.readFile(path.resolve(PUBLIC_DIR, "index.html"), "utf8");
    await fs.writeFile(SHELL, template, "utf8");
    return template;
  }
}

async function main() {
  const template = await readTemplate();
  const { render } = (await import(pathToFileURL(ENTRY).href)) as {
    render: (url: string) => Promise<{ html: string; lang: string }>;
  };

  const routes = collectRoutes();
  const failed: Array<{ route: string; reason: string }> = [];
  let written = 0;
  let smallest = { route: "", chars: Number.POSITIVE_INFINITY };

  for (const route of routes) {
    try {
      const { html } = await render(route);
      const doc = buildDocument(template, route, html);
      const out = outputPathFor(route);
      await fs.mkdir(path.dirname(out), { recursive: true });
      await fs.writeFile(out, doc, "utf8");
      written++;

      const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (text.length < smallest.chars) smallest = { route, chars: text.length };
      if (text.length < 500) {
        console.warn(`[prerender] ${route}: nur ${text.length} Zeichen Text – bitte pruefen`);
      }
    } catch (error) {
      failed.push({ route, reason: error instanceof Error ? error.message : String(error) });
    }
  }

  console.log(`[prerender] ${written} von ${routes.length} Seiten geschrieben`);
  console.log(`[prerender] kuerzeste Seite: ${smallest.route} (${smallest.chars} Zeichen Text)`);

  if (failed.length) {
    for (const f of failed) console.error(`[prerender] FEHLER ${f.route}: ${f.reason}`);
    // Der Build bricht ab. Eine halb vorgerenderte Seite waere schlechter als
    // gar keine: einzelne Routen laegen dann als leere Huelle vor, ohne dass es
    // jemandem auffiele.
    process.exit(1);
  }
}

// Nur ausfuehren, wenn direkt aufgerufen – Tests importieren die Helfer.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    console.error("[prerender] abgebrochen:", error);
    process.exit(1);
  });
}
