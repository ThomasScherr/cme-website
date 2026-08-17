import { ENV } from "./_core/env";
import { sendMail, verifyMailer } from "./mailer";

// ─── Versandbereitschaft prüfen ────────────────────────────────
/** Name aus Kompatibilitätsgründen beibehalten – prüft jetzt Brevo. */
export async function verifySmtp(): Promise<boolean> {
  return verifyMailer();
}

function htmlWrapper(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 600px; margin: 24px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
    .header { background: #1a1a2e; padding: 24px 32px; }
    .header h1 { color: #ffffff; font-size: 18px; margin: 0; font-weight: 600; }
    .header .subtitle { color: #7ecad0; font-size: 13px; margin-top: 4px; }
    .body { padding: 32px; }
    .body h2 { color: #1a1a2e; font-size: 16px; margin: 0 0 16px 0; font-weight: 600; }
    .field { margin-bottom: 16px; }
    .field .label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .field .value { font-size: 14px; color: #1f2937; line-height: 1.5; }
    .message-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin-top: 8px; }
    .message-box p { margin: 0; font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap; }
    .footer { padding: 16px 32px; background: #f9fafb; border-top: 1px solid #e5e7eb; }
    .footer p { margin: 0; font-size: 12px; color: #9ca3af; }
    .badge { display: inline-block; background: #7ecad0; color: #1a1a2e; font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
    .topic-badge { display: inline-block; background: #e0f2f1; color: #00695c; font-size: 12px; font-weight: 500; padding: 4px 12px; border-radius: 6px; margin-bottom: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>CME Control Motion Electronics</h1>
      <div class="subtitle">${title}</div>
    </div>
    <div class="body">
      ${body}
    </div>
    <div class="footer">
      <p>Diese E-Mail wurde automatisch über das Kontaktformular auf controlmotion.de generiert.</p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Contact form email ──────────────────────────────────────
interface ContactEmailData {
  salutation?: string;
  title?: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  topic?: string;
  source?: string;
}

export async function sendContactEmail(data: ContactEmailData): Promise<boolean> {
  try {
    const recipients = ENV.contactEmail;
    if (!recipients) {
      console.error("[Mail] No CONTACT_EMAIL configured");
      return false;
    }

    // Frontend sends 'Herr', 'Frau', 'Keine Angabe' – pass through directly
    const salutationStr = (data.salutation && data.salutation !== "Keine Angabe")
      ? data.salutation
      : "";
    const titleStr = data.title ? `${data.title} ` : "";
    // join(" ") plus das bereits an titleStr haengende Leerzeichen ergaben
    // frueher "Herr Dr.  Max Mustermann" mit doppeltem Abstand.
    const fullName = [salutationStr, titleStr, data.name]
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    const topicHtml = data.topic
      ? `<div class="topic-badge">Thema: ${data.topic}</div>`
      : "";

    const sourceHtml = data.source
      ? `<div class="field"><div class="label">Quelle / Seite</div><div class="value">${data.source}</div></div>`
      : "";

    const body = `
      <h2>Neue Kontaktanfrage</h2>
      ${topicHtml}
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${fullName}</div>
      </div>
      <div class="field">
        <div class="label">E-Mail</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      ${data.company ? `<div class="field"><div class="label">Unternehmen</div><div class="value">${data.company}</div></div>` : ""}
      ${data.phone ? `<div class="field"><div class="label">Telefon</div><div class="value">${data.phone}</div></div>` : ""}
      ${sourceHtml}
      <div class="field">
        <div class="label">Nachricht</div>
        <div class="message-box"><p>${data.message}</p></div>
      </div>
    `;

    const subjectTopic = data.topic ? ` – ${data.topic}` : "";
    await sendMail({
      to: recipients,
      replyTo: data.email,
      subject: `Neue Kontaktanfrage${subjectTopic} | ${fullName}`,
      html: htmlWrapper("Neue Kontaktanfrage", body),
    });

    console.log(`[Mail] Contact email sent for ${data.email}`);
    return true;
  } catch (err) {
    console.error("[Mail] Failed to send contact email:", err);
    return false;
  }
}

// ─── NDA request email ───────────────────────────────────────
interface NdaEmailData {
  salutation: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  topic?: string;
}

export async function sendNdaEmail(data: NdaEmailData): Promise<boolean> {
  try {
    const recipients = ENV.contactEmail;
    if (!recipients) {
      console.error("[Mail] No CONTACT_EMAIL configured");
      return false;
    }

    // Frontend sends 'Herr', 'Frau', 'Keine Angabe' – pass through directly
    const salutationStr = (data.salutation && data.salutation !== "Keine Angabe")
      ? data.salutation
      : "";
    const fullName = [salutationStr, data.firstName, data.lastName].filter(Boolean).join(" ").trim();

    const topicHtml = data.topic
      ? `<div class="topic-badge">Kontext: ${data.topic}</div>`
      : "";

    const body = `
      <h2>Neue NDA-Anforderung <span class="badge">NDA</span></h2>
      ${topicHtml}
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${fullName}</div>
      </div>
      <div class="field">
        <div class="label">Unternehmen</div>
        <div class="value">${data.company}</div>
      </div>
      <div class="field">
        <div class="label">Geschäftliche E-Mail</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div style="margin-top: 24px; padding: 16px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px;">
        <p style="margin: 0; font-size: 13px; color: #856404;">
          <strong>Aktion erforderlich:</strong> Bitte senden Sie die NDA-Vorlage an ${data.email}.
        </p>
      </div>
    `;

    await sendMail({
      to: recipients,
      replyTo: data.email,
      subject: `NDA-Anforderung | ${data.company} – ${fullName}`,
      html: htmlWrapper("NDA-Anforderung", body),
    });

    console.log(`[Mail] NDA email sent for ${data.email}`);
    return true;
  } catch (err) {
    console.error("[Mail] Failed to send NDA email:", err);
    return false;
  }
}
