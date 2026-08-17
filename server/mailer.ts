/**
 * Mailversand über die Brevo-API (transaktionale E-Mails).
 *
 * Ersetzt den bisherigen SMTP-Versand per nodemailer. Gründe:
 *
 *  - Im Mittwald-Stack waren SMTP_HOST, SMTP_USER und SMTP_PASS gar nicht
 *    gesetzt. Jeder Versuch endete in "SMTP not configured". Kontaktanfragen
 *    landeten zwar in der Datenbank, aber niemand wurde benachrichtigt.
 *  - Die alten Zugangsdaten gehörten zu mail.agenturserver.de und stammen aus
 *    der geleakten Manus-Konfiguration.
 *  - Über die HTTPS-API entfällt der SMTP-Handshake, und in Brevo ist für jede
 *    Nachricht nachvollziehbar, ob sie zugestellt wurde.
 *
 * Absender muss in Brevo als verifizierter Sender hinterlegt sein.
 */

import { ENV } from "./_core/env";

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

export interface MailOptions {
  /** Empfänger, kommasepariert (wie bisher CONTACT_EMAIL). */
  to: string;
  subject: string;
  html: string;
  /** Adresse, an die eine Antwort gehen soll – hier der Anfragende. */
  replyTo?: string;
}

function parseRecipients(raw: string): { email: string }[] {
  return raw
    .split(",")
    .map(a => a.trim())
    .filter(Boolean)
    .map(email => ({ email }));
}

/**
 * Verschickt eine E-Mail. Wirft bei fehlender Konfiguration oder
 * API-Fehler – die Aufrufer fangen das ab und protokollieren.
 */
export async function sendMail(opts: MailOptions): Promise<void> {
  if (!ENV.brevoApiKey) {
    throw new Error("BREVO_API_KEY ist nicht gesetzt – Mailversand nicht konfiguriert.");
  }
  if (!ENV.mailFrom) {
    throw new Error("MAIL_FROM ist nicht gesetzt – kein Absender konfiguriert.");
  }

  const recipients = parseRecipients(opts.to);
  if (recipients.length === 0) {
    throw new Error("Keine Empfänger angegeben.");
  }

  const payload: Record<string, unknown> = {
    sender: { email: ENV.mailFrom, name: ENV.mailFromName || undefined },
    to: recipients,
    subject: opts.subject,
    htmlContent: opts.html,
  };

  if (opts.replyTo) {
    payload.replyTo = { email: opts.replyTo };
  }

  const response = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": ENV.brevoApiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Brevo-API antwortete mit ${response.status} ${response.statusText}${detail ? ` – ${detail.slice(0, 300)}` : ""}`
    );
  }
}

/**
 * Prüft, ob der Mailversand einsatzbereit ist: Schlüssel vorhanden und vom
 * Brevo-Konto akzeptiert. Für Health-Checks gedacht, verschickt nichts.
 */
export async function verifyMailer(): Promise<boolean> {
  if (!ENV.brevoApiKey || !ENV.mailFrom) return false;

  try {
    const response = await fetch("https://api.brevo.com/v3/account", {
      headers: { "api-key": ENV.brevoApiKey, accept: "application/json" },
    });
    return response.ok;
  } catch {
    return false;
  }
}
