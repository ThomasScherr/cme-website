import { describe, it, expect } from "vitest";

describe("CONTACT_EMAIL Configuration", () => {
  it("should contain t.scherr@control-motion.de", () => {
    expect(process.env.CONTACT_EMAIL).toContain("t.scherr@control-motion.de");
  });

  it("should contain sales@control-motion.de", () => {
    expect(process.env.CONTACT_EMAIL).toContain("sales@control-motion.de");
  });

  it("should have two comma-separated addresses", () => {
    const emails = (process.env.CONTACT_EMAIL || "").split(",").map(e => e.trim());
    expect(emails.length).toBe(2);
  });
});
