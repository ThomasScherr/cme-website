import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

/**
 * Tests for the NDA request and contact submission endpoints.
 * We mock the database layer so tests run without a real DB connection.
 */

// Mock the db module
vi.mock("./db", () => ({
  createContactSubmission: vi.fn().mockResolvedValue({ id: 1 }),
  getAllContactSubmissions: vi.fn().mockResolvedValue([]),
  markContactAsRead: vi.fn().mockResolvedValue(undefined),
  createNdaRequest: vi.fn().mockResolvedValue({ id: 1 }),
  getAllNdaRequests: vi.fn().mockResolvedValue([]),
  markNdaWebhookSent: vi.fn().mockResolvedValue(undefined),
  markNdaProcessed: vi.fn().mockResolvedValue(undefined),
  getAllCategories: vi.fn().mockResolvedValue([]),
  getCategoryBySlug: vi.fn().mockResolvedValue(null),
  createCategory: vi.fn().mockResolvedValue({ id: 1 }),
  updateCategory: vi.fn().mockResolvedValue(undefined),
  deleteCategory: vi.fn().mockResolvedValue(undefined),
  getPublishedArticles: vi.fn().mockResolvedValue([]),
  getAllArticles: vi.fn().mockResolvedValue([]),
  getArticleBySlug: vi.fn().mockResolvedValue(null),
  getArticleById: vi.fn().mockResolvedValue(null),
  createArticle: vi.fn().mockResolvedValue({ id: 1 }),
  updateArticle: vi.fn().mockResolvedValue(undefined),
  deleteArticle: vi.fn().mockResolvedValue(undefined),
  getSiteStyles: vi.fn().mockResolvedValue(null),
  upsertSiteStyles: vi.fn().mockResolvedValue(undefined),
  getAllStylePresets: vi.fn().mockResolvedValue([]),
  createStylePreset: vi.fn().mockResolvedValue({ id: 1 }),
  deleteStylePreset: vi.fn().mockResolvedValue(undefined),
  getAllContent: vi.fn().mockResolvedValue([]),
  getContentByPage: vi.fn().mockResolvedValue([]),
  getContentByKeys: vi.fn().mockResolvedValue([]),
  upsertContent: vi.fn().mockResolvedValue(undefined),
  bulkUpsertContent: vi.fn().mockResolvedValue(undefined),
  deleteContent: vi.fn().mockResolvedValue(undefined),
  getAllMedia: vi.fn().mockResolvedValue([]),
  getMediaByType: vi.fn().mockResolvedValue([]),
  createMediaItem: vi.fn().mockResolvedValue({ id: 1 }),
  deleteMediaItem: vi.fn().mockResolvedValue(undefined),
  searchMedia: vi.fn().mockResolvedValue([]),
}));

// Mock notification
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
      cookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  it("accepts submission with salutation and title fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      salutation: "Herr",
      title: "Dr.",
      name: "Max Mustermann",
      company: "Test GmbH",
      email: "max@test.de",
      phone: "+49 123 456",
      message: "Testanfrage",
      source: "homepage",
      privacyConsent: true,
    });

    expect(result).toEqual({ success: true, id: 1 });
  });

  it("accepts submission without optional salutation/title", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Jane Doe",
      email: "jane@test.com",
      message: "Test inquiry",
      privacyConsent: true,
    });

    expect(result).toEqual({ success: true, id: 1 });
  });

  it("rejects submission with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Test",
        email: "not-an-email",
        message: "Test",
        privacyConsent: true,
      })
    ).rejects.toThrow();
  });

  it("rejects submission without privacyConsent", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Test",
        email: "test@test.de",
        message: "Test",
      } as any)
    ).rejects.toThrow();
  });

  it("rejects submission with privacyConsent set to false", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Test",
        email: "test@test.de",
        message: "Test",
        privacyConsent: false,
      } as any)
    ).rejects.toThrow();
  });

  it("silently rejects bot submission when honeypot is filled", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Bot User",
      email: "bot@spam.com",
      message: "Buy cheap stuff",
      privacyConsent: true,
      website: "http://spam-site.com", // Honeypot filled = bot
    });

    // Returns fake success to fool the bot
    expect(result).toEqual({ success: true, id: 0 });
  });

  it("accepts legitimate submission with empty honeypot", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Real User",
      email: "real@user.de",
      message: "Echte Anfrage",
      privacyConsent: true,
      website: "", // Empty honeypot = legitimate user
    });

    expect(result).toEqual({ success: true, id: 1 });
  });

  it("accepts legitimate submission without honeypot field", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Real User",
      email: "real@user.de",
      message: "Echte Anfrage",
      privacyConsent: true,
      // No website field at all
    });

    expect(result).toEqual({ success: true, id: 1 });
  });
});

describe("nda.submit", () => {
  it("accepts a valid NDA request", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.nda.submit({
      salutation: "Frau",
      firstName: "Anna",
      lastName: "Schmidt",
      company: "Schmidt AG",
      email: "anna@schmidt.de",
      topic: "Leistungselektronik",
      source: "contact-slider-nda",
      privacyConsent: true,
    });

    expect(result).toEqual({ success: true, id: 1 });
  });

  it("accepts NDA request with 'Keine Angabe' salutation", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.nda.submit({
      salutation: "Keine Angabe",
      firstName: "Alex",
      lastName: "Müller",
      company: "Müller GmbH",
      email: "alex@mueller.de",
      privacyConsent: true,
    });

    expect(result).toEqual({ success: true, id: 1 });
  });

  it("rejects NDA request without required salutation", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.nda.submit({
        salutation: "",
        firstName: "Test",
        lastName: "User",
        company: "Test Co",
        email: "test@test.com",
        privacyConsent: true,
      })
    ).rejects.toThrow();
  });

  it("rejects NDA request without required company", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.nda.submit({
        salutation: "Herr",
        firstName: "Test",
        lastName: "User",
        company: "",
        email: "test@test.com",
        privacyConsent: true,
      })
    ).rejects.toThrow();
  });

  it("rejects NDA request with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.nda.submit({
        salutation: "Herr",
        firstName: "Test",
        lastName: "User",
        company: "Test Co",
        email: "invalid",
        privacyConsent: true,
      })
    ).rejects.toThrow();
  });

  it("rejects NDA request without privacyConsent", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.nda.submit({
        salutation: "Herr",
        firstName: "Test",
        lastName: "User",
        company: "Test Co",
        email: "test@test.com",
      } as any)
    ).rejects.toThrow();
  });

  it("rejects NDA request with privacyConsent set to false", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.nda.submit({
        salutation: "Herr",
        firstName: "Test",
        lastName: "User",
        company: "Test Co",
        email: "test@test.com",
        privacyConsent: false,
      } as any)
    ).rejects.toThrow();
  });

  it("silently rejects bot NDA request when honeypot is filled", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.nda.submit({
      salutation: "Herr",
      firstName: "Bot",
      lastName: "Spammer",
      company: "Spam Inc",
      email: "bot@spam.com",
      privacyConsent: true,
      website: "http://spam-site.com", // Honeypot filled = bot
    });

    // Returns fake success to fool the bot
    expect(result).toEqual({ success: true, id: 0 });
  });

  it("accepts legitimate NDA request with empty honeypot", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.nda.submit({
      salutation: "Frau",
      firstName: "Anna",
      lastName: "Schmidt",
      company: "Schmidt AG",
      email: "anna@schmidt.de",
      privacyConsent: true,
      website: "", // Empty honeypot = legitimate user
    });

    expect(result).toEqual({ success: true, id: 1 });
  });
});
