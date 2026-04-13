import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { RateLimiter, getClientIp } from "./rateLimiter";

describe("RateLimiter", () => {
  let limiter: RateLimiter;

  afterEach(() => {
    if (limiter) limiter.destroy();
  });

  it("allows requests within the limit", () => {
    limiter = new RateLimiter({ maxRequests: 3, windowMs: 60000 });

    expect(limiter.check("192.168.1.1")).toEqual({ allowed: true });
    expect(limiter.check("192.168.1.1")).toEqual({ allowed: true });
    expect(limiter.check("192.168.1.1")).toEqual({ allowed: true });
  });

  it("blocks requests exceeding the limit", () => {
    limiter = new RateLimiter({ maxRequests: 2, windowMs: 60000 });

    expect(limiter.check("10.0.0.1")).toEqual({ allowed: true });
    expect(limiter.check("10.0.0.1")).toEqual({ allowed: true });

    const result = limiter.check("10.0.0.1");
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.retryAfterMs).toBeGreaterThan(0);
    }
  });

  it("tracks different IPs independently", () => {
    limiter = new RateLimiter({ maxRequests: 1, windowMs: 60000 });

    expect(limiter.check("10.0.0.1")).toEqual({ allowed: true });
    expect(limiter.check("10.0.0.2")).toEqual({ allowed: true });

    // First IP is now blocked
    const result1 = limiter.check("10.0.0.1");
    expect(result1.allowed).toBe(false);

    // Second IP is also blocked
    const result2 = limiter.check("10.0.0.2");
    expect(result2.allowed).toBe(false);
  });

  it("allows requests again after the window expires", () => {
    vi.useFakeTimers();
    limiter = new RateLimiter({ maxRequests: 1, windowMs: 5000 });

    expect(limiter.check("10.0.0.1")).toEqual({ allowed: true });
    expect(limiter.check("10.0.0.1").allowed).toBe(false);

    // Advance time past the window
    vi.advanceTimersByTime(5001);

    expect(limiter.check("10.0.0.1")).toEqual({ allowed: true });

    vi.useRealTimers();
  });

  it("returns retryAfterMs of at least 1000ms", () => {
    limiter = new RateLimiter({ maxRequests: 1, windowMs: 60000 });

    limiter.check("10.0.0.1");
    const result = limiter.check("10.0.0.1");

    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.retryAfterMs).toBeGreaterThanOrEqual(1000);
    }
  });

  it("reports correct size", () => {
    limiter = new RateLimiter({ maxRequests: 5, windowMs: 60000 });

    expect(limiter.size).toBe(0);
    limiter.check("10.0.0.1");
    expect(limiter.size).toBe(1);
    limiter.check("10.0.0.2");
    expect(limiter.size).toBe(2);
  });
});

describe("getClientIp", () => {
  it("extracts IP from X-Forwarded-For header", () => {
    const req = {
      headers: { "x-forwarded-for": "203.0.113.50, 70.41.3.18" },
      ip: "127.0.0.1",
    };
    expect(getClientIp(req)).toBe("203.0.113.50");
  });

  it("extracts IP from single X-Forwarded-For value", () => {
    const req = {
      headers: { "x-forwarded-for": "203.0.113.50" },
    };
    expect(getClientIp(req)).toBe("203.0.113.50");
  });

  it("falls back to req.ip", () => {
    const req = {
      headers: {},
      ip: "192.168.1.100",
    };
    expect(getClientIp(req)).toBe("192.168.1.100");
  });

  it("falls back to socket.remoteAddress", () => {
    const req = {
      headers: {},
      socket: { remoteAddress: "10.0.0.5" },
    };
    expect(getClientIp(req)).toBe("10.0.0.5");
  });

  it("returns 'unknown' when no IP is available", () => {
    const req = { headers: {} };
    expect(getClientIp(req)).toBe("unknown");
  });

  it("handles X-Forwarded-For as array", () => {
    const req = {
      headers: { "x-forwarded-for": ["203.0.113.50", "70.41.3.18"] },
    };
    expect(getClientIp(req)).toBe("203.0.113.50");
  });
});
