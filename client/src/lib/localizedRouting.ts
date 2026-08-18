/**
 * Sprachbewusstes Routing für wouter.
 *
 * PROBLEM
 * Im Code stehen alle internen Ziele als deutsche Pfade: href="/fertigung".
 * Seit die Sprache aus der URL kommt, würde jeder Klick auf einer englischen
 * Seite zurück ins Deutsche führen – und im HTML stünde <a href="/fertigung">,
 * also verlinkt die englische Fassung ausschließlich deutsche Seiten. Für
 * Crawler sähe der englische Teil damit aus wie eine Sackgasse.
 *
 * LÖSUNG
 * Beides wird an einer Stelle übersetzt, statt in zwanzig Dateien:
 *
 *   1. `hrefs` – wouter reicht jedes href vor dem Rendern durch diese Funktion.
 *      Sie bestimmt das, was im HTML steht, also das, was Crawler folgen.
 *   2. `useLocalizedBrowserLocation` – dieselbe Übersetzung für das Ziel eines
 *      Klicks, denn wouter navigiert mit dem ursprünglichen Pfad, nicht mit dem
 *      href-Attribut.
 *
 * Beides wird in main.tsx (und beim Vorrendern in entry-server.tsx) am
 * <Router> gesetzt. Einzelne Seiten müssen nichts wissen und nichts ändern.
 *
 * REGEL
 * Übersetzt werden nur deutsche Pfade. Ein Ziel, das bereits mit /en beginnt,
 * bleibt unangetastet – sonst würde der Sprachumschalter sein eigenes Ziel
 * wieder zurückübersetzen.
 */

import { useCallback } from "react";
import { useBrowserLocation } from "wouter/use-browser-location";
import { isEnglishPath, langFromPath, toEnPath } from "@shared/routes";

/** Interne Ziele in die angegebene Sprache übersetzen. */
export function localizeHref(href: string, lang: "de" | "en"): string {
  if (typeof href !== "string" || !href.startsWith("/")) return href; // http, mailto, tel, #anker
  if (href.startsWith("/admin")) return href; // Verwaltung ist einsprachig
  if (isEnglishPath(href)) return href; // schon englisch – nicht anfassen
  if (lang !== "en") return href;

  const [pathOnly, rest] = splitPath(href);
  const trailingSlash = pathOnly.length > 1 && pathOnly.endsWith("/");
  const en = toEnPath(pathOnly);
  if (!en) return href; // keine englische Fassung – deutscher Pfad bleibt
  return en + (trailingSlash ? "/" : "") + rest;
}

function splitPath(href: string): [string, string] {
  const cut = href.search(/[?#]/);
  return cut === -1 ? [href, ""] : [href.slice(0, cut), href.slice(cut)];
}

/**
 * Interne Verweise in HTML-Inhalten übersetzen.
 *
 * Redaktionelle Inhalte aus dem CMS enthalten fertiges HTML, etwa den Verweis
 * auf die Datenschutzerklärung in der Einwilligung des Kontaktformulars. Diese
 * Verweise gehen nicht durch wouter und blieben sonst auch auf englischen
 * Seiten deutsch.
 */
export function localizeHtmlHrefs(html: string, lang: "de" | "en"): string {
  if (lang !== "en" || typeof html !== "string" || !html.includes('href="/')) return html;
  return html.replace(
    /href="(\/[^"]*)"/g,
    (_match, href: string) => `href="${localizeHref(href, lang)}"`
  );
}

/**
 * `hrefs`-Funktion für den <Router>. wouter ruft sie mit dem Ziel und dem
 * Router-Objekt auf. Der aktuell angezeigte Pfad kommt im Browser aus
 * window.location, beim Vorrendern aus ssrPath – deshalb funktioniert dieselbe
 * Funktion in beiden Fällen.
 */
export function localizedHrefs(href: string, router?: { ssrPath?: string }): string {
  const path =
    typeof window !== "undefined" ? window.location.pathname : router?.ssrPath ?? "/";
  return localizeHref(href, langFromPath(path));
}

/**
 * Location-Hook des Browsers, der Navigationsziele mitübersetzt.
 * Wird als `hook` an den <Router> gegeben; `hrefs` hängt als Eigenschaft daran,
 * wouter übernimmt sie von dort (siehe wouter: props.hrefs ?? props.hook?.hrefs).
 */
export function useLocalizedBrowserLocation(
  ...args: Parameters<typeof useBrowserLocation>
): ReturnType<typeof useBrowserLocation> {
  const [path, navigate] = useBrowserLocation(...args);
  const lang = langFromPath(path);

  const localizedNavigate = useCallback(
    (to: string, options?: Parameters<typeof navigate>[1]) =>
      navigate(typeof to === "string" ? localizeHref(to, lang) : to, options),
    [navigate, lang]
  );

  return [path, localizedNavigate as typeof navigate];
}

useLocalizedBrowserLocation.hrefs = localizedHrefs;
