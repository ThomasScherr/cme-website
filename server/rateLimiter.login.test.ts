import { describe, it, expect } from "vitest";
import { RateLimiter } from "./rateLimiter";

describe("Login-Rate-Limit", () => {
  it("lässt 5 Versuche zu und blockiert den sechsten", () => {
    const limiter = new RateLimiter({ maxRequests: 5, windowMs: 15 * 60 * 1000 });

    for (let i = 1; i <= 5; i++) {
      expect(limiter.check("203.0.113.7"), `Versuch ${i}`).toEqual({ allowed: true });
    }

    const blocked = limiter.check("203.0.113.7");
    expect(blocked.allowed).toBe(false);
    if (!blocked.allowed) {
      expect(blocked.retryAfterMs).toBeGreaterThan(0);
      expect(blocked.retryAfterMs).toBeLessThanOrEqual(15 * 60 * 1000);
    }

    limiter.destroy();
  });

  it("zählt pro IP getrennt", () => {
    const limiter = new RateLimiter({ maxRequests: 5, windowMs: 15 * 60 * 1000 });

    for (let i = 0; i < 5; i++) limiter.check("198.51.100.1");
    expect(limiter.check("198.51.100.1").allowed).toBe(false);
    expect(limiter.check("198.51.100.2").allowed).toBe(true);

    limiter.destroy();
  });
});
