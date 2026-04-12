import { describe, it, expect } from "vitest";

describe("OpenAI API Key Validation", () => {
  it("should have OPENAI_API_KEY environment variable set", () => {
    const key = process.env.OPENAI_API_KEY;
    expect(key).toBeDefined();
    expect(key!.length).toBeGreaterThan(10);
    expect(key!.startsWith("sk-")).toBe(true);
  });

  it("should successfully call OpenAI API with the key", async () => {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error("OPENAI_API_KEY not set");

    const response = await fetch("https://api.openai.com/v1/models", {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    // 200 = valid key, 401 = invalid key
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.data).toBeDefined();
    expect(Array.isArray(data.data)).toBe(true);
  }, 15000);
});
