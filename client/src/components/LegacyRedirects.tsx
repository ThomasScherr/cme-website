import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Leitet alte URLs der Vorgängerseite auf die heutige Struktur um.
 *
 * Der Server erledigt dasselbe per 301 (server/legacyRedirects.ts). Diese
 * Komponente greift nur bei Navigation innerhalb der laufenden Anwendung.
 *
 * ENTFERNT: die frühere EN_TO_DE_MAP. Sie hat englische URLs auf die deutschen
 * umgeleitet und dabei die Sprache umgeschaltet – /en/manufacturing war damit
 * keine eigene Adresse, sondern eine Weiterleitung, und ohne JavaScript gab es
 * gar keine englische Fassung. Die englischen Pfade sind jetzt echte Routen
 * (siehe shared/routes.ts und App.tsx).
 *
 * Unterstützt exakte Treffer und Präfix-Ersetzungen. Abschließende
 * Schrägstriche werden vor dem Nachschlagen entfernt.
 */

// ── Exakte Treffer ──
const LEGACY_REDIRECT_MAP: Record<string, string> = {
  // Deutsche alte URLs → neue deutsche Routen
  "/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten": "/fertigung/leiterplatten",
  "/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/leiterplatten-bestuecken-smd-und-tht": "/fertigung/leiterplatten",
  "/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/baugruppen": "/fertigung/baugruppen",
  "/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/qs-qm": "/fertigung/qualitaet",
  "/smd-fragen-entwurf": "/fertigung",

  // Sistrix canonical fixes: Varianten ohne Bindestrich → kanonische URLs
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
  "/en/jobs": "/en/careers",
};

// ── Präfix-Ersetzungen ──
const PREFIX_REWRITES: [string, string][] = [
  ["/elektronikfertigung", "/fertigung"],
  ["/en/electronics-development", "/en/development"],
  ["/en/electronics-manufacturing", "/en/manufacturing"],
];

export default function LegacyRedirects() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const normalizedPath =
      location.length > 1 && location.endsWith("/") ? location.slice(0, -1) : location;

    const exactTarget = LEGACY_REDIRECT_MAP[normalizedPath];
    if (exactTarget && exactTarget !== normalizedPath) {
      setLocation(exactTarget, { replace: true });
      return;
    }

    for (const [oldPrefix, newPrefix] of PREFIX_REWRITES) {
      if (normalizedPath === oldPrefix || normalizedPath.startsWith(oldPrefix + "/")) {
        const target = newPrefix + normalizedPath.slice(oldPrefix.length);
        if (target !== normalizedPath) {
          setLocation(target, { replace: true });
        }
        return;
      }
    }
  }, [location, setLocation]);

  return null;
}
