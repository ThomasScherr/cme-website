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
    smtpFrom: "noreply@controlmotion.de",
    contactEmail: "vertrieb@controlmotion.de",
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

  it("should send contact email with all fields", async () => {
    const { sendContactEmail } = await import("./email");
    const result = await sendContactEmail({
      salutation: "mr",
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
    expect(callArgs.from).toBe("noreply@controlmotion.de");
    expect(callArgs.to).toBe("vertrieb@controlmotion.de");
    expect(callArgs.replyTo).toBe("max@example.com");
    expect(callArgs.subject).toContain("Kontaktanfrage");
    expect(callArgs.subject).toContain("Hardware & Software");
    expect(callArgs.subject).toContain("Herr");
    expect(callArgs.subject).toContain("Max Mustermann");
    expect(callArgs.html).toContain("Max Mustermann");
    expect(callArgs.html).toContain("Musterfirma GmbH");
    expect(callArgs.html).toContain("Leistungselektronik");
  });

  it("should send contact email with minimal fields", async () => {
    const { sendContactEmail } = await import("./email");
    const result = await sendContactEmail({
      name: "Erika Muster",
      email: "erika@example.com",
      message: "Kurze Anfrage.",
    });
    expect(result).toBe(true);
  });

  it("should send NDA email with all fields", async () => {
    const { sendNdaEmail } = await import("./email");
    const result = await sendNdaEmail({
      salutation: "ms",
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

  it("should handle salutation 'none' gracefully", async () => {
    const { sendContactEmail } = await import("./email");
    const result = await sendContactEmail({
      salutation: "none",
      name: "Alex Neutral",
      email: "alex@example.com",
      message: "Test ohne Anrede.",
    });
    expect(result).toBe(true);
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
});
