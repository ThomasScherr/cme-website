import type { Request, Response, NextFunction } from "express";
/**
 * Trailing-slash normalization middleware.
 * 
 * Redirects any URL WITHOUT a trailing slash to the same URL WITH it via 301.
 * This ensures all canonical URLs use trailing slashes, consistent with:
 * - sitemap.xml
 * - seoHtmlInjector.ts
 * - prerenderMiddleware.ts
 * - generate-seo-pages.mjs
 * - SEO.tsx (React Helmet)
 * 
 * Exceptions:
 * - Root path "/" is never redirected (already has trailing slash)
 * - API routes, static assets (files with extensions), and Vite internals are skipped
 * 
 * Must run AFTER wwwRedirectMiddleware (host normalization) but BEFORE
 * legacyRedirectMiddleware and prerenderMiddleware.
 */
export function trailingSlashMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    // Only handle GET requests
    if (req.method !== "GET") return next();

    const path = req.path;

    // Skip root, API routes, static assets, Vite internals
    if (
      path === "/" ||
      path.startsWith("/api/") ||
      path.startsWith("/@") ||
      path.startsWith("/node_modules/") ||
      path.startsWith("/src/") ||
      path === "/favicon.ico"
    ) {
      return next();
    }

    // Skip files with extensions (e.g., .js, .css, .png, .xml, .json, .txt)
    if (path.includes(".")) {
      return next();
    }

    // If path does NOT end with "/" → 301 redirect to path WITH trailing slash
    if (!path.endsWith("/")) {
      // Preserve query string if present
      const queryString = req.originalUrl.includes("?")
        ? req.originalUrl.substring(req.originalUrl.indexOf("?"))
        : "";
      res.redirect(301, path + "/" + queryString);
      return;
    }

    next();
  };
}
