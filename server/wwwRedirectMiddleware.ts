import type { Request, Response, NextFunction } from "express";

/**
 * Express middleware that enforces the www subdomain.
 * 
 * Redirects all requests from non-canonical hosts (e.g. www.control-motion.de,
 * control-motion.com, controlmotion.de) to the canonical host (control-motion.de)
 * with a 301 permanent redirect.
 * 
 * Note: Cloudflare already handles www.control-motion.de → control-motion.de,
 * but this middleware catches other domain variants that Cloudflare doesn't handle.
 * 
 * This prevents duplicate content / duplicate canonical issues in SEO tools
 * like Sistrix, which crawl both host variants independently.
 * 
 * MUST run as the very first middleware, before redirects and pre-rendering.
 * 
 * In development mode (localhost), this middleware is a no-op.
 */

const CANONICAL_HOST = "control-motion.de";

// Hosts that should be redirected to the canonical host (non-www)
// Note: Cloudflare already redirects www.control-motion.de → control-motion.de,
// but we keep this as a safety net for other domain variants.
const REDIRECT_HOSTS = [
  "www.control-motion.de",
  "control-motion.com",
  "www.control-motion.com",
  "controlmotion.de",
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
    if (REDIRECT_HOSTS.includes(host)) {
      const protocol = req.protocol || "https";
      const targetUrl = `https://${CANONICAL_HOST}${req.originalUrl}`;
      
      console.log(`[WWW-Redirect] 301 ${protocol}://${host}${req.originalUrl} → ${targetUrl}`);
      return res.redirect(301, targetUrl);
    }

    // Unknown host – pass through
    next();
  };
}
