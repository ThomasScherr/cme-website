/**
 * Server-Einstiegspunkt für das Vorrendern (SSG).
 *
 * Wird von scripts/prerender.mjs benutzt, um jede Route einmal zu fertigem
 * HTML zu rendern. Das Ergebnis landet in dist/public/<route>/index.html und
 * wird von Express ausgeliefert. Der Browser hydratisiert es anschließend.
 *
 * Warum das nötig ist: Bisher lieferte die Seite eine leere Hülle aus und baute
 * alles per JavaScript auf. Suchmaschinen und vor allem KI-Crawler, die kein
 * JavaScript ausführen, sahen deshalb keinen Inhalt. Die frühere Lösung – eine
 * parallel gepflegte Ersatzseite nur für Crawler – war Cloaking und lief
 * inhaltlich auseinander.
 *
 * WICHTIG: Hier darf nichts laufen, was einen Browser voraussetzt. Geprüft:
 *  - ConsentContext liest localStorage in try/catch → liefert serverseitig null
 *  - ThemeProvider fasst localStorage nur bei switchable={true} an (Vorgabe: false)
 *  - StyleProvider rendert children auch während isLoading
 */

import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";
import { HelmetProvider, HelmetData } from "react-helmet-async";
import { Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "@/lib/trpc";
import App from "./App";

// react-helmet-async entscheidet ueber "typeof window", ob es die Tags
// einsammelt (Server) oder direkt ins Dokument schreibt (Browser). Im
// Vite-SSR-Bundle greift diese Erkennung nicht zuverlaessig, deshalb hier
// ausdruecklich abschalten - das ist der von der Bibliothek vorgesehene Weg.
(HelmetProvider as unknown as { canUseDOM: boolean }).canUseDOM = false;

export interface RenderResult {
  /** Das gerenderte Markup für <div id="root"> */
  html: string;
  /** Von React Helmet gesammelte <head>-Tags */
  head: string;
  /** Sprache des Dokuments, abgeleitet aus dem Pfad */
  lang: string;
}

export async function render(url: string): Promise<RenderResult> {
  // react-helmet-async v3: HelmetData ist der fuer nebenlaeufiges SSR
  // vorgesehene Weg, den Kontext einzusammeln.
  const helmetData = new HelmetData({});
  const helmetContext: Record<string, any> = helmetData.context;

  // Eigener QueryClient pro Aufruf – sonst würden sich die Routen
  // gegenseitig ihre Zwischenspeicher überschreiben.
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        // Serverseitig wird nicht nachgeladen; die Abfragen bleiben im
        // Ladezustand und die Komponenten rendern ihre Platzhalter.
        staleTime: Infinity,
      },
    },
  });

  const trpcClient = trpc.createClient({
    links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })],
  });

  const tree = (
    <HelmetProvider context={helmetContext}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <WouterRouter ssrPath={url}>
            <App />
          </WouterRouter>
        </QueryClientProvider>
      </trpc.Provider>
    </HelmetProvider>
  );

  // renderToString wartet NICHT auf Suspense – alle per lazy() geladenen
  // Seiten kaemen als Lade-Spinner heraus. renderToPipeableStream mit
  // onAllReady rendert erst, wenn jede Grenze aufgeloest ist.
  const html = await new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    const sink = new Writable({
      write(chunk, _enc, cb) {
        chunks.push(Buffer.from(chunk));
        cb();
      },
    });
    sink.on("finish", () => resolve(Buffer.concat(chunks).toString("utf8")));

    const { pipe, abort } = renderToPipeableStream(tree, {
      onAllReady() {
        pipe(sink);
      },
      onError(error) {
        reject(error);
      },
    });

    // Sicherheitsnetz: haengt eine Abfrage, soll der Build nicht ewig stehen.
    setTimeout(() => {
      abort();
      reject(new Error(`Zeitueberschreitung beim Rendern von ${url}`));
    }, 20_000).unref?.();
  });

  // OFFEN: react-helmet-async liefert hier noch keine Tags zurueck. Die
  // Kopfdaten sollen ohnehin nicht aus Helmet kommen, sondern aus einem
  // gemeinsamen SEO-Datenmodul, das Server und Client teilen - genau das
  // beseitigt die heute fuenffach gepflegten Listen. Siehe PR-Beschreibung.
  const helmet = helmetContext.helmet;
  const head = helmet
    ? [helmet.title, helmet.meta, helmet.link, helmet.script]
        .map(part => part?.toString())
        .filter(Boolean)
        .join("\n    ")
    : "";

  const lang = url === "/en" || url.startsWith("/en/") ? "en" : "de";

  return { html, head, lang };
}
