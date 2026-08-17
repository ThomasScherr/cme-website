import { describe, it, expect, vi, beforeEach } from "vitest";

// Mailer mocken – wir prüfen, WAS versendet würde, nicht den API-Aufruf selbst
const sendMailMock = vi.fn().mockResolvedValue(undefined);
vi.mock("./mailer", () => ({
  sendMail: (...args: unknown[]) => sendMailMock(...args),
  verifyMailer: vi.fn().mockResolvedValue(true),
}));

vi.mock("./_core/env", () => ({
  ENV: {
    brevoApiKey: "test-key",
    mailFrom: "noreply@control-motion.de",
    mailFromName: "CME Kontaktformular",
    contactEmail: "t.scherr@control-motion.de,sales@control-motion.de",
    isProduction: false,
  },
}));

describe("Email Service", () => {
  beforeEach(() => {
    sendMailMock.mockClear();
  });

  it("lädt das Modul fehlerfrei", async () => {
    const mod = await import("./email");
    expect(mod.sendContactEmail).toBeInstanceOf(Function);
    expect(mod.sendNdaEmail).toBeInstanceOf(Function);
    expect(mod.verifySmtp).toBeInstanceOf(Function);
  });

  it("meldet Versandbereitschaft", async () => {
    const { verifySmtp } = await import("./email");
    await expect(verifySmtp()).resolves.toBe(true);
  });

  it("verschickt eine Kontaktanfrage an alle konfigurierten Empfänger", async () => {
    const { sendContactEmail } = await import("./email");
    const ok = await sendContactEmail({
      salutation: "Herr",
      title: "Dr.",
      name: "Max Mustermann",
      email: "max@example.com",
      company: "Muster GmbH",
      message: "Testanfrage",
      topic: "Leistungselektronik",
    });

    expect(ok).toBe(true);
    expect(sendMailMock).toHaveBeenCalledTimes(1);

    const arg = sendMailMock.mock.calls[0][0];
    expect(arg.to).toBe("t.scherr@control-motion.de,sales@control-motion.de");
    expect(arg.replyTo).toBe("max@example.com");
    expect(arg.subject).toContain("Leistungselektronik");
    expect(arg.subject).toContain("Herr Dr. Max Mustermann");
    expect(arg.html).toContain("max@example.com");
    expect(arg.html).toContain("Muster GmbH");
    expect(arg.html).toContain("Testanfrage");
  });

  it("lässt die Anrede weg, wenn 'Keine Angabe' gewählt wurde", async () => {
    const { sendContactEmail } = await import("./email");
    await sendContactEmail({
      salutation: "Keine Angabe",
      name: "Erika Musterfrau",
      email: "erika@example.com",
      message: "Ohne Anrede",
    });

    const arg = sendMailMock.mock.calls[0][0];
    expect(arg.subject).toContain("Erika Musterfrau");
    expect(arg.subject).not.toContain("Keine Angabe");
  });

  it("verschickt eine NDA-Anforderung mit Firma im Betreff", async () => {
    const { sendNdaEmail } = await import("./email");
    const ok = await sendNdaEmail({
      salutation: "Frau",
      firstName: "Erika",
      lastName: "Musterfrau",
      company: "Beispiel AG",
      email: "erika@beispiel.de",
    });

    expect(ok).toBe(true);
    const arg = sendMailMock.mock.calls[0][0];
    expect(arg.subject).toContain("NDA-Anforderung");
    expect(arg.subject).toContain("Beispiel AG");
    expect(arg.replyTo).toBe("erika@beispiel.de");
  });

  it("meldet false, wenn der Versand scheitert", async () => {
    sendMailMock.mockRejectedValueOnce(new Error("Brevo-API antwortete mit 401"));
    const { sendContactEmail } = await import("./email");
    const ok = await sendContactEmail({
      name: "Test",
      email: "t@example.com",
      message: "x",
    });
    expect(ok).toBe(false);
  });
});
