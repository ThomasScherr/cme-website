import type { Request, Response, NextFunction } from "express";

/**
 * Legacy URL redirects – maps old URL paths (from the previous website)
 * to the current URL structure via 301 (permanent) redirects.
 * 
 * This prevents soft-404 errors for URLs that search engines (Google, Sistrix)
 * and external links still reference. Without these redirects, the SPA serves
 * HTTP 200 with a client-side 404 page (soft-404), which is bad for SEO.
 * 
 * Note: www → non-www is handled by Cloudflare. Trailing slashes are normalized.
 * Only paths that do NOT exist as current routes are included here.
 */

const LEGACY_REDIRECT_MAP: Record<string, string> = {
  // ── Deutsche alte URLs → neue deutsche Routen ──
  "/elektronikentwicklung": "/entwicklung",
  "/elektronikentwicklung/hardware-software": "/entwicklung/hardware-software",
  "/elektronikentwicklung/simulation": "/entwicklung/simulation",
  "/elektronikentwicklung/test-verifikation": "/entwicklung/test-verifikation",
  "/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten": "/fertigung/leiterplatten",
  "/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/leiterplatten-bestuecken-smd-und-tht": "/fertigung/leiterplatten",
  "/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/baugruppen": "/fertigung/baugruppen",
  "/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/qs-qm": "/fertigung/qualitaet",
  "/smd-fragen-entwurf": "/fertigung",
  "/datenschutzerklaerung": "/datenschutz",
  "/jobs": "/karriere",

  // ── Englische alte URLs → aktuelle englische Seiten ──
  // Die englische Version verwendet denselben Router mit /en-Prefix und
  // LanguageContext. Alle /en/* Pfade werden von der SPA gehandelt.
  // Nur alte englische Pfade, die nicht mehr existieren, werden umgeleitet:
  "/en/electronics-manufacturing": "/en/manufacturing",
  "/en/electronics-manufacturing/assembling-printed-circuit-boards": "/en/manufacturing/printed-circuit-boards",
  "/en/electronics-manufacturing/electronic-assemblies": "/en/manufacturing/assemblies",
  "/en/electronics-manufacturing/qa-qm": "/en/manufacturing/quality",
  "/en/electronics-development": "/en/development",
  "/en/electronics-development/hardware-software": "/en/development/hardware-software",
  "/en/electronics-development/simulation": "/en/development/simulation",
  "/en/electronics-development/test-verification": "/en/development/test-verification",
  "/en/contact": "/en/contact",
  "/en/company": "/en/company",
  "/en/imprint": "/en/imprint",
  "/en/privacy-policy": "/en/privacy-policy",
  "/en/gtc": "/en/gtc",
  "/en/jobs": "/en/careers",
};

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

    const target = LEGACY_REDIRECT_MAP[normalizedPath];
    if (target) {
      // 301 permanent redirect to the new URL
      res.redirect(301, target);
      return;
    }

    next();
  };
}
