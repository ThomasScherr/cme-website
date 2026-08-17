// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { useVideoSource } from "./useVideoSource";

const WEBM = "https://cdn/hero-av1.webm";
const MP4 = "https://cdn/hero-h264.mp4";

/** Ruft den Hook ohne React-Renderer auf – er benutzt nur useMemo. */
vi.mock("react", () => ({ useMemo: (fn: () => unknown) => fn() }));

function browserSupports(types: string[]) {
  vi.spyOn(document, "createElement").mockReturnValue({
    canPlayType: (t: string) => (types.some(x => t.includes(x)) ? "probably" : ""),
  } as any);
}

afterEach(() => vi.restoreAllMocks());

describe("useVideoSource", () => {
  it("nimmt AV1-WebM, wenn der Browser AV1 kann", () => {
    browserSupports(["av01"]);
    expect(useVideoSource(WEBM, MP4)).toBe(WEBM);
  });

  it("nimmt MP4, wenn der Browser NUR VP9 kann (kein AV1)", () => {
    browserSupports(["vp9", "vp8"]);
    expect(useVideoSource(WEBM, MP4)).toBe(MP4);
  });

  it("nimmt MP4, wenn der Browser gar kein WebM kann", () => {
    browserSupports(["mp4"]);
    expect(useVideoSource(WEBM, MP4)).toBe(MP4);
  });

  it("liefert die einzige vorhandene Quelle zurueck", () => {
    browserSupports([]);
    expect(useVideoSource(WEBM, undefined)).toBe(WEBM);
    expect(useVideoSource(undefined, MP4)).toBe(MP4);
    expect(useVideoSource(undefined, undefined)).toBeUndefined();
  });
});
