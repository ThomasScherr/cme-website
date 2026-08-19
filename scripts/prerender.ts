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
import { buildDocument } from "../server/buildDocument";

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
 * als eigene URL abrufbar ist – und genau deshalb überlebt sie auch das Leeren
 * von dist/public durch `vite build`. Siehe readTemplate().
 */
const SHELL = path.resolve(DIST_DIR, "spa-shell.html");

// Fuer die Tests weiterreichen – gebaut wird das Dokument in server/buildDocument.ts,
// weil zur Laufzeit dieselbe Logik fuer die Fachartikel gebraucht wird.
export { buildDocument };

/**
 * Alle Seiten, die vorgerendert werden.
 *
 * Grundlage sind die SEO-Daten – dieselbe Liste, die in vite.ts darüber
 * entscheidet, ob eine URL überhaupt existiert. Dazu die englischen
 * Entsprechungen aus shared/routes.ts.
 *
 * NICHT dabei sind die Fachartikel: ihre Inhalte stehen in der Datenbank, die
 * beim Bauen des Images nicht erreichbar ist. Sie werden zur Laufzeit gerendert
 * und zwischengespeichert – siehe server/dynamicPages.ts.
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
 * Vorlage lesen.
 *
 * Die beiseitegelegte Hülle wird bevorzugt – sonst nähme ein zweiter Lauf ohne
 * neuen Build die bereits gerenderte Startseite als Vorlage, und jede Seite
 * bekäme deren Inhalt. Sie wird aber nur genommen, wenn die Dateien, auf die
 * sie verweist, noch existieren.
 *
 * Der Grund: `vite build` leert dist/public und vergibt neue Namen mit
 * Inhaltsstempel, die Hülle liegt daneben in dist/ und überlebt das. Beim
 * zweiten Bauen im selben Verzeichnis verwies deshalb jede der 55 Seiten auf
 * das Skript des ersten Builds – eine Website, auf der kein JavaScript lädt.
 * Der Build selbst lief dabei ohne Fehler durch; auffallen konnte es erst im
 * Browser.
 */
async function readTemplate(): Promise<string> {
  const saved = await fs.readFile(SHELL, "utf8").catch(() => null);
  if (saved !== null && (await missingAssets(saved)).length === 0) {
    return saved;
  }
  if (saved !== null) {
    console.warn("[prerender] beiseitegelegte Huelle verweist auf Dateien von einem aelteren Build – nehme die frische");
  }

  const fresh = await fs.readFile(path.resolve(PUBLIC_DIR, "index.html"), "utf8");
  const missing = await missingAssets(fresh);
  if (missing.length) {
    throw new Error(
      `dist/public/index.html verweist auf Dateien, die es dort nicht gibt: ${missing.join(", ")}. ` +
      `dist/ loeschen und neu bauen.`
    );
  }
  // Nach einem Lauf ist dist/public/index.html die gerenderte Startseite. Als
  // Vorlage genommen, bekaeme jede Seite deren Markup mitgeliefert. Nach
  // `vite build` ist die Datei dagegen die leere Huelle – nur die ist brauchbar.
  if (!/<div id="root">\s*<\/div>/.test(fresh)) {
    throw new Error(
      "dist/public/index.html ist keine leere Huelle, sondern schon eine gerenderte Seite. " +
      "dist/ loeschen und neu bauen."
    );
  }
  await fs.writeFile(SHELL, fresh, "utf8");
  return fresh;
}

/** Welche der von der Vorlage eingebundenen Dateien fehlen in dist/public? */
async function missingAssets(template: string): Promise<string[]> {
  const refs = [...template.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(m => m[1]);
  const missing: string[] = [];
  for (const ref of refs) {
    try {
      await fs.access(path.resolve(PUBLIC_DIR, ref.replace(/^\//, "")));
    } catch {
      missing.push(ref);
    }
  }
  return missing;
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

      // Der Cookie-Banner haengt an localStorage, das es serverseitig nicht
      // gibt. Stuende er im vorgerenderten HTML, wuerde der Browser bei jedem
      // Besucher mit gespeicherter Entscheidung etwas anderes aufbauen - React
      // uebernaehme die Knoten dann nicht und kein Knopf reagierte mehr.
      // Das ist einmal passiert und faellt sonst erst im Browser auf.
      if (doc.includes("data-consent-banner")) {
        throw new Error(
          "Der Cookie-Banner steht im vorgerenderten HTML. Er darf erst nach dem " +
          "Hydratisieren erscheinen (siehe ConsentProvider in client/src/contexts/ConsentContext.tsx)."
        );
      }

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
