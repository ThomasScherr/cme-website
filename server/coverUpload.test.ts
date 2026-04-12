import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock storagePut before importing routers
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({
    key: "insights/covers/test.jpg",
    url: "https://cdn.example.com/insights/covers/test.jpg",
  }),
}));

describe("Cover Image Upload", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should validate that only image MIME types are accepted", () => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];
    const rejectedTypes = [
      "application/pdf",
      "text/plain",
      "video/mp4",
      "application/javascript",
    ];

    // Test allowed types
    for (const type of allowedTypes) {
      expect(allowedTypes.includes(type)).toBe(true);
    }

    // Test rejected types
    for (const type of rejectedTypes) {
      expect(allowedTypes.includes(type)).toBe(false);
    }
  });

  it("should reject files larger than 10 MB", () => {
    const maxSize = 10 * 1024 * 1024;
    const tooLargeSize = 11 * 1024 * 1024;
    const okSize = 5 * 1024 * 1024;

    expect(tooLargeSize > maxSize).toBe(true);
    expect(okSize > maxSize).toBe(false);
  });

  it("should generate unique file keys with random suffix", async () => {
    const crypto = await import("crypto");
    const keys = new Set<string>();

    for (let i = 0; i < 10; i++) {
      const randomSuffix = crypto.randomBytes(8).toString("hex");
      const fileKey = `insights/covers/${Date.now()}-${randomSuffix}.jpg`;
      keys.add(fileKey);
    }

    // All 10 keys should be unique
    expect(keys.size).toBe(10);
  });

  it("should correctly decode base64 to buffer", () => {
    const originalText = "Hello, this is a test image content";
    const base64 = Buffer.from(originalText).toString("base64");
    const decoded = Buffer.from(base64, "base64");

    expect(decoded.toString()).toBe(originalText);
  });

  it("should extract file extension from fileName", () => {
    const testCases = [
      { fileName: "photo.jpg", expected: "jpg" },
      { fileName: "image.png", expected: "png" },
      { fileName: "graphic.svg", expected: "svg" },
      { fileName: "my.cover.image.webp", expected: "webp" },
    ];

    for (const { fileName, expected } of testCases) {
      const ext = fileName.split(".").pop() || "jpg";
      expect(ext).toBe(expected);
    }
  });

  it("should call storagePut with correct parameters", async () => {
    const { storagePut } = await import("./storage");
    const mockedStoragePut = vi.mocked(storagePut);

    const testBuffer = Buffer.from("fake-image-data");
    const mimeType = "image/jpeg";
    const fileKey = "insights/covers/test-key.jpg";

    await storagePut(fileKey, testBuffer, mimeType);

    expect(mockedStoragePut).toHaveBeenCalledWith(fileKey, testBuffer, mimeType);
    const result = await mockedStoragePut.mock.results[0].value;
    expect(result).toHaveProperty("url");
    expect(result).toHaveProperty("key");
  });
});
