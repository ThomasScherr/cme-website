import fs from "fs";
import path from "path";
import type { Request, Response, NextFunction } from "express";

/**
 * Liefert vorkomprimierte Build-Artefakte aus (.br / .gz).
 *
 * Express komprimiert statische Dateien nicht von sich aus. An der laufenden
 * Instanz gemessen gingen dadurch bei jedem ersten Besuch 739 KB roh über die
 * Leitung, wo 154 KB gereicht hätten:
 *
 *   index-*.js    555 KB  ->  brotli 132 KB   (-76%)
 *   index-*.css   184 KB  ->  brotli  22 KB   (-88%)
 *
 * scripts/precompress-assets.mjs legt die Varianten beim Build an. Diese
 * Middleware wählt die beste vom Browser akzeptierte aus und schreibt die
 * Anfrage-URL um, sodass express.static sie ausliefert.
 *
 * Muss VOR dem express.static-Handler für /assets registriert werden.
 */

/** Content-Type anhand der Endung des ORIGINALS, nicht der .br/.gz-Hülle. */
export const ASSET_MIME: Record<string, string> = {
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

/** Bevorzugung: Brotli vor gzip. */
const VARIANTS = [
  { ext: ".br", encoding: "br" },
  { ext: ".gz", encoding: "gzip" },
] as const;

/**
 * Ermittelt den Content-Type einer Datei und ignoriert dabei eine
 * angehängte Kompressionsendung.
 */
export function assetContentType(filePath: string): string | undefined {
  const withoutEncoding = filePath.replace(/\.(br|gz)$/, "");
  return ASSET_MIME[path.extname(withoutEncoding)];
}

export function precompressedAssetsMiddleware(
  assetsDir: string,
  /** Nur für Tests überschreibbar. */
  exists: (p: string) => boolean = fs.existsSync
) {
  const root = path.resolve(assetsDir);

  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();

    const type = ASSET_MIME[path.extname(req.path)];
    if (!type) return next();

    const accepted = String(req.headers["accept-encoding"] ?? "");

    for (const variant of VARIANTS) {
      if (!accepted.includes(variant.encoding)) continue;

      const candidate = path.resolve(root, "." + req.path + variant.ext);
      // Pfad-Traversal ausschließen
      if (!candidate.startsWith(root + path.sep)) continue;
      if (!exists(candidate)) continue;

      res.setHeader("Content-Encoding", variant.encoding);
      res.setHeader("Vary", "Accept-Encoding");
      req.url = req.url.replace(req.path, req.path + variant.ext);
      break;
    }

    // Nach dem Rewrite setzen: express.static würde den Typ sonst aus ".br"
    // ableiten und application/octet-stream senden.
    res.setHeader("Content-Type", type);
    next();
  };
}
