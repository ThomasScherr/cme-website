import type { Request, Response, NextFunction } from "express";

/**
 * Legacy URL redirects – maps old URL paths (from the previous website)
 * to the current URL structure via 301 (permanent) redirects.
 * 
 * This prevents soft-404 errors for URLs that search engines (Google, Sistrix)
 * and external links still reference. Without these redirects, the SPA serves
 * HTTP 200 with a client-side 404 page (soft-404), which is bad for SEO.
 * 
 * Note: www → non-www is handled by wwwRedirectMiddleware.ts.
 * Trailing slashes are normalized. Only paths that do NOT exist as current
 * routes are included here.
 * 
 * Supports both exact matches and wildcard prefix rewrites.
 */

// ── Exact path matches ──
const LEGACY_REDIRECT_MAP: Record<string, string> = {
  // Deutsche alte URLs → neue deutsche Routen
  "/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten": "/fertigung/leiterplatten",
  "/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/leiterplatten-bestuecken-smd-und-tht": "/fertigung/leiterplatten",
  "/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/baugruppen": "/fertigung/baugruppen",
  "/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/qs-qm": "/fertigung/qualitaet",
  "/smd-fragen-entwurf": "/fertigung",

  // Sistrix canonical fixes: non-hyphenated variants → canonical hyphenated URLs
  "/entwicklung/testverifikation": "/entwicklung/test-verifikation",
  "/entwicklung/uxinterfaceengineering": "/entwicklung/ux-interface-engineering",
  "/entwicklung/validierungemv": "/entwicklung/validierung-emv",
  "/entwicklung/emotordesign": "/entwicklung/e-motor-design",
  "/entwicklung/controldesign": "/entwicklung/control-design",
  "/entwicklung/kientwicklung": "/entwicklung/ki-entwicklung",
  "/datenschutzerklaerung": "/datenschutz",
  "/jobs": "/karriere",
  "/ueber-uns": "/unternehmen",

  // Englische alte URLs → aktuelle englische Seiten
  // Self-referencing EN paths removed (were causing 301 loops)
  "/en/jobs": "/en/careers",
};

// ── Wildcard prefix rewrites ──
// Order matters: longer prefixes first to avoid partial matches.
// Each entry: [oldPrefix, newPrefix]
// /elektronikfertigung/foo → /fertigung/foo
// /en/electronics-development/foo → /en/development/foo
// /en/electronics-manufacturing/foo → /en/manufacturing/foo
const PREFIX_REWRITES: [string, string][] = [
  ["/elektronikfertigung", "/fertigung"],
  ["/en/electronics-development", "/en/development"],
  ["/en/electronics-manufacturing", "/en/manufacturing"],
];

export function legacyRedirectMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    // Only handle GET requests
    if (req.method !== "GET") return next();

    // Skip API routes, static assets, Vite internals
    const path = req.path;
    if (
      path.startsWith("/api/") ||
      path.startsWith("/@") ||
      path.startsWith("/node_modules/") ||
      path.startsWith("/src/") ||
      (path.includes(".") && !path.endsWith("/")) ||
      path === "/favicon.ico"
    ) {
      return next();
    }

    // Normalize: remove trailing slash for lookup (except root "/")
    const normalizedPath = path.length > 1 && path.endsWith("/")
      ? path.slice(0, -1)
      : path;

    // 1. Check exact match first
    const exactTarget = LEGACY_REDIRECT_MAP[normalizedPath];
    if (exactTarget) {
      res.redirect(301, exactTarget);
      return;
    }

    // 2. Check wildcard prefix rewrites
    for (const [oldPrefix, newPrefix] of PREFIX_REWRITES) {
      if (normalizedPath === oldPrefix || normalizedPath.startsWith(oldPrefix + "/")) {
        const remainder = normalizedPath.slice(oldPrefix.length); // e.g. "/hardware-software" or ""
        const target = newPrefix + remainder;
        res.redirect(301, target);
        return;
      }
    }

    next();
  };
}
