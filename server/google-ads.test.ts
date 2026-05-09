import { describe, it, expect } from "vitest";

describe("Google Ads Configuration", () => {
  it("should have VITE_GOOGLE_ADS_ID set to AW-358454053", () => {
    expect(process.env.VITE_GOOGLE_ADS_ID).toBe("AW-358454053");
  });

  it("should have a valid Google Ads ID format (AW-XXXXXXXXX)", () => {
    const adsId = process.env.VITE_GOOGLE_ADS_ID || "";
    expect(adsId).toMatch(/^AW-\d+$/);
  });
});
