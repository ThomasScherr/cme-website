import fs from "fs";
import path from "path";
import type { Request, Response, NextFunction } from "express";

/**
 * Liefert vorgerenderte Seiten aus.
 *
 * Das Prerender-Skript legt jede Seite als dist/public/<pfad>/index.html ab.
 * express.static findet die nicht von selbst: es läuft mit index: false, weil
 * es sonst /pfad nach /pfad/ umleiten und mit trailingSlashMiddleware
 * kollidieren würde. Deshalb dieser eigene Schritt.
 *
 * Wie bei den Assets wird die vorkomprimierte Variante bevorzugt. Die
 * Startseite ist roh 126 KB gross, mit Brotli rund 15 KB – ohne diese Auswahl
 * ginge der Gewinn des Vorrenderns in der Uebertragung wieder verloren.
 */

/**
 * Sucht die vorgerenderte Datei zu einer URL.
 *
 * Sicherheit: Der Pfad wird aufgelöst und geprüft, dass er innerhalb des
 * Ausgabeverzeichnisses liegt. Ohne diese Prüfung könnte "/../../etc/passwd"
 * jede Datei des Containers ausliefern.
 */
export function findPrerenderedPage(distPath: string, url: string): string | null {
  const pathOnly = url.split("?")[0].split("#")[0];
  if (pathOnly.includes("\0")) return null;

  const decoded = safeDecode(pathOnly);
  if (decoded === null) return null;

  const relative = decoded.replace(/^\/+/, "").replace(/\/+$/, "");
  const candidate = path.resolve(distPath, relative, "index.html");

  const root = path.resolve(distPath);
  if (candidate !== path.join(root, "index.html") && !candidate.startsWith(root + path.sep)) {
    return null;
  }

  try {
    return fs.statSync(candidate).isFile() ? candidate : null;
  } catch {
    return null;
  }
}

function safeDecode(value: string): string | null {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}

function accepts(header: string | undefined, encoding: string): boolean {
  if (!header) return false;
  return header.split(",").some(part => part.trim().split(";")[0] === encoding);
}

function existingFile(candidate: string): boolean {
  try {
    return fs.statSync(candidate).isFile();
  } catch {
    return false;
  }
}

export function prerenderedPagesMiddleware(distPath: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();

    const page = findPrerenderedPage(distPath, req.originalUrl);
    if (!page) return next();

    const acceptEncoding = req.headers["accept-encoding"] as string | undefined;
    let file = page;
    let encoding: string | null = null;

    if (accepts(acceptEncoding, "br") && existingFile(`${page}.br`)) {
      file = `${page}.br`;
      encoding = "br";
    } else if (accepts(acceptEncoding, "gzip") && existingFile(`${page}.gz`)) {
      file = `${page}.gz`;
      encoding = "gzip";
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=60");
    res.setHeader("Vary", "Accept-Encoding");
    res.removeHeader("Pragma");
    if (encoding) res.setHeader("Content-Encoding", encoding);

    res.sendFile(file, err => {
      if (err) next(err);
    });
  };
}
