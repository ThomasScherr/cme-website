import { describe, it, expect, vi, beforeEach } from "vitest";
import { nonCanonicalHostNoindexMiddleware } from "./nonCanonicalHostNoindex";

function createMockReq(host: string | undefined, path: string = "/") {
  return {
    headers: host === undefined ? {} : { host },
    protocol: "https",
    path,
    originalUrl: path,
    method: "GET",
  } as any;
}

function createMockRes() {
  const res: any = { headers: {} as Record<string, string>, statusCode: 200 };
  res.setHeader = vi.fn((k: string, v: string) => {
    res.headers[k] = v;
  });
  res.status = vi.fn((code: number) => {
    res.statusCode = code;
    return res;
  });
  res.send = vi.fn();
  return res;
}

describe("nonCanonicalHostNoindexMiddleware", () => {
  const middleware = nonCanonicalHostNoindexMiddleware();
  let next: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    next = vi.fn();
  });

  // ── Kanonische Hosts bleiben unangetastet ──

  it("setzt keinen Header für control-motion.de", () => {
    const res = createMockRes();
    middleware(createMockReq("control-motion.de", "/kontakt/"), res, next);
    expect(res.setHeader).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("ignoriert den Port bei der Host-Prüfung", () => {
    const res = createMockRes();
    middleware(createMockReq("control-motion.de:3000", "/"), res, next);
    expect(res.setHeader).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("liefert die statische robots.txt auf dem kanonischen Host unverändert aus", () => {
    const res = createMockRes();
    middleware(createMockReq("control-motion.de", "/robots.txt"), res, next);
    expect(res.send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  // ── Nicht-kanonische Hosts werden geschützt ──

  it("setzt X-Robots-Tag für die Mittwald-Container-Domain", () => {
    const res = createMockRes();
    middleware(createMockReq("p-w48lps.project.space", "/kontakt/"), res, next);
    expect(res.headers["X-Robots-Tag"]).toBe("noindex, nofollow, noarchive");
    expect(next).toHaveBeenCalled();
  });

  it("liefert ein vollständiges Disallow für robots.txt auf Staging", () => {
    const res = createMockRes();
    middleware(createMockReq("p-w48lps.project.space", "/robots.txt"), res, next);
    expect(res.send).toHaveBeenCalledWith("User-agent: *\nDisallow: /\n");
    expect(res.statusCode).toBe(200);
    expect(next).not.toHaveBeenCalled();
  });

  it("schützt auch Anfragen ohne Host-Header", () => {
    const res = createMockRes();
    middleware(createMockReq(undefined, "/"), res, next);
    expect(res.headers["X-Robots-Tag"]).toBe("noindex, nofollow, noarchive");
    expect(next).toHaveBeenCalled();
  });

  it("respektiert x-forwarded-host hinter dem Reverse Proxy", () => {
    const req = createMockReq("interner-container:3000", "/");
    req.headers["x-forwarded-host"] = "control-motion.de";
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.setHeader).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
