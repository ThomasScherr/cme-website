import type { Request, Response, NextFunction } from "express";

/**
 * Noindex-Schutz für nicht-kanonische Hosts.
 *
 * Die Website ist neben der Produktionsdomain control-motion.de auch unter der
 * Mittwald-Container-Domain erreichbar (p-w48lps.project.space). Diese liefert
 * eine vollständige zweite Kopie aller Seiten aus – mit gültigem Zertifikat,
 * HTTP 200 und einer robots.txt, die "Allow: /" sagt.
 *
 * Da im Projekt bewusst keine <link rel="canonical"> gesetzt werden (siehe
 * SEO.tsx Zeile 158), gibt es nichts, was Suchmaschinen auf das Original
 * zurückverweist. Ohne diesen Schutz ist das ein Duplicate-Content-Fall.
 *
 * Diese Middleware setzt für jeden Host, der nicht in CANONICAL_HOSTS steht:
 *   - X-Robots-Tag: noindex, nofollow, noarchive  (für alle Antworten)
 *   - /robots.txt: vollständiges Disallow         (überschreibt die statische Datei)
 *
 * Der Inhalt bleibt für Menschen erreichbar – Staging und Tests funktionieren
 * unverändert weiter.
 *
 * Muss VOR prerenderMiddleware und serveStatic registriert werden, damit der
 * Header auch auf vorgerenderten und statischen Antworten landet.
 */

const CANONICAL_HOSTS = new Set([
  "control-motion.de",
  "www.control-motion.de",
]);

/** Host der Anfrage, ohne Port, kleingeschrieben. Beachtet den Reverse Proxy. */
function resolveHost(req: Request): string {
  const forwarded = req.headers["x-forwarded-host"];
  const raw =
    (Array.isArray(forwarded) ? forwarded[0] : forwarded) ??
    req.headers.host ??
    "";

  return raw.split(",")[0].trim().split(":")[0].toLowerCase();
}

export function nonCanonicalHostNoindexMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    const host = resolveHost(req);

    // Unbekannter Host (z. B. direkter IP-Aufruf ohne Host-Header) wird
    // bewusst mitgeschützt – nur die Positivliste darf indexiert werden.
    if (host && CANONICAL_HOSTS.has(host)) return next();

    res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");

    if (req.path === "/robots.txt") {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");
      res.status(200).send("User-agent: *\nDisallow: /\n");
      return;
    }

    next();
  };
}
