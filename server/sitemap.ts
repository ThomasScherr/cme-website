import type { Request, Response } from "express";
import { getPublishedArticles } from "./db";
import { SEO_PAGES } from "./seoPageData";
import { canonicalUrl } from "./seoHead";
import { DE_TO_EN, EN_PREFIX } from "@shared/routes";

/**
 * Erzeugt sitemap.xml bei jedem Abruf aus denselben Quellen wie die Seiten.
 *
 * WAS DAS ERSETZT
 * client/public/sitemap.xml war handgepflegt, 49 URLs, ohne lastmod. Sie war
 * beim Nachzaehlen bereits falsch: /elektronikentwicklung,
 * /elektronikentwicklung-muenchen und /media-center fehlten, alle sechs
 * Fachartikel fehlten ebenfalls. Jede neue Seite haette sie erneut falsch
 * gemacht.
 *
 * Jetzt gilt: Was es als Seite gibt, steht drin. Was es nicht gibt, steht nicht
 * drin. Auseinanderlaufen ist damit nicht mehr moeglich, sondern nur noch ein
 * Fehler in dieser einen Funktion.
 */

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq: string;
  priority: string;
}

/** Wichtigkeit nach Tiefe: Startseite vor Hauptbereich vor Unterseite. */
function priorityFor(path: string): string {
  if (path === "/") return "1.0";
  const depth = path.split("/").filter(Boolean).length;
  if (depth === 1) return "0.9";
  if (depth === 2) return "0.8";
  return "0.7";
}

function isoDate(value: Date | string | null | undefined): string | undefined {
  if (!value) return undefined;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export interface ArticleForSitemap {
  slug: string;
  updatedAt?: Date | string | null;
  publishedAt?: Date | string | null;
  titleEn?: string | null;
  contentEn?: string | null;
}

/** Alle URLs der Seite – feste Seiten, englische Fassungen, Fachartikel. */
export function collectSitemapEntries(articles: ArticleForSitemap[]): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  for (const dePath of Object.keys(SEO_PAGES)) {
    entries.push({
      loc: canonicalUrl(dePath),
      changefreq: dePath === "/" ? "weekly" : "monthly",
      priority: priorityFor(dePath),
    });
    const enPath = DE_TO_EN[dePath];
    if (enPath) {
      entries.push({
        loc: canonicalUrl(enPath),
        changefreq: enPath === EN_PREFIX ? "weekly" : "monthly",
        priority: priorityFor(dePath),
      });
    }
  }

  for (const article of articles) {
    const dePath = `/insights/${article.slug}`;
    const lastmod = isoDate(article.updatedAt) ?? isoDate(article.publishedAt);
    entries.push({ loc: canonicalUrl(dePath), lastmod, changefreq: "monthly", priority: "0.7" });
    // Die englische Fassung nur aufnehmen, wenn es sie inhaltlich gibt –
    // sonst stuenden URLs in der Sitemap, die deutschen Text zeigen.
    if (article.titleEn && article.contentEn) {
      entries.push({
        loc: canonicalUrl(`${EN_PREFIX}${dePath}`),
        lastmod,
        changefreq: "monthly",
        priority: "0.7",
      });
    }
  }

  return entries;
}

export function renderSitemap(entries: SitemapEntry[]): string {
  const urls = entries
    .map(entry => {
      const parts = [
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>` : "",
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
      ].filter(Boolean);
      return `  <url>\n${parts.join("\n")}\n  </url>`;
    })
    .join("\n");

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls +
    "\n</urlset>\n"
  );
}

/** Kurzer Zwischenspeicher – Crawler fragen die Datei oft mehrfach ab. */
let cached: { xml: string; until: number } | null = null;
const CACHE_MS = 5 * 60 * 1000;

export function sitemapHandler() {
  return async (_req: Request, res: Response) => {
    const now = Date.now();
    if (cached && cached.until > now) {
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=300");
      return res.send(cached.xml);
    }

    let articles: ArticleForSitemap[] = [];
    try {
      articles = (await getPublishedArticles(500, 0)) as ArticleForSitemap[];
    } catch (error) {
      // Ohne Datenbank lieber die festen Seiten ausliefern als gar nichts.
      console.error("[sitemap] Artikel nicht lesbar:", error);
    }

    const xml = renderSitemap(collectSitemapEntries(articles));
    cached = { xml, until: now + CACHE_MS };

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=300");
    res.send(xml);
  };
}

/** Für Tests: den Zwischenspeicher leeren. */
export function resetSitemapCache(): void {
  cached = null;
}
