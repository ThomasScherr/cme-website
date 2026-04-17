import { describe, it, expect, vi, beforeEach } from "vitest";
import { wwwRedirectMiddleware } from "./wwwRedirectMiddleware";

function createMockReq(host: string, path: string = "/", originalUrl?: string) {
  return {
    headers: { host },
    protocol: "https",
    path,
    originalUrl: originalUrl || path,
    method: "GET",
  } as any;
}

function createMockRes() {
  const res: any = {};
  res.redirect = vi.fn();
  return res;
}

describe("wwwRedirectMiddleware", () => {
  const middleware = wwwRedirectMiddleware();
  let next: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    next = vi.fn();
  });

  // ── Should redirect non-canonical hosts to control-motion.de ──

  it("redirects www.control-motion.de to control-motion.de with 301", () => {
    const req = createMockReq("www.control-motion.de", "/");
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "https://control-motion.de/");
    expect(next).not.toHaveBeenCalled();
  });

  it("redirects www.control-motion.de/maerkte to control-motion.de/maerkte", () => {
    const req = createMockReq("www.control-motion.de", "/maerkte", "/maerkte");
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "https://control-motion.de/maerkte");
    expect(next).not.toHaveBeenCalled();
  });

  it("redirects control-motion.com to control-motion.de", () => {
    const req = createMockReq("control-motion.com", "/kontakt", "/kontakt");
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "https://control-motion.de/kontakt");
    expect(next).not.toHaveBeenCalled();
  });

  it("redirects www.control-motion.com to control-motion.de", () => {
    const req = createMockReq("www.control-motion.com", "/fertigung", "/fertigung");
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "https://control-motion.de/fertigung");
    expect(next).not.toHaveBeenCalled();
  });

  it("redirects controlmotion.de to control-motion.de", () => {
    const req = createMockReq("controlmotion.de", "/", "/");
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "https://control-motion.de/");
    expect(next).not.toHaveBeenCalled();
  });

  it("redirects www.controlmotion.de to control-motion.de", () => {
    const req = createMockReq("www.controlmotion.de", "/insights", "/insights");
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "https://control-motion.de/insights");
    expect(next).not.toHaveBeenCalled();
  });

  it("preserves query strings in redirect", () => {
    const req = createMockReq("www.control-motion.de", "/kontakt", "/kontakt?ref=google");
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "https://control-motion.de/kontakt?ref=google");
    expect(next).not.toHaveBeenCalled();
  });

  it("redirects deep paths correctly", () => {
    const req = createMockReq("www.control-motion.de", "/entwicklung/hardware-software", "/entwicklung/hardware-software");
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "https://control-motion.de/entwicklung/hardware-software");
    expect(next).not.toHaveBeenCalled();
  });

  // ── Should NOT redirect (pass through) ──

  it("does not redirect control-motion.de (canonical host)", () => {
    const req = createMockReq("control-motion.de", "/");
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("does not redirect localhost", () => {
    const req = createMockReq("localhost", "/");
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("does not redirect localhost:3000", () => {
    const req = createMockReq("localhost:3000", "/");
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("does not redirect 127.0.0.1", () => {
    const req = createMockReq("127.0.0.1", "/");
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("does not redirect dev environment URLs", () => {
    const req = createMockReq("3000-abc123.us2.dev.computer", "/");
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("does not redirect staging URLs", () => {
    const req = createMockReq("cmecontrols-9wchlxyd.staging.space", "/");
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("handles missing host header gracefully", () => {
    const req = { headers: {}, protocol: "https", path: "/", originalUrl: "/", method: "GET" } as any;
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("handles host with port number", () => {
    const req = createMockReq("www.control-motion.de:443", "/datenschutz", "/datenschutz");
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "https://control-motion.de/datenschutz");
    expect(next).not.toHaveBeenCalled();
  });

  it("is case-insensitive for host matching", () => {
    const req = createMockReq("WWW.Control-Motion.DE", "/", "/");
    const res = createMockRes();
    middleware(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "https://control-motion.de/");
    expect(next).not.toHaveBeenCalled();
  });
});
