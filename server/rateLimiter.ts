/**
 * In-Memory Rate Limiter for tRPC endpoints.
 * Uses a sliding window algorithm with IP-based tracking.
 * Automatically cleans up expired entries to prevent memory leaks.
 */

interface RateLimitEntry {
  timestamps: number[];
}

interface RateLimiterConfig {
  /** Maximum number of requests allowed within the window */
  maxRequests: number;
  /** Time window in milliseconds */
  windowMs: number;
  /** Cleanup interval in milliseconds (default: 60000 = 1 minute) */
  cleanupIntervalMs?: number;
}

export class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private config: Required<RateLimiterConfig>;
  private cleanupTimer: ReturnType<typeof setInterval> | null = null;

  constructor(config: RateLimiterConfig) {
    this.config = {
      ...config,
      cleanupIntervalMs: config.cleanupIntervalMs ?? 60_000,
    };

    // Start periodic cleanup to prevent memory leaks
    this.cleanupTimer = setInterval(() => this.cleanup(), this.config.cleanupIntervalMs);
    // Allow the process to exit even if the timer is still running
    if (this.cleanupTimer.unref) {
      this.cleanupTimer.unref();
    }
  }

  /**
   * Check if a request from the given IP is allowed.
   * Returns { allowed: true } or { allowed: false, retryAfterMs }.
   */
  check(ip: string): { allowed: true } | { allowed: false; retryAfterMs: number } {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    let entry = this.store.get(ip);
    if (!entry) {
      entry = { timestamps: [] };
      this.store.set(ip, entry);
    }

    // Remove timestamps outside the current window
    entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

    if (entry.timestamps.length >= this.config.maxRequests) {
      // Calculate when the oldest request in the window expires
      const oldestInWindow = entry.timestamps[0];
      const retryAfterMs = oldestInWindow + this.config.windowMs - now;
      return { allowed: false, retryAfterMs: Math.max(retryAfterMs, 1000) };
    }

    // Allow the request and record the timestamp
    entry.timestamps.push(now);
    return { allowed: true };
  }

  /**
   * Remove expired entries from the store.
   */
  private cleanup(): void {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    const keys = Array.from(this.store.keys());
    for (const ip of keys) {
      const entry = this.store.get(ip);
      if (!entry) continue;
      entry.timestamps = entry.timestamps.filter((t: number) => t > windowStart);
      if (entry.timestamps.length === 0) {
        this.store.delete(ip);
      }
    }
  }

  /**
   * Stop the cleanup timer (for testing/shutdown).
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }

  /**
   * Get the current number of tracked IPs (for monitoring/testing).
   */
  get size(): number {
    return this.store.size;
  }
}

// ── Pre-configured rate limiters for contact form endpoints ──────────

/** Contact form: max 5 submissions per 15 minutes per IP */
export const contactRateLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
});

/** NDA form: max 3 submissions per 15 minutes per IP */
export const ndaRateLimiter = new RateLimiter({
  maxRequests: 3,
  windowMs: 15 * 60 * 1000, // 15 minutes
});

/**
 * Admin-Login: max. 5 Versuche pro 15 Minuten und IP.
 *
 * Schuetzt zwei Dinge auf einmal:
 *  - Brute Force gegen das einzige Admin-Passwort
 *  - Ueberlastung durch bcrypt. Der Passwortvergleich kostet mit Kostenfaktor
 *    12 rund 300 ms Rechenzeit, und Node arbeitet einspurig. Ohne Limit legen
 *    schon wenige Dutzend gleichzeitige Anfragen die gesamte Website lahm,
 *    nicht nur das Login.
 *
 * Deshalb muss die Pruefung VOR dem bcrypt-Vergleich laufen.
 */
export const loginRateLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 15 * 60 * 1000, // 15 Minuten
});

/**
 * Extract client IP from the request object.
 * Handles proxied requests (X-Forwarded-For) and direct connections.
 */
export function getClientIp(req: { headers: Record<string, string | string[] | undefined>; ip?: string; socket?: { remoteAddress?: string } }): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0];
    return ip.trim();
  }
  return req.ip || req.socket?.remoteAddress || 'unknown';
}
