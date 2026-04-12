import { describe, it, expect } from "vitest";

describe("Site Access Password", () => {
  it("should have SITE_ACCESS_PASSWORD env variable set", () => {
    const password = process.env.SITE_ACCESS_PASSWORD;
    expect(password).toBeDefined();
    expect(password).not.toBe("");
    expect(typeof password).toBe("string");
  });

  it("should have a non-trivial password (at least 6 chars)", () => {
    const password = process.env.SITE_ACCESS_PASSWORD!;
    expect(password.length).toBeGreaterThanOrEqual(6);
  });
});
