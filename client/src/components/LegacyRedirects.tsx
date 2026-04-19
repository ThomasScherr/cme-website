import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Maps old URL paths (from the previous website) to the current URL structure.
 * Client-side redirects are needed because the hosting CDN serves the SPA shell
 * for all unknown paths before the Express server can handle them.
 * 
 * Supports both exact matches and wildcard prefix rewrites.
 * Note: Trailing slashes are normalized before lookup.
 */

// ── Exact path matches ──
const LEGACY_REDIRECT_MAP: Record<string, string> = {
  // Deutsche alte URLs → neue deutsche Routen
  "/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten": "/fertigung/leiterplatten",
  "/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/leiterplatten-bestuecken-smd-und-tht": "/fertigung/leiterplatten",
  "/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/baugruppen": "/fertigung/baugruppen",
  "/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/qs-qm": "/fertigung/qualitaet",
  "/smd-fragen-entwurf": "/fertigung",
  "/datenschutzerklaerung": "/datenschutz",
  "/jobs": "/karriere",
  "/ueber-uns": "/unternehmen",

  // Englische alte URLs
  "/en/jobs": "/en/careers",
};

// ── Wildcard prefix rewrites ──
const PREFIX_REWRITES: [string, string][] = [
  ["/elektronikentwicklung", "/entwicklung"],
  ["/elektronikfertigung", "/fertigung"],
  ["/en/electronics-development", "/en/development"],
  ["/en/electronics-manufacturing", "/en/manufacturing"],
];

/**
 * Component that checks the current path against legacy URLs
 * and performs a client-side redirect (replace) if a match is found.
 * Must be rendered inside the Router context.
 */
export default function LegacyRedirects() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Normalize: remove trailing slash for lookup (except root "/")
    const normalizedPath = location.length > 1 && location.endsWith("/")
      ? location.slice(0, -1)
      : location;

    // 1. Check exact match first
    const exactTarget = LEGACY_REDIRECT_MAP[normalizedPath];
    if (exactTarget && exactTarget !== normalizedPath) {
      setLocation(exactTarget, { replace: true });
      return;
    }

    // 2. Check wildcard prefix rewrites
    for (const [oldPrefix, newPrefix] of PREFIX_REWRITES) {
      if (normalizedPath === oldPrefix || normalizedPath.startsWith(oldPrefix + "/")) {
        const remainder = normalizedPath.slice(oldPrefix.length);
        const target = newPrefix + remainder;
        if (target !== normalizedPath) {
          setLocation(target, { replace: true });
        }
        return;
      }
    }
  }, [location, setLocation]);

  return null;
}
