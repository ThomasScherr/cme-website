import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import type { Request, Response, NextFunction } from "express";
import { getArticleBySlug, getAuthorById, getPublishedArticles } from "./db";
import { buildDocument } from "./buildDocument";
import { buildHead, canonicalUrl, escapeHtml } from "./seoHead";
import { SITE_NAME, DEFAULT_OG_IMAGE } from "./seoPageData";
import { EN_PREFIX, isEnglishPath, normalizePath } from "@shared/routes";

/**
 * Seiten, deren Inhalt aus der Datenbank kommt.
 *
 * Warum nicht im Build: Beim Bauen des Images ist die Datenbank nicht
 * erreichbar – DATABASE_URL ist eine Umgebungsvariable des laufenden Dienstes,
 * nicht des Builds. Die Fachartikel werden deshalb beim ersten Abruf gerendert
 * und als Datei abgelegt. Danach liefert dieselbe Auslieferung wie bei den
 * vorgerenderten Seiten.
 *
 * WAS DAS BEHEBT
 * /insights/<slug> lieferte bisher HTTP 404 – nachgemessen an der laufenden
 * Instanz für alle sechs veröffentlichten Artikel. Der Browser zeigte den
 * Artikel trotzdem an (die Anwendung lud ihn nach), aber für Google war die
 * Seite ein Fehler. Kein einziger Fachartikel konnte in den Index kommen.
 */

const CACHE_DIRNAME = "article-cache";

export interface ArticleRecord {
  slug: string;
  title: string;
  titleEn?: string | null;
  excerpt?: string | null;
  excerptEn?: string | null;
  metaTitle?: string | null;
  metaTitleEn?: string | null;
  metaDescription?: string | null;
  metaDescriptionEn?: string | null;
  coverImage?: string | null;
  status: string;
  updatedAt?: Date | string | null;
  publishedAt?: Date | string | null;
  authorId?: number | null;
}

/** Erkennt /insights/<slug> und /en/insights/<slug>. */
export function matchArticleRoute(url: string): { slug: string; lang: "de" | "en" } | null {
  const p = normalizePath(url);
  const en = isEnglishPath(p);
  const rest = en ? p.slice(EN_PREFIX.length) : p;
  const m = /^\/insights\/([a-z0-9][a-z0-9-]*[a-z0-9])$/.exec(rest);
  if (!m) return null;
  return { slug: m[1], lang: en ? "en" : "de" };
}

/** Erkennt die Übersichtsseite /insights und /en/insights. */
export function matchInsightsIndex(url: string): "de" | "en" | null {
  const p = normalizePath(url);
  if (p === "/insights") return "de";
  if (p === `${EN_PREFIX}/insights`) return "en";
  return null;
}

/**
 * Kopfdaten eines Artikels.
 *
 * seoHead.ts kennt nur die festen Seiten; für Artikel kommen Titel und
 * Beschreibung aus der Datenbank. Aufbau und Reihenfolge sind bewusst dieselben
 * wie dort, damit es keine zweite Wahrheit gibt.
 */
export function buildArticleHead(article: ArticleRecord, lang: "de" | "en"): { tags: string; lang: "de" | "en" } {
  const dePath = `/insights/${article.slug}`;
  const enPath = `${EN_PREFIX}${dePath}`;
  const canonical = canonicalUrl(lang === "en" ? enPath : dePath);

  const title =
    lang === "en"
      ? article.metaTitleEn || article.titleEn || article.metaTitle || article.title
      : article.metaTitle || article.title;
  const description =
    lang === "en"
      ? article.metaDescriptionEn || article.excerptEn || article.metaDescription || article.excerpt || ""
      : article.metaDescription || article.excerpt || "";
  const image = article.coverImage || DEFAULT_OG_IMAGE;

  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    description ? `<meta name="description" content="${escapeHtml(description)}" />` : "",
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<meta name="author" content="${escapeHtml(SITE_NAME)}" />`,
    "",
    `<link rel="alternate" hreflang="de" href="${canonicalUrl(dePath)}" />`,
    `<link rel="alternate" hreflang="en" href="${canonicalUrl(enPath)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${canonicalUrl(dePath)}" />`,
    "",
    `<meta property="og:type" content="article" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    description ? `<meta property="og:description" content="${escapeHtml(description)}" />` : "",
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:locale" content="${lang === "en" ? "en_US" : "de_DE"}" />`,
    "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    description ? `<meta name="twitter:description" content="${escapeHtml(description)}" />` : "",
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
  ]
    .filter(line => line !== "")
    .join("\n    ");

  return { tags, lang };
}

type RenderFn = (
  url: string,
  seed?: {
    articleList?: unknown;
    article?: { slug: string; data: unknown };
    author?: { id: number; data: unknown };
  }
) => Promise<{ html: string; lang: "de" | "en" }>;

let renderPromise: Promise<RenderFn> | null = null;

/** Lädt den Renderer erst beim ersten Bedarf – der Serverstart bleibt schnell. */
function loadRenderer(distPath: string): Promise<RenderFn> {
  if (!renderPromise) {
    const entry = path.resolve(distPath, "..", "server-entry", "entry-server.js");
    renderPromise = import(/* @vite-ignore */ `file://${entry}`).then(m => m.render as RenderFn);
  }
  return renderPromise;
}

