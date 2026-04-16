import type { Request, Response, NextFunction } from "express";

/**
 * Express middleware that enforces the www subdomain.
 * 
 * Redirects all requests from non-www hosts (e.g. control-motion.de)
 * to the www variant (www.control-motion.de) with a 301 permanent redirect.
 * 
 * This prevents duplicate content / duplicate canonical issues in SEO tools
 * like Sistrix, which crawl both host variants independently.
 * 
 * MUST run as the very first middleware, before redirects and pre-rendering.
 * 
 * In development mode (localhost), this middleware is a no-op.
 */

const CANONICAL_HOST = "www.control-motion.de";

// Hosts that should be redirected to the canonical www host
const NON_WWW_HOSTS = [
  "control-motion.de",
  "control-motion.com",
  "controlmotion.de",
  "www.control-motion.com",
  "www.controlmotion.de",
];

export function wwwRedirectMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    const host = (req.headers.host || "").split(":")[0].toLowerCase();

    // Skip in development (localhost, 127.0.0.1, manus.computer dev URLs)
    if (
      !host ||
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.includes("manus.computer") ||
      host.includes("manus.space") ||
      host === CANONICAL_HOST
    ) {
      return next();
    }

    // Check if this is a non-canonical host that needs redirecting
    if (NON_WWW_HOSTS.includes(host)) {
      const protocol = req.protocol || "https";
      const targetUrl = `https://${CANONICAL_HOST}${req.originalUrl}`;
      
      console.log(`[WWW-Redirect] 301 ${protocol}://${host}${req.originalUrl} → ${targetUrl}`);
      return res.redirect(301, targetUrl);
    }

    // Unknown host – pass through
    next();
  };
}
