/**
 * Standalone authentication module for Mittwald deployment.
 * Provides password-based admin login without Manus OAuth dependency.
 * Uses bcryptjs for password hashing and jose for JWT session tokens.
 */
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { parse as parseCookieHeader } from "cookie";
import type { Express, Request, Response } from "express";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import * as db from "./db";
import { ENV } from "./_core/env";
import { loginRateLimiter, getClientIp } from "./rateLimiter";

// Environment variable for admin password (bcrypt hash)
// Set ADMIN_PASSWORD_HASH in env, or ADMIN_PASSWORD for auto-hashing on first use
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH ?? "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

/**
 * Zwischengespeicherter Hash von ADMIN_PASSWORD.
 *
 * Frueher wurde bcrypt.hash(ADMIN_PASSWORD, 12) bei JEDER Login-Anfrage
 * ausgefuehrt - auch bei falschem Passwort und auch, wenn gar kein Benutzer
 * existiert. Kostenfaktor 12 bedeutet rund 300 ms Rechenzeit pro Aufruf, und
 * zwar im selben einspurigen Node-Prozess, der auch alle Seiten ausliefert.
 * Damit liess sich die Website ohne jede Anmeldung lahmlegen.
 *
 * Jetzt wird genau einmal gehasht und das Ergebnis behalten.
 */
let cachedPasswordHash: string | null = null;

async function resolvePasswordHash(): Promise<string> {
  if (ADMIN_PASSWORD_HASH) return ADMIN_PASSWORD_HASH;
  if (!ADMIN_PASSWORD) return "";

  if (cachedPasswordHash === null) {
    cachedPasswordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    console.log(
      "[StandaloneAuth] Hash aus ADMIN_PASSWORD einmalig erzeugt. " +
        "Fuer den Produktivbetrieb besser ADMIN_PASSWORD_HASH setzen."
    );
  }

  return cachedPasswordHash;
}

function getSessionSecret() {
  return new TextEncoder().encode(ENV.cookieSecret);
}

async function createSessionToken(openId: string, name: string): Promise<string> {
  const secretKey = getSessionSecret();
  const expiresInMs = ONE_YEAR_MS;
  const expirationSeconds = Math.floor((Date.now() + expiresInMs) / 1000);

  return new SignJWT({
    openId,
    appId: ENV.appId || "cme-standalone",
    name,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(expirationSeconds)
    .sign(secretKey);
}

export async function verifySessionStandalone(
  cookieValue: string | undefined | null
): Promise<{ openId: string; appId: string; name: string } | null> {
  if (!cookieValue) return null;

  try {
    const secretKey = getSessionSecret();
    const { payload } = await jwtVerify(cookieValue, secretKey, {
      algorithms: ["HS256"],
    });
    const { openId, appId, name } = payload as Record<string, unknown>;

    if (
      typeof openId !== "string" || !openId ||
      typeof appId !== "string" || !appId ||
      typeof name !== "string" || !name
    ) {
      return null;
    }

    return { openId, appId, name };
  } catch {
    return null;
  }
}

export async function authenticateRequestStandalone(req: Request) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;

  const cookies = parseCookieHeader(cookieHeader);
  const sessionCookie = cookies[COOKIE_NAME];
  const session = await verifySessionStandalone(sessionCookie);

  if (!session) return null;

  const user = await db.getUserByOpenId(session.openId);
  return user;
}

export function registerStandaloneAuthRoutes(app: Express) {
  // POST /api/auth/login - Password-based admin login
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      // Rate-Limit ZUERST - vor dem Auslesen des Bodys und vor jedem
      // bcrypt-Aufruf. Sonst schuetzt es zwar gegen Brute Force, aber nicht
      // gegen die Ueberlastung durch den teuren Passwortvergleich.
      const clientIp = getClientIp(req);
      const limit = loginRateLimiter.check(clientIp);

      if (!limit.allowed) {
        const retryAfterSeconds = Math.ceil(limit.retryAfterMs / 1000);
        console.warn(
          `[StandaloneAuth] Login-Versuch von ${clientIp} blockiert. ` +
            `Naechster Versuch in ${retryAfterSeconds}s moeglich.`
        );
        res.setHeader("Retry-After", String(retryAfterSeconds));
        res.status(429).json({
          error:
            "Zu viele Anmeldeversuche. Bitte versuchen Sie es spaeter erneut.",
          retryAfterSeconds,
        });
        return;
      }

      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "E-Mail und Passwort sind erforderlich." });
        return;
      }

      const hashToCheck = await resolvePasswordHash();

      if (!hashToCheck) {
        console.error("[StandaloneAuth] No ADMIN_PASSWORD_HASH or ADMIN_PASSWORD configured!");
        res.status(500).json({ error: "Server-Authentifizierung nicht konfiguriert." });
        return;
      }

      // Verify password
      const passwordValid = await bcrypt.compare(password, hashToCheck);
      if (!passwordValid) {
        res.status(401).json({ error: "Ungültige Anmeldedaten." });
        return;
      }

      // Find user by email in database
      let user = await db.getUserByEmail(email);

      if (!user) {
        // If no user with this email, check if it's the owner
        user = await db.getUserByOpenId(ENV.ownerOpenId);
      }

      if (!user) {
        res.status(401).json({ error: "Benutzer nicht gefunden." });
        return;
      }

      if (user.role !== "admin") {
        res.status(403).json({ error: "Kein Admin-Zugang." });
        return;
      }

      // Create session token
      const sessionToken = await createSessionToken(user.openId, user.name || "Admin");

      // Set cookie
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("[StandaloneAuth] Login failed:", error);
      res.status(500).json({ error: "Login fehlgeschlagen." });
    }
  });

  // GET /api/auth/me - Check current session (standalone)
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    const user = await authenticateRequestStandalone(req);
    if (!user) {
      res.status(401).json({ error: "Nicht angemeldet." });
      return;
    }
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });

  // POST /api/auth/logout - Clear session
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    const cookieOptions = getSessionCookieOptions(req);
    res.clearCookie(COOKIE_NAME, cookieOptions);
    res.json({ success: true });
  });
}