function readShell(distPath: string): string {
  const shell = path.resolve(distPath, "..", "spa-shell.html");
  return fs.readFileSync(fs.existsSync(shell) ? shell : path.resolve(distPath, "index.html"), "utf8");
}

function cachePathFor(distPath: string, url: string): string {
  const p = normalizePath(url).replace(/^\/+/, "");
  return path.resolve(distPath, "..", CACHE_DIRNAME, p, "index.html");
}

function timestamp(value: Date | string | null | undefined): number {
  if (!value) return 0;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
}

/** Gültig, solange die Datei jünger ist als die letzte Änderung am Artikel. */
function cacheIsFresh(file: string, newerThan: number): boolean {
  try {
    return fs.statSync(file).mtimeMs > newerThan;
  } catch {
    return false;
  }
}

async function writeCache(file: string, html: string): Promise<void> {
  await fsp.mkdir(path.dirname(file), { recursive: true });
  await fsp.writeFile(file, html, "utf8");
}

function send(res: Response, html: string, status = 200): void {
  res.status(status);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=60");
  res.removeHeader("Pragma");
  res.send(html);
}

export interface DynamicPagesDeps {
  /** Nur fuer Tests: Renderer einsetzen, statt das Build-Ergebnis zu laden. */
  render?: RenderFn;
}

/**
 * Liefert Artikel und Artikelübersicht als fertiges HTML.
 *
 * Muss VOR prerenderedPagesMiddleware stehen: /insights hat eine vorgerenderte
 * Datei aus dem Build, aber darin fehlt die Artikelliste – die Datenbank war
 * beim Bauen nicht erreichbar.
 */
export function dynamicPagesMiddleware(distPath: string, deps: DynamicPagesDeps = {}) {
  const getRenderer = () => (deps.render ? Promise.resolve(deps.render) : loadRenderer(distPath));
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();

    const article = matchArticleRoute(req.originalUrl);
    const index = article ? null : matchInsightsIndex(req.originalUrl);
    if (!article && !index) return next();

    try {
      if (article) {
        const record = (await getArticleBySlug(article.slug)) as ArticleRecord | null;
        // Entwürfe und unbekannte Slugs laufen weiter – dann greift die
        // 404-Behandlung der SPA-Ruecklage.
        if (!record || record.status !== "published") return next();

        // Das Autorenprofil gehoert ins ausgelieferte HTML: AuthorCard laedt
        // es sonst erst im Browser, und dann steht im Quelltext weder Titel
        // noch Bio noch Person-Schema. Faellt die Abfrage aus, bleibt die
        // Seite trotzdem stehen - AuthorCard zeigt dann wie bisher nur den
        // Namen.
        const author = record.authorId
          ? await getAuthorById(record.authorId).catch(() => null)
          : null;

        const file = cachePathFor(distPath, req.originalUrl);
        // Auch eine Aenderung am Autorenprofil macht die Ablage ungueltig.
        const zuletztGeaendert = Math.max(
          timestamp(record.updatedAt),
          timestamp((author as { updatedAt?: Date | string | null } | null)?.updatedAt)
        );
        if (cacheIsFresh(file, zuletztGeaendert)) {
          return send(res, await fsp.readFile(file, "utf8"));
        }

        const render = await getRenderer();
        const { html } = await render(normalizePath(req.originalUrl), {
          article: { slug: article.slug, data: record },
          ...(author && record.authorId
            ? { author: { id: record.authorId, data: author } }
            : {}),
        });
        const doc = buildDocument(
          readShell(distPath),
          normalizePath(req.originalUrl),
          html,
          buildArticleHead(record, article.lang)
        );
        await writeCache(file, doc);
        return send(res, doc);
      }

      const list = (await getPublishedArticles(100, 0)) as ArticleRecord[];
      const newest = list.reduce((max, a) => Math.max(max, timestamp(a.updatedAt)), 0);
      const file = cachePathFor(distPath, req.originalUrl);
      if (cacheIsFresh(file, newest)) {
        return send(res, await fsp.readFile(file, "utf8"));
      }

      const render = await getRenderer();
      const route = normalizePath(req.originalUrl);
      const { html } = await render(route, { articleList: list });
      const doc = buildDocument(readShell(distPath), route, html, buildHead(route));
      await writeCache(file, doc);
      return send(res, doc);
    } catch (error) {
      console.error("[dynamicPages]", error);

      // Ist die Datenbank kurzzeitig nicht erreichbar, aber eine fruehere
      // Fassung liegt vor, dann lieber die ausliefern als eine Fehlerseite.
      // Eine leicht veraltete Seite ist besser als ein 404 im Index.
      try {
        const file = cachePathFor(distPath, req.originalUrl);
        if (fs.existsSync(file)) {
          return send(res, await fsp.readFile(file, "utf8"));
        }
      } catch {
        /* dann eben weiterreichen */
      }

      return next();
    }
  };
}
