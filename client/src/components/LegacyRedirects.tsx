import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Maps old URL paths (from the previous website) to the current URL structure.
 * Client-side redirects are needed because the hosting CDN serves the SPA shell
 * for all unknown paths before the Express server can handle them.
 * 
 * Note: Trailing slashes are normalized before lookup.
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
  "/en/electronics-manufacturing": "/en/manufacturing",
  "/en/electronics-manufacturing/assembling-printed-circuit-boards": "/en/manufacturing/printed-circuit-boards",
  "/en/electronics-manufacturing/electronic-assemblies": "/en/manufacturing/assemblies",
  "/en/electronics-manufacturing/qa-qm": "/en/manufacturing/quality",
  "/en/electronics-development": "/en/development",
  "/en/electronics-development/hardware-software": "/en/development/hardware-software",
  "/en/electronics-development/simulation": "/en/development/simulation",
  "/en/electronics-development/test-verification": "/en/development/test-verification",
  "/en/jobs": "/en/careers",
};

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

    const target = LEGACY_REDIRECT_MAP[normalizedPath];
    if (target && target !== normalizedPath) {
      // Use replace to avoid adding the old URL to browser history
      setLocation(target, { replace: true });
    }
  }, [location, setLocation]);

  return null;
}
