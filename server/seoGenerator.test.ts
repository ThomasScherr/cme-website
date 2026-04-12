import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateSeoContent } from "./seoGenerator";

describe("SEO Generator", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should throw if OPENAI_API_KEY is not set", async () => {
    const originalKey = process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_API_KEY;

    await expect(
      generateSeoContent({ title: "Test", content: "Test content" })
    ).rejects.toThrow("OPENAI_API_KEY");

    // Restore
    if (originalKey) process.env.OPENAI_API_KEY = originalKey;
  });

  it("should call OpenAI API and return structured SEO data", async () => {
    const mockResponse = {
      excerpt: "Eine kurze Zusammenfassung des Artikels über Leistungselektronik.",
      tags: "Leistungselektronik, Power Electronics, EMV, Thermisches Management, EMS",
      metaTitle: "Leistungselektronik: Trends und Herausforderungen | CME",
      metaDescription: "Erfahren Sie die neuesten Trends in der Leistungselektronik und wie CME als EMS-Partner thermische Herausforderungen löst.",
    };

    // Mock the global fetch
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify(mockResponse),
            },
          },
        ],
      }),
    } as any);

    const result = await generateSeoContent({
      title: "Leistungselektronik: Aktuelle Trends",
      content: "Die Leistungselektronik entwickelt sich rasant weiter. Neue Halbleitermaterialien wie SiC und GaN ermöglichen höhere Schaltfrequenzen und bessere Effizienz.",
    });

    // Verify the fetch was called with correct URL and auth
    expect(fetchSpy).toHaveBeenCalledOnce();
    const [url, options] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://api.openai.com/v1/chat/completions");
    expect((options as any).method).toBe("POST");
    expect((options as any).headers.Authorization).toMatch(/^Bearer sk-/);

    // Verify the body contains the right model and messages
    const body = JSON.parse((options as any).body);
    expect(body.model).toBe("gpt-4o-mini");
    expect(body.messages).toHaveLength(2);
    expect(body.messages[0].role).toBe("system");
    expect(body.messages[1].role).toBe("user");
    expect(body.messages[1].content).toContain("Leistungselektronik");
    expect(body.response_format.type).toBe("json_schema");

    // Verify the result structure
    expect(result).toEqual(mockResponse);
    expect(result.excerpt.length).toBeLessThanOrEqual(300);
    expect(result.metaTitle.length).toBeLessThanOrEqual(70);
    expect(result.metaDescription.length).toBeLessThanOrEqual(160);
    expect(result.tags).toContain(",");
  });

  it("should truncate content longer than 4000 chars", async () => {
    const longContent = "A".repeat(5000);

    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({
                excerpt: "Test",
                tags: "Test",
                metaTitle: "Test",
                metaDescription: "Test",
              }),
            },
          },
        ],
      }),
    } as any);

    await generateSeoContent({ title: "Test", content: longContent });

    const body = JSON.parse((fetchSpy.mock.calls[0][1] as any).body);
    const userContent = body.messages[1].content;
    // The content in the prompt should be truncated
    expect(userContent).toContain("[… Inhalt gekürzt …]");
    expect(userContent.length).toBeLessThan(longContent.length);
  });

  it("should enforce length constraints on returned data", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({
                excerpt: "X".repeat(400), // exceeds 300
                tags: "tag1, tag2",
                metaTitle: "Y".repeat(100), // exceeds 70
                metaDescription: "Z".repeat(200), // exceeds 160
              }),
            },
          },
        ],
      }),
    } as any);

    const result = await generateSeoContent({
      title: "Test",
      content: "Some content",
    });

    expect(result.excerpt.length).toBeLessThanOrEqual(300);
    expect(result.metaTitle.length).toBeLessThanOrEqual(70);
    expect(result.metaDescription.length).toBeLessThanOrEqual(160);
  });

  it("should throw on OpenAI API error", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 429,
      statusText: "Too Many Requests",
      text: async () => "Rate limit exceeded",
    } as any);

    await expect(
      generateSeoContent({ title: "Test", content: "Content" })
    ).rejects.toThrow("OpenAI API Fehler: 429");
  });

  it("should throw on empty OpenAI response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: null } }],
      }),
    } as any);

    await expect(
      generateSeoContent({ title: "Test", content: "Content" })
    ).rejects.toThrow("leere Antwort");
  });
});
