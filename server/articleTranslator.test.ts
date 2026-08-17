import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("articleTranslator", () => {
  beforeEach(() => {
    vi.resetModules();
    mockFetch.mockReset();
    process.env.OPENAI_API_KEY = "test-key-for-translation";
  });

  it("should throw if OPENAI_API_KEY is not set", async () => {
    delete process.env.OPENAI_API_KEY;
    const { translateArticle } = await import("./articleTranslator");
    await expect(
      translateArticle({
        title: "Test",
        content: "<p>Inhalt</p>",
      })
    ).rejects.toThrow("OPENAI_API_KEY ist nicht konfiguriert");
  });

  it("should call OpenAI API with correct parameters", async () => {
    const mockResponse = {
      titleEn: "Test Article",
      excerptEn: "This is a test summary.",
      contentEn: "<p>Content in English</p>",
      tagsEn: "Power Electronics, EMC",
      metaTitleEn: "Test Article | CME",
      metaDescriptionEn: "A test article about power electronics and EMC testing.",
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: JSON.stringify(mockResponse) } }],
      }),
    });

    const { translateArticle } = await import("./articleTranslator");
    const result = await translateArticle({
      title: "Testartikel",
      excerpt: "Das ist eine Testzusammenfassung.",
      content: "<p>Inhalt auf Deutsch</p>",
      tags: "Leistungselektronik, EMV",
      metaTitle: "Testartikel | CME",
      metaDescription: "Ein Testartikel über Leistungselektronik und EMV-Prüfung.",
    });

    expect(result.titleEn).toBe("Test Article");
    expect(result.excerptEn).toBe("This is a test summary.");
    expect(result.contentEn).toBe("<p>Content in English</p>");
    expect(result.tagsEn).toBe("Power Electronics, EMC");
    expect(result.metaTitleEn).toBe("Test Article | CME");
    expect(result.metaDescriptionEn).toContain("power electronics");

    // Verify fetch was called with correct URL and auth header
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toBe("https://api.openai.com/v1/chat/completions");
    expect(options.headers.Authorization).toBe("Bearer test-key-for-translation");
    const body = JSON.parse(options.body);
    expect(body.model).toBe("gpt-4o-mini");
    expect(body.temperature).toBe(0.3);
  });

  it("should handle API errors gracefully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      statusText: "Too Many Requests",
      text: async () => "Rate limit exceeded",
    });

    const { translateArticle } = await import("./articleTranslator");
    await expect(
      translateArticle({
        title: "Test",
        content: "<p>Inhalt</p>",
      })
    ).rejects.toThrow("OpenAI API Fehler bei Übersetzung: 429");
  });

  it("should handle empty API response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: null } }],
      }),
    });

    const { translateArticle } = await import("./articleTranslator");
    await expect(
      translateArticle({
        title: "Test",
        content: "<p>Inhalt</p>",
      })
    ).rejects.toThrow("leere Antwort");
  });

  it("should enforce length constraints on output", async () => {
    const longExcerpt = "A".repeat(500);
    const longMetaTitle = "B".repeat(200);
    const longMetaDesc = "C".repeat(300);

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{
          message: {
            content: JSON.stringify({
              titleEn: "Normal Title",
              excerptEn: longExcerpt,
              contentEn: "<p>Content</p>",
              tagsEn: "Tag1, Tag2",
              metaTitleEn: longMetaTitle,
              metaDescriptionEn: longMetaDesc,
            }),
          },
        }],
      }),
    });

    const { translateArticle } = await import("./articleTranslator");
    const result = await translateArticle({
      title: "Test",
      content: "<p>Inhalt</p>",
    });

    expect(result.excerptEn.length).toBeLessThanOrEqual(300);
    expect(result.metaTitleEn.length).toBeLessThanOrEqual(70);
    expect(result.metaDescriptionEn.length).toBeLessThanOrEqual(160);
  });

  it("should truncate very long content to stay within token limits", async () => {
    // Muss ueber MAX_CONTENT_CHARS (40.000) liegen. Frueher stand hier
    // repeat(2000) = 30.000 Zeichen - das passte zur alten Grenze von 15.000
    // und lief ins Leere, als die Grenze angehoben wurde. Deshalb wird jetzt
    // nicht auf eine Zahl geprueft, sondern auf die Kuerzungsmarkierung.
    const longContent = "<p>" + "Langer Inhalt. ".repeat(8000) + "</p>";

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{
          message: {
            content: JSON.stringify({
              titleEn: "Title",
              excerptEn: "Summary",
              contentEn: "<p>Translated</p>",
              tagsEn: "Tags",
              metaTitleEn: "Title",
              metaDescriptionEn: "Description",
            }),
          },
        }],
      }),
    });

    const { translateArticle } = await import("./articleTranslator");
    await translateArticle({
      title: "Langer Artikel",
      content: longContent,
    });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    const userMessage = body.messages[1].content;
    expect(userMessage).toContain("[… content truncated …]");
    expect(userMessage.length).toBeLessThan(longContent.length);
  });

  it("kuerzt Inhalte unterhalb der Grenze NICHT", async () => {
    const normalContent = "<p>" + "Kurzer Inhalt. ".repeat(100) + "</p>";

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{
          message: {
            content: JSON.stringify({
              titleEn: "Title", excerptEn: "Excerpt", contentEn: "Content",
              tagsEn: "Tags", metaTitleEn: "Title", metaDescriptionEn: "Description",
            }),
          },
        }],
      }),
    });

    const { translateArticle } = await import("./articleTranslator");
    await translateArticle({ title: "Normaler Artikel", content: normalContent });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.messages[1].content).not.toContain("content truncated");
    expect(body.messages[1].content).toContain(normalContent);
  });

  it("should handle translation with missing optional fields", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{
          message: {
            content: JSON.stringify({
              titleEn: "Translated Title",
              excerptEn: "Translated excerpt",
              contentEn: "<p>Translated content</p>",
              tagsEn: "Tag1",
              metaTitleEn: "SEO Title",
              metaDescriptionEn: "SEO description for the article.",
            }),
          },
        }],
      }),
    });

    const { translateArticle } = await import("./articleTranslator");
    const result = await translateArticle({
      title: "Nur Titel und Inhalt",
      content: "<p>Minimaler Inhalt</p>",
      // No excerpt, tags, metaTitle, metaDescription
    });

    expect(result.titleEn).toBe("Translated Title");
    expect(result.contentEn).toBe("<p>Translated content</p>");
  });
});
