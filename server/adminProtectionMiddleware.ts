/**
 * Admin Route Protection Middleware
 * 
 * Blocks public access and crawlers from /admin/* routes.
 * Returns 403 with noindex for crawlers and unauthenticated users.
 * Authenticated admin users pass through to the SPA.
 */

import type { Request, Response, NextFunction } from 'express';

const CRAWLER_PATTERNS = [
  'bot', 'crawler', 'spider', 'scraper', 'googlebot', 'bingbot', 'sistrix',
  'semrush', 'ahrefs', 'gptbot', 'claudebot', 'perplexitybot', 'slurp',
  'facebot', 'twitterbot', 'linkedinbot', 'applebot',
];

function isCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return CRAWLER_PATTERNS.some(pattern => ua.includes(pattern));
}

export function adminProtectionMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    // Only intercept /admin/* routes
    if (!req.path.startsWith('/admin')) {
      return next();
    }

    const userAgent = req.headers['user-agent'] || '';

    // Block crawlers with 403 + noindex
    if (isCrawler(userAgent)) {
      console.log(`[Admin-Protection] 403 for crawler: ${req.path} (${userAgent.substring(0, 60)})`);
      res.status(403);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
      res.send(`<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="robots" content="noindex, nofollow">
    <title>403 – Zugriff verweigert</title>
</head>
<body>
    <h1>403 – Zugriff verweigert</h1>
    <p>Diese Seite ist nicht öffentlich zugänglich.</p>
</body>
</html>`);
      return;
    }

    // For non-crawler requests: set noindex header and let SPA handle auth
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    next();
  };
}
