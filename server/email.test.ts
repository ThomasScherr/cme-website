import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock nodemailer before importing the module
vi.mock("nodemailer", () => {
  const sendMailMock = vi.fn().mockResolvedValue({ messageId: "test-123" });
  const verifyMock = vi.fn().mockResolvedValue(true);
  return {
    default: {
      createTransport: vi.fn().mockReturnValue({
        sendMail: sendMailMock,
        verify: verifyMock,
      }),
    },
  };
});

// Mock ENV
vi.mock("./_core/env", () => ({
  ENV: {
    smtpHost: "smtp.test.de",
    smtpPort: 587,
    smtpUser: "test@test.de",
    smtpPass: "testpass",
    smtpFrom: "\"CME Kontaktformular\" <noreply@controlmotion.de>",
    contactEmail: "t.scherr@control-motion.de,sales@control-motion.de",
    isProduction: false,
  },
}));

describe("Email Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should import email module without errors", async () => {
    const emailModule = await import("./email");
    expect(emailModule).toBeDefined();
    expect(emailModule.sendContactEmail).toBeInstanceOf(Function);
    expect(emailModule.sendNdaEmail).toBeInstanceOf(Function);
    expect(emailModule.verifySmtp).toBeInstanceOf(Function);
  });

  it("should verify SMTP connection", async () => {
    const { verifySmtp } = await import("./email");
    const result = await verifySmtp();
    expect(result).toBe(true);
  });

  it("should send contact email with salutation 'Herr' and title", async () => {
    const { sendContactEmail } = await import("./email");
    const result = await sendContactEmail({
      salutation: "Herr",
      title: "Dr.",
      name: "Max Mustermann",
      email: "max@example.com",
      company: "Musterfirma GmbH",
      phone: "+49 123 456789",
      message: "Ich interessiere mich für Ihre Leistungselektronik-Entwicklung.",
      topic: "Hardware & Software",
      source: "homepage",
    });
    expect(result).toBe(true);

    const nodemailer = await import("nodemailer");
    const transport = nodemailer.default.createTransport();
    expect(transport.sendMail).toHaveBeenCalledTimes(1);

    const callArgs = (transport.sendMail as any).mock.calls[0][0];
    expect(callArgs.from).toBe("\"CME Kontaktformular\" <noreply@controlmotion.de>");
    expect(callArgs.to).toBe("t.scherr@control-motion.de,sales@control-motion.de");
    expect(callArgs.replyTo).toBe("max@example.com");
    expect(callArgs.subject).toContain("Kontaktanfrage");
    expect(callArgs.subject).toContain("Hardware & Software");
    expect(callArgs.subject).toContain("Herr");
    expect(callArgs.subject).toContain("Max Mustermann");
    expect(callArgs.html).toContain("Max Mustermann");
    expect(callArgs.html).toContain("Musterfirma GmbH");
    expect(callArgs.html).toContain("Leistungselektronik");
  });

  it("should send contact email with salutation 'Frau'", async () => {
    const { sendContactEmail } = await import("./email");
    const result = await sendContactEmail({
      salutation: "Frau",
      name: "Anna Schmidt",
      email: "anna@example.com",
      message: "Anfrage zur Simulation.",
    });
    expect(result).toBe(true);

    const nodemailer = await import("nodemailer");
    const transport = nodemailer.default.createTransport();
    const callArgs = (transport.sendMail as any).mock.calls[0][0];
    expect(callArgs.subject).toContain("Frau");
    expect(callArgs.subject).toContain("Anna Schmidt");
  });

  it("should send contact email with minimal fields (no salutation)", async () => {
    const { sendContactEmail } = await import("./email");
    const result = await sendContactEmail({
      name: "Erika Muster",
      email: "erika@example.com",
      message: "Kurze Anfrage.",
    });
    expect(result).toBe(true);

    const nodemailer = await import("nodemailer");
    const transport = nodemailer.default.createTransport();
    const callArgs = (transport.sendMail as any).mock.calls[0][0];
    expect(callArgs.subject).toContain("Erika Muster");
    // No salutation prefix when not provided
    expect(callArgs.subject).not.toContain("Herr");
    expect(callArgs.subject).not.toContain("Frau");
  });

  it("should omit salutation when 'Keine Angabe' is selected", async () => {
    const { sendContactEmail } = await import("./email");
    const result = await sendContactEmail({
      salutation: "Keine Angabe",
      name: "Alex Neutral",
      email: "alex@example.com",
      message: "Test ohne Anrede.",
    });
    expect(result).toBe(true);

    const nodemailer = await import("nodemailer");
    const transport = nodemailer.default.createTransport();
    const callArgs = (transport.sendMail as any).mock.calls[0][0];
    // 'Keine Angabe' should be omitted from the display name
    expect(callArgs.subject).not.toContain("Keine Angabe");
    expect(callArgs.subject).toContain("Alex Neutral");
  });

  it("should send NDA email with salutation 'Frau'", async () => {
    const { sendNdaEmail } = await import("./email");
    const result = await sendNdaEmail({
      salutation: "Frau",
      firstName: "Anna",
      lastName: "Schmidt",
      company: "TechCorp AG",
      email: "anna.schmidt@techcorp.de",
      topic: "Antriebselektronik",
    });
    expect(result).toBe(true);

    const nodemailer = await import("nodemailer");
    const transport = nodemailer.default.createTransport();
    expect(transport.sendMail).toHaveBeenCalledTimes(1);

    const callArgs = (transport.sendMail as any).mock.calls[0][0];
    expect(callArgs.subject).toContain("NDA-Anforderung");
    expect(callArgs.subject).toContain("TechCorp AG");
    expect(callArgs.subject).toContain("Frau Anna Schmidt");
    expect(callArgs.html).toContain("NDA");
    expect(callArgs.html).toContain("anna.schmidt@techcorp.de");
    expect(callArgs.html).toContain("Aktion erforderlich");
  });

  it("should send NDA email with salutation 'Herr'", async () => {
    const { sendNdaEmail } = await import("./email");
    const result = await sendNdaEmail({
      salutation: "Herr",
      firstName: "Max",
      lastName: "Müller",
      company: "Müller GmbH",
      email: "max@mueller.de",
    });
    expect(result).toBe(true);

    const nodemailer = await import("nodemailer");
    const transport = nodemailer.default.createTransport();
    const callArgs = (transport.sendMail as any).mock.calls[0][0];
    expect(callArgs.subject).toContain("Herr Max Müller");
    expect(callArgs.subject).toContain("Müller GmbH");
  });

  it("should omit salutation in NDA email when 'Keine Angabe'", async () => {
    const { sendNdaEmail } = await import("./email");
    const result = await sendNdaEmail({
      salutation: "Keine Angabe",
      firstName: "Alex",
      lastName: "Test",
      company: "Test AG",
      email: "alex@test.de",
    });
    expect(result).toBe(true);

    const nodemailer = await import("nodemailer");
    const transport = nodemailer.default.createTransport();
    const callArgs = (transport.sendMail as any).mock.calls[0][0];
    expect(callArgs.subject).toContain("Alex Test");
    expect(callArgs.subject).not.toContain("Keine Angabe");
  });

  it("should include topic badge in contact email when topic is provided", async () => {
    const { sendContactEmail } = await import("./email");
    await sendContactEmail({
      name: "Test User",
      email: "test@example.com",
      message: "Test",
      topic: "Mechatronik",
    });

    const nodemailer = await import("nodemailer");
    const transport = nodemailer.default.createTransport();
    const callArgs = (transport.sendMail as any).mock.calls[0][0];
    expect(callArgs.html).toContain("Mechatronik");
  });

  it("should include topic badge in NDA email when topic is provided", async () => {
    const { sendNdaEmail } = await import("./email");
    await sendNdaEmail({
      salutation: "Herr",
      firstName: "Test",
      lastName: "User",
      company: "Test GmbH",
      email: "test@test.de",
      topic: "Leistungselektronik",
    });

    const nodemailer = await import("nodemailer");
    const transport = nodemailer.default.createTransport();
    const callArgs = (transport.sendMail as any).mock.calls[0][0];
    expect(callArgs.html).toContain("Leistungselektronik");
  });
});
