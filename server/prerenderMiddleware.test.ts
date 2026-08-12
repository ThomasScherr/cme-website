import { describe, expect, it, vi, beforeEach } from "vitest";
import { prerenderMiddleware } from "./prerenderMiddleware";

// Helper: create mock Express req/res/next
function createMockReq(
  method: string,
  path: string,
  userAgent: string
): { method: string; path: string; headers: Record<string, string> } {
  return {
    method,
    path,
    headers: { "user-agent": userAgent },
  };
}

function createMockRes() {
  const res = {
    _headers: {} as Record<string, string>,
    _body: "",
    _sent: false,
    _statusCode: 200,
    _redirectUrl: "",
    setHeader(key: string, value: string) {
      res._headers[key.toLowerCase()] = value;
    },
    send(body: string) {
      res._body = body;
      res._sent = true;
    },
    status(code: number) {
      res._statusCode = code;
      return res;
    },
    redirect(statusOrUrl: number | string, url?: string) {
      if (typeof statusOrUrl === 'number') {
        res._statusCode = statusOrUrl;
        res._redirectUrl = url || '';
      } else {
        res._statusCode = 302;
        res._redirectUrl = statusOrUrl;
      }
      res._sent = true;
    },
  };
  return res;
}

describe("prerenderMiddleware", () => {
  const middleware = prerenderMiddleware();
  let next: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    next = vi.fn();
  });

  // ── Crawler detection ──

  it("serves pre-rendered HTML to Googlebot on /", () => {
    const req = createMockReq("GET", "/", "Googlebot/2.1 (+http://www.google.com/bot.html)");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(true);
    expect(next).not.toHaveBeenCalled();
    expect(res._headers["content-type"]).toBe("text/html; charset=utf-8");
    expect(res._headers["x-prerendered"]).toBe("true");
    expect(res._body).toContain("<h1>");
    expect(res._body).toContain("CME");
  });

  it("serves pre-rendered HTML to SistrixBot", () => {
    const req = createMockReq("GET", "/", "Mozilla/5.0 (compatible; SISTRIX Crawler; +http://www.sistrix.com/)");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(true);
    expect(res._body).toContain("<h1>");
  });

  it("serves pre-rendered HTML to PerplexityBot", () => {
    const req = createMockReq("GET", "/fertigung", "PerplexityBot/1.0");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(true);
    expect(res._body).toContain("EMS-Fertigung");
  });

  it("serves pre-rendered HTML to GPTBot", () => {
    const req = createMockReq("GET", "/entwicklung", "GPTBot/1.0");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(true);
    expect(res._body).toContain("Entwicklung");
  });

  it("serves pre-rendered HTML to ClaudeBot", () => {
    const req = createMockReq("GET", "/", "ClaudeBot/1.0");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(true);
    expect(res._body).toContain("<h1>");
  });

  it("serves pre-rendered HTML to Bingbot", () => {
    const req = createMockReq("GET", "/", "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(true);
  });

  // ── Normal browser passthrough ──

  it("passes through for normal browser User-Agent", () => {
    const req = createMockReq("GET", "/", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(false);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("passes through for empty User-Agent", () => {
    const req = createMockReq("GET", "/", "");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(false);
    expect(next).toHaveBeenCalledTimes(1);
  });

  // ── Method filtering ──

  it("passes through for POST requests", () => {
    const req = createMockReq("POST", "/", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(false);
    expect(next).toHaveBeenCalledTimes(1);
  });

  // ── Path filtering ──

  it("passes through for /api/ paths", () => {
    const req = createMockReq("GET", "/api/trpc/test", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(false);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("passes through for static files (paths with dots)", () => {
    const req = createMockReq("GET", "https://ventspire-cdn.b-cdn.net/cme/style.css", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(false);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("passes through for Vite internal paths", () => {
    const req = createMockReq("GET", "/@vite/client", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(false);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("passes through for /src/ paths", () => {
    const req = createMockReq("GET", "/src/main.tsx", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(false);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("passes through for favicon.ico", () => {
    const req = createMockReq("GET", "/favicon.ico", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(false);
    expect(next).toHaveBeenCalledTimes(1);
  });

  // ── Unknown pages ──

  it("serves 404 HTML to crawlers for unknown paths", () => {
    const req = createMockReq("GET", "/nonexistent-page", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(true);
    expect(res._statusCode).toBe(404);
    expect(res._body).toContain('Seite nicht gefunden');
    expect(res._body).toContain('noindex');
    expect(next).not.toHaveBeenCalled();
  });

  it("serves EN 404 HTML to crawlers for unknown EN paths", () => {
    const req = createMockReq("GET", "/en/nonexistent-page", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(true);
    expect(res._statusCode).toBe(404);
    expect(res._body).toContain('Page Not Found');
    expect(res._body).toContain('noindex');
    expect(next).not.toHaveBeenCalled();
  });

  it("resolves EN paths to DE page data and serves prerendered HTML", () => {
    const req = createMockReq("GET", "/en/development", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(true);
    expect(res._statusCode).toBe(200);
    expect(res._body).toContain('lang="en"');
    expect(res._body).toContain('en_US');
    expect(next).not.toHaveBeenCalled();
  });

  // ── Content correctness ──

  it("does not include canonical tag (handled by hosting platform)", () => {
    const req = createMockReq("GET", "/", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._body).not.toContain('rel="canonical"');
    // hreflang still includes the correct URLs
    expect(res._body).toContain('hreflang="de"');
    expect(res._body).toContain('href="https://control-motion.de/"');
  });

  it("includes correct hreflang URLs for subpages", () => {
    const req = createMockReq("GET", "/entwicklung", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._body).toContain('hreflang="de"');
    expect(res._body).toContain('href="https://control-motion.de/entwicklung/"');
  });

  it("includes Organization schema on homepage", () => {
    const req = createMockReq("GET", "/", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._body).toContain('"@type":"Organization"');
    expect(res._body).toContain('"@type":"WebSite"');
  });

  it("includes Open Graph meta tags", () => {
    const req = createMockReq("GET", "/", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._body).toContain('property="og:type"');
    expect(res._body).toContain('property="og:title"');
    expect(res._body).toContain('property="og:description"');
    // og:url added for GEO audit compliance
    expect(res._body).toContain('property="og:url"');
    expect(res._body).toContain('property="og:image"');
  });

  it("includes Twitter Card meta tags", () => {
    const req = createMockReq("GET", "/", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._body).toContain('name="twitter:card"');
    expect(res._body).toContain('name="twitter:title"');
  });

  it("includes navigation links in pre-rendered HTML", () => {
    const req = createMockReq("GET", "/", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._body).toContain('href="/entwicklung"');
    expect(res._body).toContain('href="/fertigung"');
    expect(res._body).toContain('href="/kontakt"');
    expect(res._body).toContain('href="/impressum"');
    expect(res._body).toContain('href="/datenschutz"');
  });

  it("includes footer with contact information", () => {
    const req = createMockReq("GET", "/", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._body).toContain("info@control-motion.de");
    expect(res._body).toContain("Alter Hellweg 48");
    expect(res._body).toContain("44379 Dortmund");
  });

  // ── All defined pages return content ──

  const definedPages = [
    "/",
    "/entwicklung",
    "/entwicklung/hardware-software",
    "/entwicklung/simulation",
    "/entwicklung/test-verifikation",
    "/entwicklung/ux-interface-engineering",
    "/entwicklung/software-digitale-systeme",
    "/entwicklung/e-motor-design",
    "/entwicklung/control-design",
    "/entwicklung/validierung-emv",
    "/entwicklung/ki-entwicklung",
    "/fertigung",
    "/fertigung/leiterplatten",
    "/fertigung/baugruppen",
    "/fertigung/qualitaet",
    "/lifecycle",
    "/maerkte",
    "/unternehmen",
    "/kontakt",
    "/karriere",
    "/insights",
    "/impressum",
    "/datenschutz",
    "/agb",
  ];

  definedPages.forEach((pagePath) => {
    it(`serves pre-rendered HTML for ${pagePath}`, () => {
      const req = createMockReq("GET", pagePath, "Googlebot/2.1");
      const res = createMockRes();
      middleware(req, res, next);

      expect(res._sent).toBe(true);
      expect(res._body).toContain("<h1>");
      expect(res._body).toContain("<!DOCTYPE html>");
      expect(res._body).toContain('lang="de"');
    });
  });

  // ── Trailing slash normalization ──

  it("handles trailing slashes correctly", () => {
    const req = createMockReq("GET", "/entwicklung/", "Googlebot/2.1");
    const res = createMockRes();
    middleware(req, res, next);

    expect(res._sent).toBe(true);
    expect(res._body).toContain("Entwicklung");
  });
});
