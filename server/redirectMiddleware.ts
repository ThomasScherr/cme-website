import type { Request, Response, NextFunction } from "express";
import { findRedirectByPath, incrementRedirectHitCount } from "./db";

/**
 * Express middleware that checks for active redirects before serving pages.
 * Runs before Vite/static file serving so redirects take priority.
 * 
 * Only intercepts non-API, non-asset GET requests to avoid interfering
 * with tRPC, OAuth, or static file serving.
 */
export function redirectMiddleware() {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Only handle GET requests (not API calls, not assets)
    if (req.method !== "GET") return next();

    // Skip API routes, tRPC, OAuth, static assets
    const path = req.path;
    if (
      path.startsWith("/api/") ||
      path.startsWith("/@") ||          // Vite internals
      path.startsWith("/node_modules/") ||
      path.startsWith("/src/") ||        // Vite dev HMR
      path.includes(".") ||              // Files with extensions (js, css, images, etc.)
      path === "/favicon.ico"
    ) {
      return next();
    }

    try {
      const redirect = await findRedirectByPath(path);
      if (redirect) {
        // Increment hit counter (non-blocking)
        incrementRedirectHitCount(redirect.id).catch(() => {});

        // Perform the redirect
        res.redirect(redirect.statusCode, redirect.targetUrl);
        return;
      }
    } catch (err) {
      // If DB is unavailable, just continue normally
      console.error("[Redirect] Error checking redirects:", err);
    }

    next();
  };
}
