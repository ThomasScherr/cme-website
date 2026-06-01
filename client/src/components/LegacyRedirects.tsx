import { useEffect } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Maps old URL paths (from the previous website) to the current URL structure.
 * Also handles EN path routing: EN URLs (from sitemap/hreflang) are redirected
 * to the corresponding DE route while switching the language context to English.
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

  // Englische alte URLs
  "/en/jobs": "/en/careers",
};

// ── EN path → DE path mapping (from sitemap/hreflang) ──
// When a user or crawler visits an EN URL, redirect to the DE route and switch language to EN
const EN_TO_DE_MAP: Record<string, string> = {
  "/en": "/",
  "/en/development": "/entwicklung",
  "/en/development/hardware-software": "/entwicklung/hardware-software",
  "/en/development/simulation": "/entwicklung/simulation",
  "/en/development/test-verification": "/entwicklung/test-verifikation",
  "/en/development/ux-interface-engineering": "/entwicklung/ux-interface-engineering",
  "/en/development/software-digital-systems": "/entwicklung/software-digitale-systeme",
  "/en/development/e-motor-design": "/entwicklung/e-motor-design",
  "/en/development/control-design": "/entwicklung/control-design",
  "/en/development/emc-validation": "/entwicklung/validierung-emv",
  "/en/development/ai-development": "/entwicklung/ki-entwicklung",
  "/en/manufacturing": "/fertigung",
  "/en/manufacturing/printed-circuit-boards": "/fertigung/leiterplatten",
  "/en/manufacturing/assemblies": "/fertigung/baugruppen",
  "/en/manufacturing/quality": "/fertigung/qualitaet",
  "/en/manufacturing/smd-assembly": "/fertigung/smd-bestueckung",
  "/en/manufacturing/prototypes": "/fertigung/prototypen",
  "/en/lifecycle": "/lifecycle",
  "/en/markets": "/maerkte",
  "/en/company": "/unternehmen",
  "/en/contact": "/kontakt",
  "/en/careers": "/karriere",
  "/en/insights": "/insights",
  "/en/terms-and-conditions": "/agb",
  "/en/privacy-policy": "/datenschutz",
  "/en/imprint": "/impressum",
};

// ── Wildcard prefix rewrites ──
const PREFIX_REWRITES: [string, string][] = [
  ["/elektronikfertigung", "/fertigung"],
  ["/en/electronics-development", "/en/development"],
  ["/en/electronics-manufacturing", "/en/manufacturing"],
];

/**
 * Component that checks the current path against legacy URLs and EN paths,
 * and performs a client-side redirect (replace) if a match is found.
 * Must be rendered inside the Router context.
 */
export default function LegacyRedirects() {
  const [location, setLocation] = useLocation();
  const { setLang } = useLanguage();

  useEffect(() => {
    // Normalize: remove trailing slash for lookup (except root "/")
    const normalizedPath = location.length > 1 && location.endsWith("/")
      ? location.slice(0, -1)
      : location;

    // 1. Check EN path mapping first (switch language + redirect to DE route)
    const deTarget = EN_TO_DE_MAP[normalizedPath];
    if (deTarget !== undefined) {
      setLang('en');
      setLocation(deTarget, { replace: true });
      return;
    }

    // 2. Check exact match
    const exactTarget = LEGACY_REDIRECT_MAP[normalizedPath];
    if (exactTarget && exactTarget !== normalizedPath) {
      // If the target is an EN path, check EN map recursively
      const enDeTarget = EN_TO_DE_MAP[exactTarget];
      if (enDeTarget !== undefined) {
        setLang('en');
        setLocation(enDeTarget, { replace: true });
      } else {
        setLocation(exactTarget, { replace: true });
      }
      return;
    }

    // 3. Check wildcard prefix rewrites
    for (const [oldPrefix, newPrefix] of PREFIX_REWRITES) {
      if (normalizedPath === oldPrefix || normalizedPath.startsWith(oldPrefix + "/")) {
        const remainder = normalizedPath.slice(oldPrefix.length);
        const target = newPrefix + remainder;
        if (target !== normalizedPath) {
          // Check if rewritten target is an EN path
          const enDeTarget = EN_TO_DE_MAP[target];
          if (enDeTarget !== undefined) {
            setLang('en');
            setLocation(enDeTarget, { replace: true });
          } else {
            setLocation(target, { replace: true });
          }
        }
        return;
      }
    }
  }, [location, setLocation, setLang]);

  return null;
}
