import { describe, it, expect, vi, beforeEach } from "vitest";
import { legacyRedirectMiddleware } from "./legacyRedirects";
import type { Request, Response, NextFunction } from "express";

function createMockReq(path: string, method = "GET"): Partial<Request> {
  return { method, path };
}

function createMockRes() {
  return {
    redirect: vi.fn(),
  } as unknown as Response;
}

describe("legacyRedirectMiddleware", () => {
  let middleware: ReturnType<typeof legacyRedirectMiddleware>;
  let next: NextFunction;

  beforeEach(() => {
    middleware = legacyRedirectMiddleware();
    next = vi.fn();
  });

  // ── Deutsche alte URLs ──

  it("redirects /elektronikentwicklung → /entwicklung", () => {
    const req = createMockReq("/elektronikentwicklung");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "/entwicklung");
    expect(next).not.toHaveBeenCalled();
  });

  it("redirects /elektronikentwicklung/hardware-software → /entwicklung/hardware-software", () => {
    const req = createMockReq("/elektronikentwicklung/hardware-software");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "/entwicklung/hardware-software");
  });

  it("redirects /elektronikentwicklung/simulation → /entwicklung/simulation", () => {
    const req = createMockReq("/elektronikentwicklung/simulation");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "/entwicklung/simulation");
  });

  it("redirects /smd-und-tht-bestueckung-von-leiterplatten-leiterkarten → /fertigung/leiterplatten", () => {
    const req = createMockReq("/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "/fertigung/leiterplatten");
  });

  it("redirects /smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/qs-qm → /fertigung/qualitaet", () => {
    const req = createMockReq("/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/qs-qm");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "/fertigung/qualitaet");
  });

  it("redirects /jobs → /karriere", () => {
    const req = createMockReq("/jobs");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "/karriere");
  });

  it("redirects /datenschutzerklaerung → /datenschutz", () => {
    const req = createMockReq("/datenschutzerklaerung");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "/datenschutz");
  });

  // ── Englische alte URLs ──

  it("redirects /en/electronics-manufacturing → /en/manufacturing", () => {
    const req = createMockReq("/en/electronics-manufacturing");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "/en/manufacturing");
  });

  it("redirects /en/electronics-development → /en/development", () => {
    const req = createMockReq("/en/electronics-development");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "/en/development");
  });

  it("redirects /en/jobs → /en/careers", () => {
    const req = createMockReq("/en/jobs");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "/en/careers");
  });

  // ── Trailing slash handling ──

  it("redirects paths with trailing slash", () => {
    const req = createMockReq("/elektronikentwicklung/");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "/entwicklung");
  });

  it("redirects /en/electronics-manufacturing/ with trailing slash", () => {
    const req = createMockReq("/en/electronics-manufacturing/");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).toHaveBeenCalledWith(301, "/en/manufacturing");
  });

  // ── Passthrough (no redirect) ──

  it("does not redirect current routes like /entwicklung", () => {
    const req = createMockReq("/entwicklung");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("does not redirect /kontakt (existing route)", () => {
    const req = createMockReq("/kontakt");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("does not redirect API routes", () => {
    const req = createMockReq("/api/trpc/something");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("does not redirect static assets", () => {
    const req = createMockReq("/assets/index-abc123.js");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("skips non-GET requests", () => {
    const req = createMockReq("/elektronikentwicklung", "POST");
    const res = createMockRes();
    middleware(req as Request, res, next);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
