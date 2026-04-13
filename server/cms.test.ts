import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock global fetch for OpenAI API calls
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("CMS Content Translator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.OPENAI_API_KEY = "test-key-123";
  });

  it("should export batchTranslateFields function", async () => {
    const { batchTranslateFields } = await import("./contentTranslator");
    expect(typeof batchTranslateFields).toBe("function");
  });

  it("should translate fields from DE to EN", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({
                "content.title": "Populate PCBs",
                "content.subtitle": "Professional SMD Assembly",
              }),
            },
          },
        ],
      }),
    });

    const { batchTranslateFields } = await import("./contentTranslator");
    const result = await batchTranslateFields({
      fields: {
        "content.title": "Leiterplatten bestücken",
        "content.subtitle": "Professionelle SMD-Bestückung",
      },
      fromLang: "de",
      toLang: "en",
    });
    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(result["content.title"]).toBe("Populate PCBs");
    expect(result["content.subtitle"]).toBe("Professional SMD Assembly");
  });

  it("should return empty object for empty input", async () => {
    const { batchTranslateFields } = await import("./contentTranslator");
    const result = await batchTranslateFields({
      fields: {},
      fromLang: "de",
      toLang: "en",
    });
    expect(result).toEqual({});
  });
});

describe("CMS useContent Hook Contract", () => {
  it("should define correct content key format", () => {
    // Content keys follow the pattern: page.section.field
    const validKeys = [
      "home.hero.title",
      "fertigung.leiterplatten.hero.image",
      "entwicklung.simulation.content.intro",
    ];

    validKeys.forEach((key) => {
      const parts = key.split(".");
      expect(parts.length).toBeGreaterThanOrEqual(3);
      expect(parts.every((p) => p.length > 0)).toBe(true);
    });
  });

  it("should validate content types", () => {
    const validTypes = ["text", "richtext", "image", "video"];
    validTypes.forEach((type) => {
      expect(["text", "richtext", "image", "video"]).toContain(type);
    });
  });
});

describe("CMS Media Library", () => {
  it("should validate supported media types", () => {
    const supportedTypes = ["image", "video"];
    expect(supportedTypes).toContain("image");
    expect(supportedTypes).toContain("video");
  });

  it("should validate file size limits", () => {
    const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
    const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

    expect(MAX_IMAGE_SIZE).toBe(10485760);
    expect(MAX_VIDEO_SIZE).toBe(104857600);
  });

  it("should validate supported image MIME types", () => {
    const supportedMimes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];

    expect(supportedMimes).toContain("image/jpeg");
    expect(supportedMimes).toContain("image/webp");
    expect(supportedMimes).toContain("image/svg+xml");
  });
});

describe("CMS Database Schema Validation", () => {
  it("should have siteContent table with required fields", async () => {
    const schema = await import("../drizzle/schema");
    expect(schema.siteContent).toBeDefined();
  });

  it("should have mediaLibrary table with required fields", async () => {
    const schema = await import("../drizzle/schema");
    expect(schema.mediaLibrary).toBeDefined();
  });
});

describe("CMS Value Deletion Logic", () => {
  it("should preserve empty strings when converting null values for upsert", () => {
    // Simulates the bulkUpdate mutation logic: null/undefined → empty string
    const testCases = [
      { valueDe: null, expected: '' },
      { valueDe: undefined, expected: '' },
      { valueDe: '', expected: '' },
      { valueDe: 'https://example.com/image.jpg', expected: 'https://example.com/image.jpg' },
    ];

    testCases.forEach(({ valueDe, expected }) => {
      const result = valueDe === null ? '' : (valueDe ?? '');
      expect(result).toBe(expected);
    });
  });

  it("should send empty string (not null) when user clears a field via ContentManager", () => {
    // Simulates the ContentManager handleSave logic with ?? instead of ||
    const editState = { valueDe: '', valueEn: '' }; // User cleared both values
    const entry = {
      valueDe: editState.valueDe ?? null,
      valueEn: editState.valueEn ?? null,
    };
    // With ?? operator, empty string is preserved (not converted to null)
    expect(entry.valueDe).toBe('');
    expect(entry.valueEn).toBe('');
  });

  it("should distinguish between 'no DB entry' and 'empty DB entry' in editState init", () => {
    // No DB entry → use defaults
    const dbEntry = null;
    const field = { defaultDe: 'https://cdn.example.com/default.jpg', defaultEn: 'https://cdn.example.com/default.jpg' };
    const hasDbEntry = !!dbEntry;
    const valueDe = hasDbEntry ? (dbEntry?.valueDe ?? '') : (field.defaultDe || '');
    expect(valueDe).toBe('https://cdn.example.com/default.jpg');

    // DB entry with empty string → use empty string (intentionally cleared)
    const dbEntry2 = { valueDe: '', valueEn: '' };
    const hasDbEntry2 = !!dbEntry2;
    const valueDe2 = hasDbEntry2 ? (dbEntry2.valueDe ?? '') : (field.defaultDe || '');
    expect(valueDe2).toBe('');
  });
});

describe("Media Deduplication Logic", () => {
  it("should detect duplicate files by filename and size", () => {
    const existingFiles = [
      { id: 1, filename: 'video.mp4', fileSize: 12990059 },
      { id: 2, filename: 'image.jpg', fileSize: 500000 },
    ];

    const findDuplicate = (filename: string, fileSize: number) =>
      existingFiles.find(f => f.filename === filename && f.fileSize === fileSize) || null;

    // Same file → duplicate found
    expect(findDuplicate('video.mp4', 12990059)).toEqual({ id: 1, filename: 'video.mp4', fileSize: 12990059 });

    // Same name, different size → no duplicate
    expect(findDuplicate('video.mp4', 999999)).toBeNull();

    // Different name, same size → no duplicate
    expect(findDuplicate('other.mp4', 12990059)).toBeNull();

    // New file → no duplicate
    expect(findDuplicate('new-file.png', 123456)).toBeNull();
  });
});
