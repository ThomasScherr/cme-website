import type { Request, Response, NextFunction } from "express";

/**
 * Trailing-slash normalization middleware.
 * 
 * Redirects any URL with a trailing slash to the same URL without it via 301.
 * This prevents duplicate content issues (Sistrix: identical H1 / meta-description
 * on /path and /path/).
 * 
 * Exceptions:
 * - Root path "/" is never redirected
 * - API routes, static assets, and Vite internals are skipped
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

    // If path ends with "/" → 301 redirect to path without trailing slash
    if (path.length > 1 && path.endsWith("/")) {
      const cleanPath = path.slice(0, -1);
      // Preserve query string if present
      const queryString = req.originalUrl.includes("?")
        ? req.originalUrl.substring(req.originalUrl.indexOf("?"))
        : "";
      res.redirect(301, cleanPath + queryString);
      return;
    }

    next();
  };
}
